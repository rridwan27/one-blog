import mongoose from "mongoose";
import cloudinary from "../lib/cloudinary.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import sharp from "sharp";
import Comment from "../models/comment.model.js";

export const addNewPost = async (req, res) => {
  try {
    const { title, category, shortDescription, longDescription } = req.body;

    const image = req.file;

    if (!image) {
      return res.status(400).json({ message: "Image is required" });
    }
    const optimizedImageBuffer = await sharp(image.buffer)
      .resize({ width: 800, height: 800, fit: "inside" })
      .toFormat("jpeg", { quality: 80 })
      .toBuffer();

    const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString(
      "base64"
    )}`;
    const cloudResponse = await cloudinary.uploader.upload(fileUri);

    const post = await Post.create({
      title,
      category,
      shortDescription,
      longDescription,
      imageUrl: cloudResponse.secure_url,
      author: req.user._id,
    });

    const user = await User.findById(req.user._id);
    if (user) {
      user.posts.push(post._id);
      await user.save();
    }

    await post.populate({ path: "author", select: "-password" });

    return res.status(201).json({
      message: "New post added",
      post,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

export const getAllPost = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate({ path: "author", select: "-password" });

    let userBookmarks = [];

    if (req.user) {
      const user = await User.findById(req.user._id);
      userBookmarks = user.bookmarks.map((id) => id.toString());
    }

    const postsWithBookmarkFlag = posts.map((post) => {
      const isBookmarked = userBookmarks.includes(post._id.toString());
      return {
        ...post.toObject(),
        isBookmarked,
      };
    });

    res.status(200).json({
      posts: postsWithBookmarkFlag,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

export const getBlogDetails = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid blog ID format" });
    }

    const post = await Post.findById(id)
      .populate({ path: "author", select: "-password" })
      .populate({ path: "comments", populate: { path: "author" } });

    if (!post) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    let isBookmarked = false;

    if (req.user) {
      const user = await User.findById(req.user._id).select("bookmarks");
      isBookmarked = user.bookmarks.some(
        (bookmark) => bookmark.toString() === id
      );
    }

    const postObj = post.toObject();
    postObj.isBookmarked = isBookmarked;

    res.status(200).json(postObj);
  } catch (error) {
    console.error("Error fetching blog details:", error);
    res.status(500).json({ error: "Server error while fetching blog details" });
  }
};

export const addComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user?._id;

    const { text } = req.body;

    if (!text) {
      return res
        .status(400)
        .json({ message: "Text is required", success: false });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ message: "Post not found", success: false });
    }

    const comment = await Comment.create({
      text,
      author: userId,
      post: postId,
    });

    await comment.populate("author", "fullName profilePicture");

    post.comments.push(comment._id);
    await post.save();

    return res.status(200).json({
      message: "Comment added successfully",
      comment,
      success: true,
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    return res.status(500).json({
      error: "Server error while adding comment",
      success: false,
    });
  }
};

export const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, category, shortDescription, longDescription } = req.body;

    const post = await Post.findById(postId);

    if (!post) {
      return res
        .status(404)
        .json({ message: "Post not found", success: false });
    }

    if (String(post.author) !== String(req.user._id)) {
      return res.status(403).json({ message: "Unauthorized", success: false });
    }

    if (req.file) {
      const optimizedImageBuffer = await sharp(req.file.buffer)
        .resize({ width: 800, height: 800, fit: "inside" })
        .toFormat("jpeg", { quality: 80 })
        .toBuffer();

      const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString(
        "base64"
      )}`;
      const cloudResponse = await cloudinary.uploader.upload(fileUri);
      post.imageUrl = cloudResponse.secure_url;
    }

    post.title = title || post.title;
    post.category = category || post.category;
    post.shortDescription = shortDescription || post.shortDescription;
    post.longDescription = longDescription || post.longDescription;

    await post.save();

    await post.populate({ path: "author", select: "-password" });

    return res.status(200).json({
      message: "Post updated successfully",
      post,
      success: true,
    });
  } catch (error) {
    console.error("Error updating post:", error);
    return res.status(500).json({
      message: "Server error while updating post",
      success: false,
    });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await Post.findById(postId);

    if (!post) {
      return res
        .status(404)
        .json({ message: "Post not found", success: false });
    }

    if (String(post.author) !== String(req.user._id)) {
      return res.status(403).json({ message: "Unauthorized", success: false });
    }

    await User.findByIdAndUpdate(post.author, {
      $pull: { posts: post._id },
    });
    await Comment.deleteMany({ post: post._id });
    await Post.findByIdAndDelete(postId);

    return res.status(200).json({
      message: "Post deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error deleting post:", error);
    return res.status(500).json({
      message: "Server error while deleting post",
      success: false,
    });
  }
};

