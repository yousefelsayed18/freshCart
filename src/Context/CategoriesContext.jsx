import { createContext } from "react";

export let CategoriesContext = createContext();

export default function CategoriesContextProvider(props){

    return <CategoriesContext.Provider value={{}}>
        {props.children}
    </CategoriesContext.Provider>
}