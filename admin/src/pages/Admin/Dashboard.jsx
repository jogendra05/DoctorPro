import React from "react";
import { useContext } from "react";
import { AdminContext } from "../../contexts/AdminContext";
import { useEffect } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../contexts/AppContext";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { aToken, cancelAppointment, dashData, getDashData } =
    useContext(AdminContext);

  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  const isReadOnly = (id) => {
    if (import.meta.env.VITE_IS_READ_ONLY === "true") {
      toast.error("This feature is read-only in the deployed version.");
    } else {
      cancelAppointment(id);
    }
  };

  return (
    dashData && (
      <div className="m-5">
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.doctor_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.doctors}
              </p>
              <p className="text-gray-400">Doctors</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.appointments_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.appointments}
              </p>
              <p className="text-gray-400">Appointments</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img className="w-14" src={assets.patients_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600">
                {dashData.patients}
              </p>
              <p className="text-gray-400">Patients</p>
            </div>
          </div>
        </div>

        <div className="bg-white">
          <div className="flex items-center gap-2.5 p-4 mt-10 border rounded-t">
            <img src={assets.list_icon} alt="" />
            <p className="font-semibold">Latest Booking</p>
          </div>

          <div className="pt-4 border border-t-0">
            {dashData.latestAppointment.map((item, index) => (
              <div
                className="flex items-center gap-3 px-6 py-3 hover:bg-gray-100"
                key={index}
              >
                <img
                  className="rounded-full w-10"
                  src={item.docData.image}
                  alt=""
                />
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">
                    {item.docData.name}
                  </p>
                  <p className="text-gray-600">
                    {slotDateFormat(item.slotDate)}
                  </p>
                </div>
                {item.cancelled ? (
                  <p className="text-red-400 text-xs font-medium">Cancelled</p>
                ) : item.isCompleted ? (
                  <p className="text-green-500 text-xs font-medium">
                    Completed
                  </p>
                ) : (
                  <img
                    onClick={() => isReadOnly(item._id)}
                    className="w-10 cursor-pointer"
                    src={assets.cancel_icon}
                    alt=""
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
