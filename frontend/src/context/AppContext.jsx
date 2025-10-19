import { createContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [doctors, setDoctors] = useState([]);
  const [doctorsLoading, setDoctorsLoading] = useState(false); 
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false
  );
  const [userData, setUserData] = useState(false);

  const getDoctorsData = useCallback(async () => {
    setDoctorsLoading(true);
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/list", {
        // don't cache responses
        headers: { "Cache-Control": "no-cache" },
      });

      if (data.success) {
        setDoctors(Array.isArray(data.doctors) ? data.doctors : []);
        return true;
      } else {
        setDoctors([]);
        toast.error(data.message);
        return false;
      }
    } catch (error) {
      setDoctors([]); 
      toast.error(error.message);
      return false;
    } finally {
      setDoctorsLoading(false);
    }
  }, [backendUrl]);

  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/get-profile", {
        headers: { token },
      });
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const value = {
    doctors,
    getDoctorsData,
    doctorsLoading,
    backendUrl,
    token,
    setToken,
    userData,
    setUserData,
    loadUserProfileData,
  };

  useEffect(() => {
    getDoctorsData();
  }, [getDoctorsData]);

  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(false);
    }
  }, [token]);

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
