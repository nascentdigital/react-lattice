// imports
import classNames from "classnames";
import React, {Fragment, useState} from "react";
import {createUseStyles, useTheme} from "react-jss";
import {appStyles} from "./AppStyles";
import {BasicLayout} from "./BasicLayout";
import {ResponsiveLayout} from "./ResponsiveLayout";
import {WrapLayout} from "./WrapLayout";


// component
export const App = () => {

    // capture styles + state
    const theme = useTheme();
    const classes = useStyles({theme});
    const [navOpen, setNavOpen] = useState(false);

    const toggleNav = () => {
        console.log(`nav ${navOpen ? "closing" : "opening"}`);
        setNavOpen(!navOpen);
    };

    // render
    return (
        <Fragment>
            <div className={classes.container}>
                <header className={classes.header}>
                    <button onClick={toggleNav}>Click Me</button>
                </header>
                <nav className={classNames(classes.nav, {[classes.navOpen]: navOpen})}>
                    <h2>Lattice</h2>
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
        </Fragment>
    );
};


const useStyles = createUseStyles<string>((theme: any) => ({
    ...appStyles,
    container: {
        position: "relative",
        minHeight: "100vh",
        color: "#000"
    },
    header: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "50px",
        color: "#fff",
        backgroundColor: "#000",
        zIndex: 10,

        "& button": {
            color: "#fff"
        }
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
