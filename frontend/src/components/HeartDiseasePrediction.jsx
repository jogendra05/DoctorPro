import React, { useState } from "react";
import SlidebarHealthCheck from './SlidebarHealthCheck'

const HeartDiseasePrediction = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  return (
    <div className='flex'>
      <div>
        <SlidebarHealthCheck/>
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      {/* Button to Open Modal */}
      <button
        onClick={openModal}
        className="px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Open Modal
      </button>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={closeModal}
        >
          <div
            className="relative w-11/12 max-w-lg p-6 bg-white rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">Your Message</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="mt-4">
              <p className="text-gray-600">
                This is a simple modal built with React and Tailwind CSS. You
                can style it further as needed.
              </p>
            </div>

            {/* Modal Footer */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  )
}

export default HeartDiseasePrediction