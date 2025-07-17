import React, { useContext } from "react";
import Login from "./pages/Login";
import { ToastContainer, toast } from "react-toastify";
import { AdminContext } from "./contexts/AdminContext";
import Navbar from "./components/Navbar";
import Slidebar from "./components/Slidebar";
import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from './pages/Admin/Dashboard'
import AllAppointment from "./pages/Admin/AllAppointment";
import AddDoctors from "./pages/Admin/AddDoctors";
import DoctorsList from "./pages/Admin/DoctorsList";
import { DoctorContext } from "./contexts/DoctorContext";
import DoctorAppointment from "./pages/Doctor/DoctorAppointment";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard";
import DoctorProfile from "./pages/Doctor/DoctorProfile";

const App = () => {
  const { aToken } = useContext(AdminContext);
  const {dToken} = useContext(DoctorContext)
  return (aToken || dToken) ? (
    <div className="bg-[#F8F9FD]">
      <ToastContainer />
      <Navbar/>
      <div className="flex items-start">
        <Slidebar/>
        <Routes>
          {/* Admin routes */}
          <Route
            path="/"
            element={
              aToken ? <Navigate to="/admin-dashboard" /> : <Navigate to="/doctor-dashboard" />
            }
          />
          <Route path="/admin-dashboard" element={<Dashboard/>}/>
          <Route path="/all-appointment" element={<AllAppointment/>}/>
          <Route path="/add-doctor" element={<AddDoctors/>}/>
          <Route path="/doctor-list" element={<DoctorsList/>}/>

          {/* Doctor routes */}
          <Route path="/doctor-dashboard" element={<DoctorDashboard/>}/>
          <Route path="/doctor-appointments" element={<DoctorAppointment/>}/>
          <Route path="/doctor-profile" element={<DoctorProfile/>}/>
        </Routes>
      </div>
    </div>
  ) : (
    <div>
      <Login />
      <ToastContainer />
    </div>
  );
};

export default App;
