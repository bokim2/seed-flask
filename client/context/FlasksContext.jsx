import React, {useState, createContext} from "react";

export const FlasksContext = createContext();

export const FlasksContextProvider = props => {
    const [flasks, setFlasks] = useState([]);

    return (
        <FlasksContext.Provider value={{flasks, setFlasks}}>
            {props.children}
        </FlasksContext.Provider>
    )
}