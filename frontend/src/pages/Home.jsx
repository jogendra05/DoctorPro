import React, {useContext} from "react";
import Header from "../components/Header";
import SpeacialityMenu from "../components/SpeacialityMenu";
import TopDoctors from "../components/TopDoctors";
import Banner from "../components/Banner";
import ServerAwareSection from "../components/ServerAwareSection";
import { AppContext } from '../context/AppContext.jsx';

const Home = () => {
  const { getDoctorsData, backendUrl } = useContext(AppContext);
  return (
    <div>
      <Header />
      <SpeacialityMenu />
      <ServerAwareSection
      healthUrl={backendUrl + '/health'}
      onReady={getDoctorsData}
    >
      <TopDoctors />
    </ServerAwareSection>
      <Banner />
    </div>
  );
};

export default Home;
