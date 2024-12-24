import express from "express";
import {
  appointmentCancel,
  appointmentComplete,
  appointmentDoctor,
  doctorDashboard,
  doctorList,
  doctorProfile,
  loginDoctor,
  updateProfile,
} from "../controllers/doctorController.js";
import doctorAuth from "../middlewares/authDoctor.js";

const doctorRouter = express.Router();

doctorRouter.get("/list", doctorList);
doctorRouter.post("/login", loginDoctor);
doctorRouter.get("/appointments", doctorAuth, appointmentDoctor);
doctorRouter.post("/complete-appointment", doctorAuth, appointmentComplete);
doctorRouter.post("/cancel-appointment", doctorAuth, appointmentCancel);
doctorRouter.get("/dashboard", doctorAuth, doctorDashboard);
doctorRouter.get("/profile", doctorAuth, doctorProfile);
doctorRouter.post("/update-profile", doctorAuth, updateProfile);

export default doctorRouter;
