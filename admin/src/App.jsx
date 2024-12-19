import React, { useContext } from "react";
import Login from "./pages/Login";
import { ToastContainer, toast } from "react-toastify";
import { AdminContext } from "./contexts/AdminContext";
import Navbar from "./components/Navbar";
import Slidebar from "./components/Slidebar";
import { Route, Routes } from "react-router-dom";
import Dashboard from './pages/Admin/Dashboard'
import AllAppointment from "./pages/Admin/AllAppointment";
import AddDoctors from "./pages/Admin/AddDoctors";
import DoctorsList from "./pages/Admin/DoctorsList";
// import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const { aToken } = useContext(AdminContext);
  return aToken ? (
    <div className="bg-[#F8F9FD]">
      <ToastContainer />
      <Navbar/>
      <div className="flex items-start">
        <Slidebar/>
        <Routes>
          <Route path="/" element={<></>}/>
          <Route path="/admin-dashboard" element={<Dashboard/>}/>
          <Route path="/all-appointment" element={<AllAppointment/>}/>
          <Route path="/add-doctor" element={<AddDoctors/>}/>
          <Route path="/doctor-list" element={<DoctorsList/>}/>
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
