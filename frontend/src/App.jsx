import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home, Doctors, Login, About, MyAppointment, MyProfile, Contact, Appointment } from './pages/index.js'

const App = () => {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/doctors' element={<Doctors/>} />
        <Route path='/doctors/:speciality' element={<Doctors/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/my-appointment' element={<MyAppointment/>} />
        <Route path='/my-profile' element={<MyProfile/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/appontment/:docId' element={<Appointment/>} />
      </Routes>
    </div>
  )
}

export default App