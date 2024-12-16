import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home, Doctors, Login, About, MyAppointment, MyProfile, Contact, Appointment } from './pages/index.js'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

const App = () => {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/doctors' element={<Doctors/>} />
        <Route path='/doctors/:speciality' element={<Doctors/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/my-appointment' element={<MyAppointment/>} />
        <Route path='/my-profile' element={<MyProfile/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/appointment/:docId' element={<Appointment/>} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App