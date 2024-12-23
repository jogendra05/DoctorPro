import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const MyAppointment = () => {
  const { token, backendUrl } = useContext(AppContext);
  const [appointment, setAppointment] = useState([])
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const slotDateFormat = (slotDate) => {
    const arr = slotDate.split('_')
    return arr[0] + " " + months[Number(arr[1])-1] + " " + arr[2]
  }
  const getUserAppointment = ( async () => {
    try {
      const {data} = await axios.get(backendUrl + '/api/user/appointments', {headers: {token}})
      if(data.success){
        setAppointment(data.appointment.reverse())
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  })

  const cancelAppointment = async (appointmentId) =>{
    try {
      const {data} = await axios.post(backendUrl + '/api/user/cancel-appointment', {appointmentId}, {headers: {token}})
      if (data.success) {
        toast.success(data.message)
        getUserAppointment()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      getUserAppointment()
    }
  }, [token])

  return  (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My appointments
      </p>
      <div>
        {appointment.map((item, index) => (
          <div
            className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
            key={index}
          >
            <div>
              <img className="w-32 bg-indigo-50" src={item.docData.image} alt="" />
            </div>
            <div className="text-sm text-zinc-600 flex-1">
              <p className="text-neutral-800 font-semibold">{item.docData.name}</p>
              <p>{item.docData.speciality}</p>
              <p className="text-zinc-700 font-medium mt-1">Address: </p>
              <p className="text-xs">{item.docData.address.line1}</p>
              <p className="text-xs">{item.docData.address.line2}</p>
              <p className="text-xs mt-1">
                <span className="text-sm text-neutral-700 font-medium">
                  Date & Time:
                </span>{" "}
                {slotDateFormat(item.slotDate)} | {item.slotTime}
              </p>
            </div>
            <div></div>

            <div className="flex flex-col gap-2 justify-end">
              {!item.cancelled &&
              <button className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300">
                Pay Online
              </button>
              }
              {!item.cancelled && <button onClick={() => cancelAppointment(item._id)} className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300">
                Cancel Appointment
              </button>}
              {
                item.cancelled && <button className="sm:min-w-48 py-2 border rounded border-red-500 text-red-500">Appointment cancelled</button>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointment;
