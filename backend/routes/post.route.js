import express from "express";
import protectRoute from "../middleware/auth.middleware.js";
import {
  addNewPost,
  getAllPost,
  getBlogDetails,
  addComment,
  updatePost,
  deletePost,
  getWishlist,
  wishlist,
  removeWishlist,
  getMyPosts,
  getTopSixPost,
  addToWishlist,
} from "../controllers/post.controller.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/addpost", protectRoute, upload.single("image"), addNewPost);
router.get("/allpost", getAllPost);
router.get("/blog-details/:id", getBlogDetails);
router.post("/comment/:id", protectRoute, addComment);
router.put("/update/:id", protectRoute, upload.single("image"), updatePost);
router.delete("/delete/:id", protectRoute, deletePost);
router.post("/wishlist/:id", protectRoute, wishlist);
router.get("/wishlist", protectRoute, getWishlist);
router.delete("/wishlist/:id", protectRoute, removeWishlist);
router.get("/my-posts", protectRoute, getMyPosts);
router.get("/top-six", getTopSixPost);
router.post("/wishlist/add/:id", protectRoute, addToWishlist);

export default router;
