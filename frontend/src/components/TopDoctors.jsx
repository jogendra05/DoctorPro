import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";
const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  return (
    <div className="flex flex-col items-center gap-4 text-gray-800 my-16 md:mx-10">
      <h1 className="text-3xl font-medium">Top Doctors to Book</h1>
      <p className="text-sm sm:w-1/3 text-center">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className="w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {doctors.slice(0, 10).map((doctor) => (
          <Link
            to={`/appointment/${doctor._id}`}
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
            key={doctor._id}
          >
            <div>
              <img className="bg-blue-50" src={doctor.image} alt="" />
              <div className="p-4">
                <div
                  className={`flex items-center text-sm gap-2 text-center ${
                    doctor.available ? "text-green-500" : "text-gray-500"
                  }`}
                >
                  <p
                    className={`w-2 h-2 ${
                      doctor.available ? "bg-green-500" : "bg-gray-500"
                    } rounded-full`}
                  ></p>
                  <p>{doctor.available ? "Available" : "Not Available"}</p>
                </div>
                <p className="text-lg font-medium text-gray-900">
                  {doctor.name}
                </p>
                <p className="text-gray-600 text-sm">{doctor.speciality}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <button
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0);
        }}
        className="bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10"
      >
        more
      </button>
    </div>
  );
};

export default TopDoctors;
