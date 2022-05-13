import express from "express";
import {
  deleteUser,
  forgetPassword,
  getProfile,
  getSingleUser,
  getUsers,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  updateRoll,
  updateUserProfile,
} from "../controller/userController.js";
import { authorizedRoles, isAuthenticatedUser } from "../middleware/auth.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(isAuthenticatedUser, logoutUser);

export default router;
