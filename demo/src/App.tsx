// imports
import { useBreakpoint } from "@nascentdigital/react-lattice";
import classNames from "classnames";
import React, {useEffect, useState} from "react";
import {createUseStyles, useTheme} from "react-jss";
import {AppContext} from "./AppContext";
import {appStyles} from "./AppStyles";
import {BasicLayout} from "./BasicLayout";
import {Header} from "./components";
import {ResponsiveLayout} from "./ResponsiveLayout";
import {WrapLayout} from "./WrapLayout";


// component
export const App = () => {

    // capture styles + state
    const theme = useTheme();
    const classes = useStyles({theme});
    const [navOpen, setNavOpen] = useState(false);
    const breakpoint = useBreakpoint();
    const [currentBreakpoint, setCurrentBreakpoint] = useState(breakpoint);

    const toggleNav = () => {
        console.log(`nav ${navOpen ? "closing" : "opening"}`);
        setNavOpen(!navOpen);
    };

    useEffect(() => {
        if (breakpoint !== currentBreakpoint) {
            if (currentBreakpoint === "xs" && breakpoint === "sm") {
                console.log("breakpoint update from XS -> SM");
                setNavOpen(true);
            } else if (currentBreakpoint === "sm" && breakpoint === "xs") {
                console.log("reverse size SM -> XS");
                setNavOpen(false);
            }
            setCurrentBreakpoint(breakpoint);
        }
    }, [breakpoint]);

    // render
    return (
        <AppContext.Provider value={{navOpen, toggleNav}}>
            <div className={classes.container}>
                <Header />
                <nav className={classNames(classes.nav, {[classes.navOpen]: navOpen})}>
                    <h3>Grid</h3>
                    <ul>
                        <li>Static</li>
                        <li>Responsive</li>
                    </ul>
                </nav>
                <main className={classes.content}>
                    <ResponsiveLayout/>
                    <BasicLayout/>
                    <WrapLayout/>
                </main>
            </div>
        </AppContext.Provider>
    );
};


const useStyles = createUseStyles<string>((theme: any) => ({
    ...appStyles,
    container: {
        position: "relative",
        minHeight: "100vh",
        color: "#000"
    },
    nav: {
        position: "fixed",
        top: "50px",
        left: "-250px",
        bottom: 0,
        width: "250px",
        visibility: "hidden",
        opacity: 0,
        color: "#fff",
        backgroundColor: "#000",
        zIndex: 10,

        [theme.responsive.up("md")]: {
            width: "300px",
            visibility: "visible",
            left: 0,
            opacity: 1
        }
    },
    navOpen: {
        left: 0,
        visibility: "visible",
        opacity: 1
    },
    content: {
        paddingTop: "50px",

        [theme.responsive.up("md")]: {
            paddingLeft: "300px"
        }
    }
}));
