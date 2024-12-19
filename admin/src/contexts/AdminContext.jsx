import { createContext } from "react";


export const AdminContext = createContext()

const AdminContextProvider = (props) => {

    value = {

    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}