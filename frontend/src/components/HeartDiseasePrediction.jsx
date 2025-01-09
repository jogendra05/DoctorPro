import React, { useContext, useState } from "react";
import SlidebarHealthCheck from "./SlidebarHealthCheck";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const HeartDiseasePrediction = () => {
  const [active, setActive] = useState(true);
  const [msg1, setMsg1] = useState(false);
  const { backendUrl } = useContext(AppContext);

  const [general, setGeneral] = useState({
    height: "",
    weight: "",
    age: "",
    chestPain: "",
    shortnessOfBreath: "",
    fatigue: "",
    dizziness: "",
    painInOtherAreas: "",
    familyHistoryDiabetes: "",
  });

  const [additional, setAdditional] = useState({
    age: "",
    sex: "",
    bloodPressure: "",
    serumCholesterol: "",
    bloodSugar: "",
    heartRate: "",
    exerciseAngina: "",
    stDepression: "",
    stSlope: "",
    mvcFluoroscopy: "",
    chestPainLevel: "",
    recg: "",
    reversibleDefect: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGeneral({ ...general, [name]: value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdditional((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const heartGen = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/heart-prediction",
        general
      );
      if (data.success) {
        setMsg1(data);
        
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

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
              Based on Lifecycle
            </button>
            <button
              onClick={() => setActive(false)}
              className={`w-1/2 ${
                !active ? "bg-primary text-white" : ""
              } rounded-lg py-1 transition-all duration-200`}
            >
              Based on Report
            </button>
          </div>
        </div>

        {active ? (
          <div className="mt-6 sm:mt-9 sm:mx-10">
            <form
              onSubmit={heartGen}
              className="flex flex-col gap-4 sm:gap-8 max-w-[900px] mx-auto"
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-center w-full flex-1">
                <div className="w-[90%] sm:w-[30%] h-[42px] mx-auto sm:m-0">
                  <p>Height (cm)</p>
                  <input
                    className="border rounded py-2 px-2 w-full placeholder-gray-400"
                    type="number"
                    name="height"
                    placeholder="Enter height in cm"
                    value={general.height}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="w-[90%] sm:w-[30%] h-[42px] mx-auto mt-3.5 sm:m-0">
                  <p>Weight (kg)</p>
                  <input
                    className="border rounded py-2 px-2 w-full placeholder-gray-400"
                    type="number"
                    name="weight"
                    placeholder="Enter weight in kg"
                    value={general.weight}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="w-[90%] sm:w-[30%] h-[42px] mx-auto mt-3.5 sm:m-0">
                  <p>Age</p>
                  <input
                    className="border rounded py-2 px-2 w-full placeholder-gray-400"
                    type="number"
                    name="age"
                    placeholder="Enter age"
                    value={general.age}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center flex-1">
                <div className="w-[90%] sm:w-[30%] h-[42px] mx-auto mt-3.5 sm:mx-0">
                  <p>Chest Pain</p>
                  <select
                    className="border rounded py-2 px-3 w-full h-full placeholder-gray-400"
                    name="chestPain"
                    value={general.chestPain}
                    onChange={handleInputChange}
                    required
                  >
                    <option disabled value="">
                      Select
                    </option>
                    <option value="No">No</option>
                    <option value="Elevated">Elevated</option>
                    <option value="High Pain">High Pain</option>
                  </select>
                </div>

                <div className="w-[90%] sm:w-[30%] h-[42px] mx-auto mt-3.5 sm:mx-0">
                  <p>Shortness of Breath</p>
                  <select
                    className="border rounded py-2 px-3 w-full h-full placeholder-gray-400"
                    name="shortnessOfBreath"
                    value={general.shortnessOfBreath}
                    onChange={handleInputChange}
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
                    className="border rounded py-2 px-3 w-full h-full placeholder-gray-400"
                    name="fatigue"
                    value={general.fatigue}
                    onChange={handleInputChange}
                    required
                  >
                    <option disabled value="">
                      Select
                    </option>
                    <option value="No">No</option>
                    <option value="Light">Light</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center w-full flex-1">
                <div className="w-[90%] sm:w-[30%] h-[42px] mx-auto mt-3.5 sm:mx-0">
                  <p>Dizziness</p>
                  <select
                    className="border rounded py-2 px-3 w-full h-full placeholder-gray-400"
                    name="dizziness"
                    value={general.dizziness}
                    onChange={handleInputChange}
                    required
                  >
                    <option disabled value="">
                      Select
                    </option>
                    <option value="No">No</option>
                    <option value="Light">Light</option>
                    <option value="High">High</option>
                  </select>
                </div>

                <div className="w-[90%] sm:w-[30%] h-[42px] mx-auto mt-3.5 sm:mx-0">
                  <p>Pain in Other Areas</p>
                  <select
                    className="border rounded py-2 px-3 w-full h-full placeholder-gray-400"
                    name="painInOtherAreas"
                    value={general.painInOtherAreas}
                    onChange={handleInputChange}
                    required
                  >
                    <option disabled value="">
                      Select
                    </option>
                    <option value="No">No</option>
                    <option value="Light">Light</option>
                    <option value="High">High</option>
                  </select>
                </div>

                <div className="w-[90%] sm:w-[30%] h-[42px] mx-auto mt-3.5 sm:mx-0">
                  <p>Family History of Diabetes</p>
                  <select
                    className="border rounded py-2 px-3 w-full h-full placeholder-gray-400"
                    name="familyHistoryDiabetes"
                    value={general.familyHistoryDiabetes}
                    onChange={handleInputChange}
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
                <button
                  type="submit"
                  className="bg-primary text-white w-32 py-1 rounded-full sm:ml-4"
                >
                  Predict
                </button>
                {msg1 ? (
                  <p
                    className={`border px-4 py-1 ${
                      msg1.riskCategory === "High Risk"
                        ? "border-red-300 bg-red-100 text-red-700"
                        : msg1.riskCategory === "Moderate Risk"
                        ? "border-yellow-300 bg-yellow-100 text-yellow-700"
                        : "border-green-300 bg-green-100 text-green-700"
                    } rounded-lg`}
                  >
                    {msg1.riskCategory}!!! {msg1.message}
                  </p>
                ) : (
                  <p></p>
                )}
              </div>
            </form>
          </div>
        ) : (
          <div className="mt-6 sm:mt-9 sm:mx-10">
            <form>
              <div className="flex flex-wrap gap-4 justify-center max-w-[900px] mx-auto">
                {/* Age */}
                <div className="w-full sm:w-[30%] lg:w-[22%]">
                  <p className="text-sm">Age</p>
                  <input
                    className="border rounded py-1 px-2 w-full"
                    type="number"
                    name="age"
                    placeholder="Enter age"
                    value={additional.age}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Sex */}
                <div className="w-full sm:w-[30%] lg:w-[22%]">
                  <p className="text-sm">Sex</p>
                  <select
                    className="border rounded py-1 px-2 w-full h-[34px]"
                    name="sex"
                    value={additional.sex}
                    onChange={handleChange}
                    required
                  >
                    <option disabled value="">
                      Select
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                {/* Blood Pressure */}
                <div className="w-full sm:w-[30%] lg:w-[22%]">
                  <p className="text-sm">Blood Pressure</p>
                  <input
                    className="border rounded py-1 px-2 w-full"
                    type="number"
                    name="bloodPressure"
                    placeholder="Enter BP"
                    value={additional.bloodPressure}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Serum Cholesterol */}
                <div className="w-full sm:w-[30%] lg:w-[22%]">
                  <p className="text-sm">Serum Cholesterol</p>
                  <input
                    className="border rounded py-1 px-2 w-full"
                    type="number"
                    step="0.1"
                    name="serumCholesterol"
                    placeholder="Enter cholesterol"
                    value={additional.serumCholesterol}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Blood Sugar */}
                <div className="w-full sm:w-[30%] lg:w-[22%]">
                  <p className="text-sm">Blood Sugar</p>
                  <select
                    className="border rounded py-1 px-2 w-full h-[34px]"
                    name="bloodSugar"
                    value={additional.bloodSugar}
                    onChange={handleChange}
                    required
                  >
                    <option disabled value="">
                      Select
                    </option>
                    <option value=">120 mg/dl">{">"} 120 mg/dl</option>
                    <option value="<120 mg/dl">{"<"} 120 mg/dl</option>
                  </select>
                </div>

                {/* Current Heart Rate */}
                <div className="w-full sm:w-[30%] lg:w-[22%]">
                  <p className="text-sm">Current Heart Rate</p>
                  <input
                    className="border rounded py-1 px-2 w-full"
                    type="number"
                    name="heartRate"
                    placeholder="Enter heart rate"
                    value={additional.heartRate}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Exercise Induced Angina */}
                <div className="w-full sm:w-[30%] lg:w-[22%]">
                  <p className="text-sm">Exercise Induced Angina</p>
                  <select
                    className="border rounded py-1 px-2 w-full h-[34px]"
                    name="exerciseAngina"
                    value={additional.exerciseAngina}
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

                {/* ST Depression */}
                <div className="w-full sm:w-[30%] lg:w-[22%]">
                  <p className="text-sm">ST Depression</p>
                  <input
                    className="border rounded py-1 px-2 w-full"
                    type="number"
                    step="0.1"
                    name="stDepression"
                    placeholder="Enter ST depression"
                    value={additional.stDepression}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Slope of the Peak ST */}
                <div className="w-full sm:w-[30%] lg:w-[22%]">
                  <p className="text-sm">Slope of the Peak ST</p>
                  <input
                    className="border rounded py-1 px-2 w-full"
                    type="number"
                    step="0.1"
                    name="stSlope"
                    placeholder="Enter ST slope"
                    value={additional.stSlope}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* MVC by Fluoroscopy */}
                <div className="w-full sm:w-[30%] lg:w-[22%]">
                  <p className="text-sm">MVC by Fluoroscopy</p>
                  <input
                    className="border rounded py-1 px-2 w-full"
                    type="number"
                    name="mvcFluoroscopy"
                    placeholder="Enter MVC"
                    value={additional.mvcFluoroscopy}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Chest Pain Level */}
                <div className="w-full sm:w-[30%] lg:w-[22%]">
                  <p className="text-sm">Chest Pain Level</p>
                  <select
                    className="border rounded py-1 px-2 w-full h-[34px]"
                    name="chestPainLevel"
                    value={additional.chestPainLevel}
                    onChange={handleChange}
                    required
                  >
                    <option disabled value="">
                      Select
                    </option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                  </select>
                </div>

                {/* R ECG */}
                <div className="w-full sm:w-[30%] lg:w-[22%]">
                  <p className="text-sm">R ECG</p>
                  <select
                    className="border rounded py-1 px-2 w-full h-[34px]"
                    name="recg"
                    value={additional.recg}
                    onChange={handleChange}
                    required
                  >
                    <option disabled value="">
                      Select
                    </option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                  </select>
                </div>

                {/* Reversible Defect */}
                <div className="w-full sm:w-[30%] lg:w-[22%]">
                  <p className="text-sm">Reversible Defect</p>
                  <select
                    className="border rounded py-1 px-2 w-full h-[34px]"
                    name="reversibleDefect"
                    value={additional.reversibleDefect}
                    onChange={handleChange}
                    required
                  >
                    <option disabled value="">
                      Select
                    </option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row mt-8 items-center gap-8 ">
                <button
                  type="submit"
                  className="bg-primary text-white w-32 py-1 rounded-full sm:ml-4"
                >
                  Predict
                </button>
                {false && <p className="border px-4 py-1 border-red-300 bg-red-100 text-red-700 rounded-lg">
                  
                </p>}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeartDiseasePrediction;
