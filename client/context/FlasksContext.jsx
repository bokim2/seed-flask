import React, {useState, createContext} from "react";

export const FlasksContext = createContext();

export const FlasksContextProvider = props => {
    const [flasks, setFlasks] = useState([]);
    const addFlasks = (flask) =>{
        setFlasks([...flasks, flask])
    }

    return (
        <FlasksContext.Provider value={{flasks, setFlasks, addFlasks}}>
            {props.children}
        </FlasksContext.Provider>
    )
}