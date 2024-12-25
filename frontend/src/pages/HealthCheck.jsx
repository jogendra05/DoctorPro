import React from 'react'
import { ToastContainer, toast } from "react-toastify";
import SlidebarHealthCheck from '../components/SlidebarHealthCheck';
import { Route, Routes } from 'react-router-dom';
import DiabetesPrediction from '../components/DiabetesPrediction';
import HeartDiseasePrediction from '../components/HeartDiseasePrediction';
import KidneyDiseasePrediction from '../components/KidneyDiseasePrediction';

const HealthCheck = () => {
  return (
    <div className="flex items-start">
      < Routes path='/health-check/*' element={<SlidebarHealthCheck/>}>
        <Route path='diabetes-prediction' element={<DiabetesPrediction/>}/>
        <Route path='heart-disease-prediction' element={<HeartDiseasePrediction/>}/>
        <Route path='kidney-disease-prediction' element={<KidneyDiseasePrediction/>}/>
      </Routes>
    </div>
  )
}

export default HealthCheck