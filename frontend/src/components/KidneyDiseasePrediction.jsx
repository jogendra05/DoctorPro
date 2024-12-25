import React, { useState } from "react";
import SlidebarHealthCheck from './SlidebarHealthCheck'

const KidneyDiseasePrediction = () => {
  const [isVisible, setIsVisible] = useState(false);

  const showMessage = () => setIsVisible(true);
  return (
    <div className='flex'>
      <div>
        <SlidebarHealthCheck/>
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      {/* Button to Show Message */}
      <button
        onClick={showMessage}
        className="px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Click Me
      </button>

      {/* Message Box */}
      {isVisible && (
        <div className="mt-4 p-4 bg-blue-100 border border-blue-300 rounded-md shadow-md text-blue-700">
          <p>Your message goes here!</p>
        </div>
      )}
    </div>
    </div>
  )
}

export default KidneyDiseasePrediction