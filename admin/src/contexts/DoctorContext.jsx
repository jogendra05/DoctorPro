import { createContext } from "react";


export const DoctorContext = createContext()

const DoctorContextProvider = (props) => {

    value = {

    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}