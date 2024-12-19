import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../contexts/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctors = () => {
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    email: "",
    password: "",
    experience: "1 Year",
    fees: "",
    about: "",
    speciality: "General physician",
    degree: "",
    address: { line1: "", line2: "" },
  });

  const { aToken, backendUrl } = useContext(AdminContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (!formData.image) {
        return toast.error("Image Not Selected");
      }

      const newForm = new FormData();

      newForm.append("image", formData.image);
      newForm.append("name", formData.name);
      newForm.append("email", formData.email);
      newForm.append("password", formData.password);
      newForm.append("experience", formData.experience);
      newForm.append("fees", Number(formData.fees));
      newForm.append("about", formData.about);
      newForm.append("speciality", formData.speciality);
      newForm.append("degree", formData.degree);
      newForm.append("address", JSON.stringify(formData.image));

      const { data } = await axios.post(
        backendUrl + "/api/admin/add-doctor",
        newForm,
        { headers: { aToken } }
      ); // here aToken will be passed and become atoken

      if (data.success) {
        toast.success(data.message);
        setFormData({
          image: "",
          name: "",
          email: "",
          password: "",
          experience: "1 Year",
          fees: "",
          about: "",
          speciality: "General physician",
          degree: "",
          address: { line1: "", line2: "" },
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full ">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>
      <div className="bg-white border rounded p-8 w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img">
            <img
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
              src={
                formData.image
                  ? URL.createObjectURL(formData.image)
                  : assets.upload_area
              }
              alt=""
            />
          </label>
          <input
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, image: e.target.files[0] }))
            }
            type="file"
            id="doc-img"
            hidden
          />
          <p>
            Upload Doctor <br /> picture
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Name</p>
              <input
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                value={formData.name}
                className="border rounded py-2 px-3"
                type="text"
                placeholder="Name"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Email</p>
              <input
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                value={formData.email}
                className="border rounded py-2 px-3"
                type="email"
                placeholder="Email"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Doctor Password</p>
              <input
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, password: e.target.value }))
                }
                value={formData.password}
                className="border rounded py-2 px-3"
                type="password"
                placeholder="Password"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Experience</p>
              <select
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    experience: e.target.value,
                  }))
                }
                value={formData.experience}
                className="border rounded py-2 px-3"
                name=""
                id=""
              >
                <option value="1">1 Year</option>
                <option value="2">2 Years</option>
                <option value="3">3 Years</option>
                <option value="4">4 Years</option>
                <option value="5">5 Years</option>
                <option value="6">6 Years</option>
                <option value="7">7 Years</option>
                <option value="8">8 Years</option>
                <option value="9">9 Years</option>
                <option value="10">10 Years</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Fees</p>
              <input
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, fees: e.target.value }))
                }
                value={formData.fees}
                className="border rounded py-2 px-3"
                type="number"
                placeholder="Fees"
                required
              />
            </div>
          </div>

          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-1">
              <p>Speciality</p>
              <select
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    speciality: e.target.value,
                  }))
                }
                value={formData.speciality}
                className="border rounded py-2 px-3"
                name=""
                id=""
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Education</p>
              <input
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, degree: e.target.value }))
                }
                value={formData.degree}
                className="border rounded py-2 px-3"
                type="text"
                placeholder="Education"
                required
              />
            </div>

            <div className="flex-1 flex flex-col gap-1">
              <p>Address</p>
              <input
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
                value={formData.address.line1}
                className="border rounded py-2 px-3"
                type="text"
                placeholder="Address1"
                required
              />
              <input
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
                value={formData.address.line2}
                className="border rounded py-2 px-3"
                type="text"
                placeholder="Address2"
                required
              />
            </div>
          </div>
        </div>

        <div>
          <div className="text-gray-600">
            <p className="mt-4 mb-2">About Doctor</p>
            <textarea
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, about: e.target.value }))
              }
              value={formData.about}
              className="w-full px-4 pt-2 border rounded"
              placeholder="Write about doctor"
              rows={5}
              required
            />
          </div>
        </div>
        <button className="bg-primary text-white  rounded-full px-10 py-3 mt-4">
          Add Doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctors;
