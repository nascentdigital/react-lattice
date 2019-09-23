// imports
import React from "react";
import {createUseStyles} from "react-jss";


// components
export const Card = (props) => {
    const classes = useStyles(props);
    return (
        <div className={classes.container}>{props.children}</div>
    );
};

// styles
const useStyles = createUseStyles({
    container: {
        padding: "16px",
        marginTop: "30px",
        backgroundColor: "#ffffff",
        borderRadius: "5px",
        boxShadow: "2px 2px 3px 0px rgba(0,0,0,0.20)"
    }
});
