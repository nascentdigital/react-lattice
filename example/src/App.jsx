// imports
import React, {Component} from "react";
import {createUseStyles} from "react-jss";
import {BasicLayout} from "./BasicLayout";


// component
export const App = () => {

    // capture styles
    const classes = useStyles();

    // render
    return (
        <div className={classes.container}>
            <BasicLayout/>
        </div>
    );
}


const useStyles = createUseStyles({
    "@global": {
        "body,h1,h2,h3,h4,h5,p,div,span,button": {
            padding: 0,
            margin: 0,
            fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
            fontWeight: 300,
            fontStyle: "normal",
            fontSmoothing: "antialiased"
        },
        body: {
            margin: "50px",
            backgroundColor: "#eee",
            fontSize: "14px"
        },
        h1: {
            fontSize: "24px",
            fontWeight: 600
        },
        h2: {
            fontSize: "20px",
            fontWeight: 500
        },
        h3: {
            fontSize: "18px",
            fontWeight: 400
        },
        code: {
            fontFamily: "'Roboto Slab', 'Consolas', 'Courier New', monospace"
        },
        button: {
            boxSizing: "border-box",
            minWidth: "64px",
            padding: "4px 8px",
            margin: "8px",
            color: "rgba(0, 0, 0, 0.87)",
            backgroundColor: "transparent",
            fontSize: "14px",
            fontWeight: 500,
            lineHeight: "22px",
            letterSpacing: "0.4px",
            textAlign: "center",
            textDecoration: "none",
            textTransform: "uppercase",
            border: "none",
            borderRadius: "4px",
            appearance: "none",
            userSelect: "none",
            cursor: "pointer",
            transition: "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",

            "&:hover, &:focus": {
                backgroundColor: "rgba(0, 0, 0, 0.08)"
            },

            "&:focus": {
                boxShadow: "0px 0px 5px 1px rgba(0, 0, 0, 0.4)",
                outline: "none"
            },

            "&:active": {
                transform: "scale(0.97)"
            },

            "&.outlined": {
                border: "1px solid rgba(0, 0, 0, 0.23)",
            },

            "&.selected": {
                color: "#1976d2",

                "&:hover, &:focus": {
                    backgroundColor: "rgba(25, 118, 210, 0.08)"
                },

                "&:focus": {
                    boxShadow: "0px 0px 5px 1px rgba(25, 118, 210, 0.4)"
                },

                "&.outlined": {
                    border: "1px solid rgba(25, 118, 210, 0.5)"
                },
            }
        }
    },

    container: {
        minHeight: "100vh",
        color: "#000"
    }
});
