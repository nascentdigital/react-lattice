// imports
import React, {Fragment, useState} from "react";
import {createUseStyles} from "react-jss";
import {
    ContentAlignmentValues,
    DirectionValues,
    ItemAlignmentValues,
    JustificationValues
} from "react-lattice";
import {
    Card,
    Grid
} from "./components";


// component
export const ResponsiveLayout = (props) => {

    // render
    const classes = useStyles(props);
    return (
        <Fragment>
            {renderBasic(classes)}
        </Fragment>
    );
};


// helpers
function renderBasic(classes) {
    return (
        <Card>
            <h2>Basic Layout</h2>
            <Grid className={classes.viewer}
                  container
                  alignContent="center"
                  alignItems="stretch">
                <Grid className={classes.block}
                      style={{backgroundColor: "rgb(66, 160, 206)"}}
                      item
                      flex={{xs: 12, sm: 6}}>This is above on mobile, and to the left on larger screens.</Grid>,
                <Grid className={classes.block}
                      style={{backgroundColor: "rgb(241, 202, 87)"}}
                      item
                      flex={{xs: 12, sm: 6}}>This is below on mobile, and to the right on larger screens.</Grid>,
            </Grid>
        </Card>
    );
}


// styles
const useStyles = createUseStyles({
    viewer: {
        minHeight: "300px",
        marginTop: "16px",
        border: "2px solid #b6b6b6"
    },
    block: {
        minWidth: "60px",
        minHeight: "60px",
        padding: "8px",
        color: "#fff",
        textAlign: "center"
    }
});
