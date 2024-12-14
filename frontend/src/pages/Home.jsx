import React from 'react'
import Header from '../components/Header'
import SpeacialityMenu from '../components/SpeacialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'

const Home = () => {
  return (
    <div>
      <Header/>
      <SpeacialityMenu/>
      <TopDoctors/>
      <Banner/>
    </div>
  )
}

export default Home