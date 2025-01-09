import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  Home,
  Doctors,
  Login,
  About,
  MyAppointment,
  MyProfile,
  Contact,
  Appointment,
  HealthCheck,
  DiabetesPrediction,
  HeartDiseasePrediction,
} from "./pages/index.js";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import SlidebarHealthCheck from "./components/SlidebarHealthCheck";
import { ToastContainer, toast } from "react-toastify";

const App = () => {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/my-appointment" element={<MyAppointment />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/appointment/:docId" element={<Appointment />} />
        {/* <Route path='/health-check' element={<HealthCheck/>} /> */}

        <Route path="/diabetes-prediction" element={<DiabetesPrediction />} />
        <Route
          path="/heart-disease-prediction"
          element={<HeartDiseasePrediction />}
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
