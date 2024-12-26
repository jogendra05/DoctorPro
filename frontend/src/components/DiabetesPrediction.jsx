import React, { useState } from "react";
import SlidebarHealthCheck from "./SlidebarHealthCheck";

const DiabetesPrediction = () => {
  const [active, setActive] = useState(true);

  const [formData, setFormData] = useState({
    height: "",
    weight: "",
    urination: "",
    nonHealingWound: "",
    blurredVision: "",
    hunger: "",
    familyHistory: "",
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

        {active ? (
          <div className="mt-6 sm:mt-9 sm:mx-10">
            <form className="flex flex-col gap-4 sm:gap-8 max-w-[900px] mx-auto">
              <div className="flex flex-col sm:flex-row gap-4 justify-center w-full flex-1">
                <div className="w-[90%] sm:w-[30%] h-[42px] mx-auto sm:m-0">
                  <p>Height (cm)</p>
                  <input
                    className="border rounded py-2 px-2 w-full"
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="w-[90%] sm:w-[30%] h-[42px] mx-auto mt-3.5 sm:m-0">
                  <p>Weight (kg)</p>
                  <input
                    className="border rounded py-2 px-2 w-full"
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="w-[90%] sm:w-[30%] h-[42px] mx-auto mt-3.5 sm:m-0">
                  <p>Urination</p>
                  <select
                    className="border rounded py-2 px-3 w-full h-full"
                    name="urination"
                    value={formData.urination}
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
                  </select>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center flex-1">
                <div className="w-[90%] sm:w-[30%] h-[42px] mx-auto mt-3.5 sm:mx-0">
                  <p>Non healing wound</p>
                  <select
                    className="border rounded py-2 px-3 w-full h-full"
                    name="nonHealingWound"
                    value={formData.nonHealingWound}
                    onChange={handleChange}
                    required
                  >
                    <option disabled value="">
                      Select
                    </option>
                    <option value="Sensations">Sensations</option>
                    <option value="More infections">More infections</option>
                  </select>
                </div>

                <div className="w-[90%] sm:w-[30%] h-[42px] mx-auto mt-3.5 sm:mx-0">
                  <p>Blurred vision</p>
                  <select
                    className="border rounded py-2 px-3 w-full h-full"
                    name="blurredVision"
                    value={formData.blurredVision}
                    onChange={handleChange}
                    required
                  >
                    <option disabled value="">
                      Select
                    </option>
                    <option value="Blurred">Blurred</option>
                    <option value="Moderate">Moderate</option>
                    <option value="Clear">Clear</option>
                  </select>
                </div>

                <div className="w-[90%] sm:w-[30%] h-[42px] mx-auto mt-3.5 sm:mx-0">
                  <p>Hunger</p>
                  <select
                    className="border rounded py-2 px-3 w-full h-full"
                    name="hunger"
                    value={formData.hunger}
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
                    name="familyHistory"
                    value={formData.familyHistory}
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
                <button className="bg-primary text-white w-32 py-1 rounded-full sm:ml-4">
                  Predict
                </button>
                <p className="border px-4 py-1 border-red-300 bg-red-100 text-red-700 rounded-lg">
                  This is the msg
                </p>
              </div>
            </form>
          </div>
        ) : (
          <div className="mt-6 sm:mt-9 sm:mx-10">
            <form className="flex flex-col gap-4 sm:gap-8 max-w-[900px] mx-auto">
              <div className="flex flex-col sm:flex-row gap-4 justify-center w-full flex-1 ">
                <div className="w-[90%] sm:w-[30%] h-[42px] mx-auto sm:m-0">
                  <p>Blood Pressure</p>
                  <input
                    className="border rounded py-2 px-2 w-full placeholder-light"
                    type="number"
                    name="bloodPressure"
                    placeholder="Enter blood pressure"
                    value={additional.bloodPressure}
                    onChange={handleAdditional}
                    required
                  />
                </div>

                <div className="w-[90%] sm:w-[30%] h-[42px] mx-auto mt-3.5 sm:m-0">
                  <p>Glucose Level</p>
                  <input
                    className="border rounded py-2 px-2 w-full placeholder-light"
                    type="number"
                    name="glucoseLevel"
                    placeholder="Enter glucose level"
                    value={additional.glucoseLevel}
                    onChange={handleAdditional}
                    required
                  />
                </div>

                <div className="w-[90%] sm:w-[30%] h-[42px] mx-auto mt-3.5 sm:m-0">
                  <p>Number of Pregnancies</p>
                  <input
                    className="border rounded py-2 px-2 w-full placeholder-light"
                    type="number"
                    name="pregnancies"
                    placeholder="Number of pregnancies"
                    value={additional.pregnancies}
                    onChange={handleAdditional}
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center flex-1">
                <div className="w-[90%] sm:w-[30%] h-[42px] mx-auto mt-3.5 sm:mx-0">
                  <p>Skin Thickness</p>
                  <input
                    className="border rounded py-2 px-2 w-full placeholder-light"
                    type="number"
                    name="skinThickness"
                    placeholder="Enter skin thickness"
                    value={additional.skinThickness}
                    onChange={handleAdditional}
                    required
                  />
                </div>

                <div className="w-[90%] sm:w-[30%] h-[42px] mx-auto mt-3.5 sm:mx-0">
                  <p>Insulin</p>
                  <input
                    className="border rounded py-2 px-2 w-full placeholder-light"
                    type="number"
                    name="insulin"
                    placeholder="Enter insulin level"
                    value={additional.insulin}
                    onChange={handleAdditional}
                    required
                  />
                </div>

                <div className="w-[90%] sm:w-[30%] h-[42px] mx-auto mt-3.5 sm:mx-0">
                  <p>BMI</p>
                  <input
                    className="border rounded py-2 px-2 w-full placeholder-light"
                    type="number"
                    name="bmi"
                    placeholder="Enter BMI"
                    value={additional.bmi}
                    onChange={handleAdditional}
                    required
                  />
                </div>
              </div>

              <div className="flex w-full flex-col sm:flex-row gap-4 ml-4 flex-1">
                <div className="w-[90%] sm:w-[30%] h-[42px] mx-auto mt-3.5 sm:mx-0">
                  <p>Diabetes Pedigree Function</p>
                  <input
                    className="border rounded py-2 px-2 w-full placeholder-light"
                    type="number"
                    name="diabetesPedigree"
                    placeholder="Diabetes pedigree function"
                    value={additional.diabetesPedigree}
                    onChange={handleAdditional}
                    required
                  />
                </div>

                <div className="w-[90%] sm:w-[30%] h-[42px] mx-auto mt-3.5 sm:mx-0">
                  <p>Age</p>
                  <input
                    className="border rounded py-2 px-2 w-full placeholder-light"
                    type="number"
                    name="age"
                    placeholder="Enter age"
                    value={additional.age}
                    onChange={handleAdditional}
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row mt-8 sm:mt-6 items-center gap-8 ">
                <button className="bg-primary text-white w-32 py-1 rounded-full sm:ml-4">
                  Predict
                </button>
                <p className="border px-4 py-1 border-red-300 bg-red-100 text-red-700 rounded-lg">
                  This is the msg
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiabetesPrediction;
