import React from "react";
import { useContext } from "react";
import { DoctorContext } from "../../contexts/DoctorContext";
import { useEffect } from "react";
import { AppContext } from "../../contexts/AppContext";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";

const DoctorAppointment = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    cancelAppointment,
    completeAppointment,
  } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    getAppointments();
  }, [dToken]);

  const isReadOnly = (id, complete) => {
    if (import.meta.env.VITE_IS_READ_ONLY === "true") {
      toast.error("This feature is read-only in the deployed version.");
    } else {
      if (complete) {
        completeAppointment(id);
      } else {
        cancelAppointment(id);
      }
    }
  };
  return (
    appointments && (
      <div className="w-full max-w-6xl m-5">
        <p className="mb-3 text-lg font-medium">DoctorAppointment</p>
        <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll">
          <div
            className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1
          px-6 py-3 border-b font-semibold"
          >
            <p>#</p>
            <p>Patient</p>
            <p>Payment</p>
            <p>Age</p>
            <p>Date & Time</p>
            <p>Fees</p>
            <p>Action</p>
          </div>

          <div>
            {appointments.reverse().map((item, index) => (
              <div
                className="flex flex-wrap justify-between 
                        max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] 
                        items-center text-gray-500 px-6 py-3 border-b hover:bg-gray-50"
                key={index}
              >
                <p className="max-sm:hidden">{index + 1}</p>
                <div className="flex items-center gap-2">
                  <img
                    className="w-8 rounded-full"
                    src={item.userData.image}
                    alt=""
                  />
                  <p>{item.userData.name}</p>
                </div>
                <div>
                  <p className="text-xs inline border border-primary px-2 rounded-full">
                    {item.payment ? "Online" : "CASH"}
                  </p>
                </div>
                <p className="max-sm:hidden">
                  {calculateAge(item.userData.dob)}
                </p>
                <p>
                  {slotDateFormat(item.slotDate)}, {item.slotTime}
                </p>

                <p>
                  {currency}
                  {item.docData.fees}
                </p>
                {item.cancelled ? (
                  <p className="text-red-400 text-xs font-medium">Cancelled</p>
                ) : item.isCompleted ? (
                  <p className="text-green-500 text-xs font-medium">
                    Completed
                  </p>
                ) : (
                  <div className="flex">
                    <img
                      onClick={() => isReadOnly(item._id, false)}
                      className="w-10 cursor-pointer"
                      src={assets.cancel_icon}
                      alt=""
                    />
                    <img
                      onClick={() => isReadOnly(item._id, true)}
                      className="w-10 cursor-pointer"
                      src={assets.tick_icon}
                      alt=""
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorAppointment;
