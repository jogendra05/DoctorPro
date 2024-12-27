import React, { useContext, useState } from "react";
import SlidebarHealthCheck from "./SlidebarHealthCheck";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const DiabetesPrediction = () => {
  const [active, setActive] = useState(true);
  const [msg1, setMsg1] = useState({})
  const {backendUrl} = useContext(AppContext)

  const [formData, setFormData] = useState({
    heightCm: "",
    weightKg: "",
    Urination: "",
    Excessive_Thirst: "",
    Fatigue: "",
    Hunger: "",
    family_history: "",
  });

  const [additional, setAdditional] = useState({
    bloodPressure: "",
    glucoseLevel: "",
    pregnancies: "",
    skinThickness: "",
    insulin: "",
    bmi: "",
    diabetesPedigree: "",
    age: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAdditional = (e) => {
    const { name, value } = e.target;
    setAdditional({
      ...additional,
      [name]: value,
    });
  };

  const diaGen = async (e) => {
    e.preventDefault()
    try {
      const {data} = await axios.post(backendUrl + '/api/user/diabetes-prediction', formData)
      if (data.success) {
        setMsg1(data)
        console.log(data)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <div className="flex">
      <div>
        <SlidebarHealthCheck />
      </div>

      <div className="w-full m-5 text-gray-600">
        <div className=" sm:w-3/4 bg-gray-200 flex sm:mx-auto flex-col rounded-lg shadow-inner max-w-[750px]">
          <div>
            <button
              onClick={() => setActive(true)}
              className={`w-1/2 ${
                active ? "bg-primary text-white" : ""
              } rounded-lg py-1 transition-all duration-200`}
            >
              Button1
            </button>
            <button
              onClick={() => setActive(false)}
              className={`w-1/2 ${
                !active ? "bg-primary text-white" : ""
              } rounded-lg py-1 transition-all duration-200`}
            >
              Button2
            </button>
          </div>
        </div>

         
          <div className="mt-6 sm:mt-9 sm:mx-10">
            <form onSubmit={diaGen} className="flex flex-col gap-4 sm:gap-8 max-w-[900px] mx-auto">
              <div className="flex flex-col sm:flex-row gap-4 justify-center w-full flex-1">
                <div className="w-[90%] sm:w-[30%] h-[42px] mx-auto sm:m-0">
                  <p>Height (cm)</p>
                  <input
                    className="border rounded py-2 px-2 w-full"
                    type="number"
                    name="heightCm"
                    value={formData.heightCm}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="w-[90%] sm:w-[30%] h-[42px] mx-auto mt-3.5 sm:m-0">
                  <p>Weight (kg)</p>
                  <input
                    className="border rounded py-2 px-2 w-full"
                    type="number"
                    name="weightKg"
                    value={formData.weightKg}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="w-[90%] sm:w-[30%] h-[42px] mx-auto mt-3.5 sm:m-0">
                  <p>Urination</p>
                  <select
                    className="border rounded py-2 px-3 w-full h-full"
                    name="Urination"
                    value={formData.Urination}
                    onChange={handleChange}
                    required
                  >
                    <option disabled value="">
                      Select
                    </option>
                    <option value="Excessive Urination">
                      Excessive Urination
                    </option>
                    <option value="Frequent Urination">
                      Frequent Urination
                    </option>
                    <option value="Normal">
                      Normal
                    </option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center flex-1">
                <div className="w-[90%] sm:w-[30%] h-[42px] mx-auto mt-3.5 sm:mx-0">
                  <p>Excessive Thirst</p>
                  <select
                    className="border rounded py-2 px-3 w-full h-full"
                    name="Excessive_Thirst"
                    value={formData.Excessive_Thirst}
                    onChange={handleChange}
                    required
                  >
                    <option disabled value="">
                      Select
                    </option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div className="w-[90%] sm:w-[30%] h-[42px] mx-auto mt-3.5 sm:mx-0">
                  <p>Fatigue</p>
                  <select
                    className="border rounded py-2 px-3 w-full h-full"
                    name="Fatigue"
                    value={formData.Fatigue}
                    onChange={handleChange}
                    required
                  >
                    <option disabled value="">
                      Select
                    </option>
                    <option value="High">High</option>
                    <option value="Moderate">Moderate</option>
                    <option value="No">No</option>
                  </select>
                </div>

                <div className="w-[90%] sm:w-[30%] h-[42px] mx-auto mt-3.5 sm:mx-0">
                  <p>Hunger</p>
                  <select
                    className="border rounded py-2 px-3 w-full h-full"
                    name="Hunger"
                    value={formData.Hunger}
                    onChange={handleChange}
                    required
                  >
                    <option disabled value="">
                      Select
                    </option>
                    <option value="Normal">Normal</option>
                    <option value="More than Normal">More than Normal</option>
                    <option value="Excessive">Excessive</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col justify-center flex-1 w-full">
                <div className="w-[90%] sm:w-[95%] h-[42px] mx-auto mt-3.5">
                  <p>Family History of Heart Disease</p>
                  <select
                    className="border rounded py-2 px-3 w-full h-full"
                    name="family_history"
                    value={formData.family_history}
                    onChange={handleChange}
                    required
                  >
                    <option disabled value="">
                      Select
                    </option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row mt-8 sm:mt-6 items-center gap-8 ">
                <button type="submit" className="bg-primary text-white w-32 py-1 rounded-full sm:ml-4">
                  Predict
                </button>
                <p className="border px-4 py-1 border-red-300 bg-red-100 text-red-700 rounded-lg">
                  This is the msg
                </p>
              </div>
            </form>
          </div>
        
      </div>
    </div>
  );
};

export default DiabetesPrediction;
