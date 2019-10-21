// imports
import React, {useContext} from "react";
import {createUseStyles} from "react-jss";
import {AppContext} from "../../AppContext";
import {MenuIcon} from "./MenuIcon";


// component
export const Header = () => {

    // resolve context + classes
    const appContext = useContext(AppContext);
    const classes = useStyles();

    // render
    return (
        <header className={classes.container}>
            <MenuIcon active={appContext.navOpen} onClick={appContext.toggleNav}/>
            <h2>Lattice</h2>
        </header>
    );
};


// styles
const useStyles = createUseStyles({
    container: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        color: "#fff",
        backgroundColor: "#000",
        zIndex: 10,

        "& > *": {
            display: "inline-block"
        }
    }
});
