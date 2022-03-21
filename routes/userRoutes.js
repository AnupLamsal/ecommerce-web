import express from "express";
const router = express.Router();

import auth from "../middleware/authMiddleware.js";
import {
    authUser,
    registerUser,
    getUserProfile,
    updateUserProfile,
} from "../controllers/userController.js";

router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route("/profile").get(auth, getUserProfile).put(auth, updateUserProfile);

export default router;
