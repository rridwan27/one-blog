import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { username, email, password, fullName, profilePicture } = req.body;

    if (!username || !email || !password || !fullName || !profilePicture) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "Email already in use",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      profilePicture,
      fullName,
    });

    const accessToken = jwt.sign(
      {
        _id: newUser._id,
        email: newUser.email,
        username: newUser.username,
        fullName: newUser.fullName,
        profilePicture: newUser.profilePicture,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );

    const refreshToken = jwt.sign(
      { _id: newUser._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );

    newUser.refreshToken = refreshToken;
    await newUser.save();

    res
      .cookie("token", accessToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({
        message: "Account created successfully",
        success: true,
        user: {
          _id: newUser._id,
          email: newUser.email,
          username: newUser.username,
          fullName: newUser.fullName,
          profilePicture: newUser.profilePicture,
        },
      });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const googleAuth = async (req, res) => {
  try {
    const { email, name, photo } = req.body;

    if (!email || !name) {
      return res.status(400).json({
        message: "Email and name are required",
        success: false,
      });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
        fullName: name,
        username:
          name.toLowerCase().replace(/\s+/g, "") +
          Math.floor(Math.random() * 1000),
        profilePicture: photo || "",
        isGoogleAuth: true,
      });
    }

    const accessToken = await jwt.sign(
      {
        _id: user._id,
        email: user.email,
        username: user.username,
        fullName: user.fullName,
        profilePicture: user.profilePicture,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );

    const refreshToken = await jwt.sign(
      { _id: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );

    user.refreshToken = refreshToken;
    await user.save();

    return res
      .cookie("token", accessToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        message: `Welcome ${user.fullName}`,
        success: true,
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          fullName: user.fullName,
          profilePicture: user.profilePicture,
        },
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

export const googleLogin = async (req, res) => {
  try {
    const { email, name, photo } = req.body;

    if (!email || !name) {
      return res.status(400).json({
        message: "Email and name are required",
        success: false,
      });
    }

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        email,
        fullName: name,
        username:
          name.toLowerCase().replace(/\s+/g, "") +
          Math.floor(Math.random() * 1000),
        profilePicture: photo || "",
        isGoogleAuth: true,
      });
    }

    const accessToken = await jwt.sign(
      {
        _id: user._id,
        email: user.email,
        username: user.username,
        fullName: user.fullName,
        profilePicture: user.profilePicture,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );

    const refreshToken = await jwt.sign(
      { _id: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );

    user.refreshToken = refreshToken;
    await user.save();

    const populatedPosts = await Promise.all(
      user.posts.map(async (postId) => {
        const post = await Post.findById(postId);
        if (post?.author?.equals(user?._id)) {
          return post;
        }
        return null;
      })
    );

    const userData = {
      _id: user._id,
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      profilePicture: user.profilePicture,
      bio: user.bio,
      followers: user.followers,
      following: user.following,
      posts: populatedPosts.filter((post) => post !== null),
      refreshToken: user.refreshToken,
    };

    return res
      .cookie("token", accessToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        message: `Welcome ${user.fullName}`,
        success: true,
        user: userData,
      });
  } catch (error) {
    console.error("Google login error:", error);
    return res.status(500).json({
      message: "Authentication failed",
      success: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        message: "Something is missing, please check!",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Incorrect email or password",
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    const accessToken = await jwt.sign(
      {
        _id: user?._id,
        email: user?.email,
        username: user?.username,
        fullName: user?.fullName,
        profilePicture: user?.profilePicture,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
      }
    );

    const refreshToken = await jwt.sign(
      {
        _id: user?._id,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
      }
    );

    const populatedPosts = await Promise.all(
      user.posts.map(async (postId) => {
        const post = await Post.findById(postId);
        if (post.author.equals(user?._id)) {
          return post;
        }
        return null;
      })
    );
    user = {
      _id: user?._id,
      username: user?.username,
      email: user?.email,
      fullName: user?.fullName,
      profilePicture: user?.profilePicture,
      bio: user?.bio,
      followers: user?.followers,
      following: user?.following,
      posts: populatedPosts,
      refreshToken: user?.refreshToken,
    };
    return res
      .cookie("token", accessToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        maxAge: 1 * 24 * 60 * 60 * 1000,
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .json({
        message: `Welcome back ${user?.username}`,
        success: true,
        user,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.clearCookie("refreshToken");
    return res.json({
      message: "Logged out successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

export const me = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    return res.json({
      message: "User found",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { username, email, password, fullName, profilePicture, bio } =
      req.body;
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    user.username = username || user.username;
    user.email = email || user.email;
    user.password = password || user.password;
    user.fullName = fullName || user.fullName;
    user.profilePicture = profilePicture || user.profilePicture;
    user.bio = bio || user.bio;
    await user.save();
    return res.json({
      message: "User updated successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};
