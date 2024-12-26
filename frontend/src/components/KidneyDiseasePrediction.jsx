import React, { useState } from "react";
import SlidebarHealthCheck from "./SlidebarHealthCheck";

const KidneyDiseasePrediction = () => {
  const [isVisible, setIsVisible] = useState(false);

  const showMessage = () => setIsVisible(true);
  return (
    <div className="flex">
      <div>
        <SlidebarHealthCheck />
      </div>

      <div className="mt-6 sm:mt-9 sm:mx-10">
        <form className="flex flex-wrap gap-4 justify-center max-w-[900px] mx-auto">
          {/* Age */}
          <div className="w-full sm:w-[30%] lg:w-[22%]">
            <p className="text-sm">Age</p>
            <input className="border rounded py-1 px-2 w-full" type="number" />
          </div>

          {/* Blood Pressure */}
          <div className="w-full sm:w-[30%] lg:w-[22%]">
            <p className="text-sm">Blood Pressure</p>
            <input className="border rounded py-1 px-2 w-full" type="number" />
          </div>

          {/* Specific Gravity */}
          <div className="w-full sm:w-[30%] lg:w-[22%]">
            <p className="text-sm">Specific Gravity</p>
            <input className="border rounded py-1 px-2 w-full" type="number" />
          </div>

          {/* Red Blood Cells */}
          <div className="w-full sm:w-[30%] lg:w-[22%]">
            <p className="text-sm">Red Blood Cells</p>
            <select className="border rounded py-1 px-2 w-full">
              <option disabled hidden>
                Select
              </option>
              <option value="Normal">Normal</option>
              <option value="Abnormal">Abnormal</option>
            </select>
          </div>

          {/* Pus Cells */}
          <div className="w-full sm:w-[30%] lg:w-[22%]">
            <p className="text-sm">Pus Cells</p>
            <select className="border rounded py-1 px-2 w-full">
              <option disabled hidden>
                Select
              </option>
              <option value="Normal">Normal</option>
              <option value="Abnormal">Abnormal</option>
            </select>
          </div>

          {/* Pus Cell Clumps */}
          <div className="w-full sm:w-[30%] lg:w-[22%]">
            <p className="text-sm">Pus Cell Clumps</p>
            <select className="border rounded py-1 px-2 w-full">
              <option disabled hidden>
                Select
              </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* Blood Urea */}
          <div className="w-full sm:w-[30%] lg:w-[22%]">
            <p className="text-sm">Blood Urea</p>
            <input className="border rounded py-1 px-2 w-full" type="number" />
          </div>

          {/* Serum Creatinine */}
          <div className="w-full sm:w-[30%] lg:w-[22%]">
            <p className="text-sm">Serum Creatinine</p>
            <input className="border rounded py-1 px-2 w-full" type="number" />
          </div>

          {/* Sodium */}
          <div className="w-full sm:w-[30%] lg:w-[22%]">
            <p className="text-sm">Sodium</p>
            <input className="border rounded py-1 px-2 w-full" type="number" />
          </div>

          {/* Potassium */}
          <div className="w-full sm:w-[30%] lg:w-[22%]">
            <p className="text-sm">Potassium</p>
            <input className="border rounded py-1 px-2 w-full" type="number" />
          </div>

          {/* Hemoglobin */}
          <div className="w-full sm:w-[30%] lg:w-[22%]">
            <p className="text-sm">Hemoglobin</p>
            <input className="border rounded py-1 px-2 w-full" type="number" />
          </div>

          {/* Blood Glucose Random */}
          <div className="w-full sm:w-[30%] lg:w-[22%]">
            <p className="text-sm">Blood Glucose Random</p>
            <input className="border rounded py-1 px-2 w-full" type="number" />
          </div>

          {/* Bacteria */}
          <div className="w-full sm:w-[30%] lg:w-[22%]">
            <p className="text-sm">Bacteria</p>
            <select className="border rounded py-1 px-2 w-full">
              <option disabled hidden>
                Select
              </option>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>
          </div>

          {/* Hypertension */}
          <div className="w-full sm:w-[30%] lg:w-[22%]">
            <p className="text-sm">Hypertension</p>
            <select className="border rounded py-1 px-2 w-full">
              <option disabled hidden>
                Select
              </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* Diabetes Mellitus */}
          <div className="w-full sm:w-[30%] lg:w-[22%]">
            <p className="text-sm">Diabetes Mellitus</p>
            <select className="border rounded py-1 px-2 w-full">
              <option disabled hidden>
                Select
              </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* Coronary Artery Disease */}
          <div className="w-full sm:w-[30%] lg:w-[22%]">
            <p className="text-sm">Coronary Artery Disease</p>
            <select className="border rounded py-1 px-2 w-full">
              <option disabled hidden>
                Select
              </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* Appetite */}
          <div className="w-full sm:w-[30%] lg:w-[22%]">
            <p className="text-sm">Appetite</p>
            <select className="border rounded py-1 px-2 w-full">
              <option disabled hidden>
                Select
              </option>
              <option value="Good">Good</option>
              <option value="Poor">Poor</option>
            </select>
          </div>

          {/* Pedal Edema */}
          <div className="w-full sm:w-[30%] lg:w-[22%]">
            <p className="text-sm">Pedal Edema</p>
            <select className="border rounded py-1 px-2 w-full">
              <option disabled hidden>
                Select
              </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* Anemia */}
          <div className="w-full sm:w-[30%] lg:w-[22%]">
            <p className="text-sm">Anemia</p>
            <select className="border rounded py-1 px-2 w-full">
              <option disabled hidden>
                Select
              </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </form>
      </div>
    </div>
  );
};

export default KidneyDiseasePrediction;
