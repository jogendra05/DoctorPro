import React, { useState } from "react";

const AddDoctor = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    experience: "",
    fees: "",
    about: "",
    speciality: "General physician",
    education: "",
    address1: "",
    address2: "",
    picture: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, picture: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-blue-600 text-white flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
        <nav className="flex flex-col space-y-4">
          <a
            href="/dashboard"
            className="text-white hover:bg-blue-700 px-4 py-2 rounded-md"
          >
            Dashboard Home
          </a>
          <a
            href="/add-doctor"
            className="text-white hover:bg-blue-700 px-4 py-2 rounded-md"
          >
            Add Doctor
          </a>
          <a
            href="/appointments"
            className="text-white hover:bg-blue-700 px-4 py-2 rounded-md"
          >
            Appointments
          </a>
          <a
            href="/patients"
            className="text-white hover:bg-blue-700 px-4 py-2 rounded-md"
          >
            Patients
          </a>
        </nav>
        <div className="mt-auto">
          <button className="w-full bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md font-semibold">
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Add Doctor
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Upload Picture */}
            <div className="flex flex-col items-center mb-6">
              <label
                className="text-gray-700 font-medium mb-2"
                htmlFor="doctor-picture"
              >
                Upload Doctor Picture
              </label>
              <input
                type="file"
                id="doctor-picture"
                onChange={handleFileChange}
                className="block text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:border-0 file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            {/* Name and Speciality */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Doctor Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Speciality
                </label>
                <select
                  name="speciality"
                  value={formData.speciality}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                  <option value="General physician">General physician</option>
                  <option value="Cardiologist">Cardiologist</option>
                  <option value="Dermatologist">Dermatologist</option>
                </select>
              </div>
            </div>

            {/* Email and Education */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Doctor Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Education
                </label>
                <input
                  type="text"
                  name="education"
                  value={formData.education}
                  onChange={handleInputChange}
                  placeholder="Education"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            {/* Password and Address */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Doctor Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Address 1
                </label>
                <input
                  type="text"
                  name="address1"
                  value={formData.address1}
                  onChange={handleInputChange}
                  placeholder="Address 1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            {/* Experience and Address 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Experience
                </label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  placeholder="Experience"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Address 2
                </label>
                <input
                  type="text"
                  name="address2"
                  value={formData.address2}
                  onChange={handleInputChange}
                  placeholder="Address 2"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            {/* Fees */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Fees
              </label>
              <input
                type="text"
                name="fees"
                value={formData.fees}
                onChange={handleInputChange}
                placeholder="Your fees"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* About Me */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                About Me
              </label>
              <textarea
                name="about"
                value={formData.about}
                onChange={handleInputChange}
                placeholder="Write about yourself"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows="4"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
            >
              Add Doctor
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDoctor;
