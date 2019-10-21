// imports
import React from "react";


// types
export interface IAppContextData {
    navOpen: boolean;
    toggleNav: () => void;
}


// export context
export const AppContext = React.createContext<IAppContextData>({
    navOpen: false,
    toggleNav: () => false
});
