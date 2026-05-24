import React, { useContext, useEffect, useState } from "react";
import { DoctorContext } from "../../contexts/DoctorContext";
import { AppContext } from "../../contexts/AppContext";
import { assets } from "../../assets/assets";
import { toast } from "react-toastify";

const CONSULTATION_API = import.meta.env.VITE_BACKEND_URL + "/api";

const DoctorAppointment = () => {
  const {
    dToken,
    appointments,
    getAppointments,
    cancelAppointment,
    completeAppointment,
  } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat, currency,  } = useContext(AppContext);

  const [joiningId, setJoiningId] = useState(null);

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

  const handleJoinCall = async (item) => {
    if (import.meta.env.VITE_IS_READ_ONLY === "true") {
      toast.error("This feature is read-only in the deployed version.");
      return;
    }
    setJoiningId(item._id);
    try {
      const res = await fetch(`${CONSULTATION_API}/video/create-room`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appointmentId: item._id,
          patientId: item.userId,
          doctorId: item.docId,
          patientName: item.userData.name,
          doctorName: item.docData.name,
          doctorSpeciality: item.docData.speciality,
        }),
      });
      const data = await res.json();
      if (data.success) {
        window.open(data.roomUrl, "_blank");
      } else {
        toast.error("Failed to join call. Please try again.");
      }
    } catch (err) {
      toast.error("Could not connect to consultation service.");
    } finally {
      setJoiningId(null);
    }
  };

  return (
    appointments && (
      <div className="w-full max-w-6xl m-5">
        <p className="mb-3 text-lg font-medium">DoctorAppointment</p>
        <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll">
          {/* Header — added Video column */}
          <div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr_1fr] gap-1 px-6 py-3 border-b font-semibold">
            <p>#</p>
            <p>Patient</p>
            <p>Payment</p>
            <p>Age</p>
            <p>Date & Time</p>
            <p>Fees</p>
            <p>Video</p>
            <p>Action</p>
          </div>

          <div>
            {appointments.reverse().map((item, index) => (
              <div
                className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr_1fr] items-center text-gray-500 px-6 py-3 border-b hover:bg-gray-50"
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

                <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>

                <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>

                <p>{currency}{item.docData.fees}</p>

                {/* Video call button column */}
                <div>
                  {!item.cancelled && !item.isCompleted ? (
                    <button
                      onClick={() => handleJoinCall(item)}
                      disabled={joiningId === item._id}
                      title="Join Video Call"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white disabled:opacity-50 transition-colors"
                      style={{ background: "#5f6FFF" }}
                    >
                      {joiningId === item._id ? (
                        <svg className="animate-spin w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                      ) : (
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M15 10l4.553-2.669A1 1 0 0121 8.232v7.536a1 1 0 01-1.447.894L15 14v-4zM3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                        </svg>
                      )}
                      {joiningId === item._id ? "Joining..." : "Join"}
                    </button>
                  ) : (
                    <p className="text-gray-300 text-xs">—</p>
                  )}
                </div>

                {/* Existing action column unchanged */}
                {item.cancelled ? (
                  <p className="text-red-400 text-xs font-medium">Cancelled</p>
                ) : item.isCompleted ? (
                  <p className="text-green-500 text-xs font-medium">Completed</p>
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