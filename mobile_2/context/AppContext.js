import React from "react";
import { AppProperties } from "../config/config";
export const AppContext = React.createContext({
    appProperties: AppProperties
})
export const AppContextProvider = (props) => {
    let initProperties = React.useRef(AppProperties);
    let appProperties = initProperties.current;
    return (
        <AppContext.Provider
            value={
                appProperties
            }
        >
            {props.children}
        </AppContext.Provider>
    );
}