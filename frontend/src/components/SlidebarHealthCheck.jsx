import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const SlidebarHealthCheck = () => {

    const {token} = useContext(AppContext)
  return (
    <div className='min-h-screen min-w-[10vw] bg-white border-r'>
        {   
             <ul className='text-[#515151] mt-5'>

                <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/diabetes-prediction'}>
                    <img className='w-8' src={assets.Diabetes} alt="" />
                    <p className='hidden md:block'>Diabetes Prediction</p>
                </NavLink>

                <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to ={'/heart-disease-prediction'}>
                    <img className='w-7' src={assets.Heart} alt="" />
                    <p className='hidden md:block'>Heart Disease Prediction</p>
                </NavLink>

                <NavLink className={({isActive}) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`} to={'/kidney-disease-prediction'}>
                    <img className='w-7' src={assets.kidney} alt="" />
                    <p className='hidden md:block'>Kidney Disease Prediction</p>
                </NavLink>
            </ul>
        }
        
    </div>
  )
}

export default SlidebarHealthCheck