import express from "express";
import {
  bookAppointment,
  getProfile,
  listAppointment,
  updateProfile,
  userLogin,
  userRegister,
} from "../controllers/userController.js";
import userAuth from "../middlewares/authUser.js";
import upload from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);
userRouter.get("/get-profile", userAuth, getProfile);
userRouter.post(
  "/update-profile",
  upload.single("image"),
  userAuth,
  updateProfile
);
userRouter.post("/book-appointment", userAuth, bookAppointment);

export default userRouter;
