import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { Link } from 'react-router-dom'

const RelatedDoctor = ({docId, speciality}) => {
    const {doctors} = useContext(AppContext)
    const [relDoc, setRelDoc] = useState([])

    useEffect(() => {
        if (doctors.length > 0 && speciality){
            const docData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId)
            setRelDoc(docData)
        }
    }, [speciality, doctors, docId])



  return (

    <div className='flex flex-col items-center gap-4 text-gray-800 my-16 md:mx-10'>
        <h1 className='text-3xl font-medium'>Related Doctors</h1>
        <p className='text-sm sm:w-1/3 text-center'>Simply browse through our extensive list of trusted doctors.</p>
        <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
            {
                relDoc.map((doctor) => (
                    <Link onClick={() => scrollTo(0,0)} to={`/appointment/${doctor._id}`} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={doctor._id}>
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
                ))
            }
        </div>
    </div>
  )
}

export default RelatedDoctor