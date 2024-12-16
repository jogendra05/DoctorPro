import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { specialityData } from '../assets/assets.js'
import { AppContext } from '../context/AppContext.jsx'


const Doctors = () => {
  
  const {speciality} = useParams()
  const {doctors} = useContext(AppContext)
  const [filterDoc, setFilterDoc] = useState([])
  const navigate = useNavigate()

  const applyFilter = () => {
    if(speciality){
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    }else{
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])
  
  return (
    <div>
      <p className='text-gray-600'>Browse through the doctors specialist.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
          {/* Filter */}
        <div className='flex-col text-gray-600 text-sm'>
          <ul className='flex flex-col gap-4'>
            {
              specialityData.map((item, index) => (
                <p onClick={() => speciality === item.speciality ? navigate('/doctors') : navigate(`/doctors/${item.speciality}`)} className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === item.speciality? 'bg-indigo-100 text-black' : null}`} key={index}>
                  {item.speciality}
                </p>
              ))
            }
          </ul>
        </div>


        {/* Doctors */}
        <div className='w-full grid grid-cols-auto gap-4 gap-y-6 px-3 '>
            {
              filterDoc.map((doctor) => (
                  <Link to={`/appointment/${doctor._id}`} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={doctor._id}>
                      <div>
                          <img className='bg-blue-50' src={doctor.image} alt="" />
                          <div className='p-4'>
                              <div className='flex items-center text-sm gap-2 text-center text-green-500'>
                                  <p className='w-2 h-2 bg-green-500 rounded-full'></p><p>Available</p>
                              </div>
                              <p className='text-lg font-medium text-gray-900'>{doctor.name}</p>
                              <p className='text-gray-600 text-sm'>{doctor.speciality}</p>
                          </div>
                      </div>
                      
                  </Link>
              ))}
          
        </div>
        
      </div>
    </div>
  )
}

export default Doctors