export const wishlist = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
        success: false,
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const alreadyBookmarked = user.bookmarks.includes(postId);

    if (alreadyBookmarked) {
      user.bookmarks.pull(postId);
      await user.save();
      return res.status(200).json({
        message: "Post removed from wishlist successfully",
        bookmarksCount: user.bookmarks.length,
        success: true,
        isBookmarked: false,
      });
    } else {
      user.bookmarks.push(postId);
      await user.save();
      return res.status(200).json({
        message: "Post added to wishlist successfully",
        bookmarksCount: user.bookmarks.length,
        success: true,
        isBookmarked: true,
      });
    }
  } catch (error) {
    console.error("Error toggling wishlist:", error);
    return res.status(500).json({
      message: "Server error while updating wishlist",
      success: false,
    });
  }
};

export const getWishlist = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).populate({
      path: "bookmarks",
      populate: { path: "author", select: "-password" },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Wishlist fetched successfully",
      wishlist: user.bookmarks,
      total: user.bookmarks.length,
      success: true,
    });
  } catch (error) {
    console.error("Get Wishlist Error:", error);
    res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const addToWishlist = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
        success: false,
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const alreadyBookmarked = user.bookmarks.includes(postId);

    if (alreadyBookmarked) {
      user.bookmarks.pull(postId);
      await user.save();
      return res.status(200).json({
        message: "Post removed from wishlist successfully",
        bookmarksCount: user.bookmarks.length,
        success: true,
        isBookmarked: false,
      });
    } else {
      user.bookmarks.push(postId);
      await user.save();
      return res.status(200).json({
        message: "Post added to wishlist successfully",
        bookmarksCount: user.bookmarks.length,
        success: true,
        isBookmarked: true,
      });
    }
  } catch (error) {
    console.error("Error toggling wishlist:", error);
    return res.status(500).json({
      message: "Server error while updating wishlist",
      success: false,
    });
  }
};

export const removeWishlist = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
        success: false,
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    user.bookmarks.pull(postId);
    await user.save();

    res.status(200).json({
      message: "Post removed from wishlist successfully",
      bookmarksCount: user.bookmarks.length,
      success: true,
      isBookmarked: false,
    });
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    res.status(500).json({
      message: "Server error while removing from wishlist",
      success: false,
    });
  }
};

export const getMyPosts = async (req, res) => {
  try {
    const userId = req.user._id;

    const posts = await Post.find({ author: userId })
      .sort({ createdAt: -1 })
      .populate({ path: "author", select: "-password" })
      .populate({ path: "comments" });

    res.status(200).json({
      message: "My posts fetched successfully",
      posts,
      success: true,
    });
  } catch (error) {
    console.error("Get My Posts Error:", error);
    res.status(500).json({
      message: "Server error while fetching your posts",
      success: false,
    });
  }
};

export const getTopSixPost = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate({ path: "author", select: "-password" })
      .populate({ path: "comments" })
      .limit(6);

    res.status(200).json({
      message: "Top six posts fetched successfully",
      posts,
      success: true,
    });
  } catch (error) {
    console.error("Get Top Six Posts Error:", error);
    res.status(500).json({
      message: "Server error while fetching top six posts",
      success: false,
    });
  }
};
