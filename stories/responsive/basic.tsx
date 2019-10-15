// imports
import {storiesOf} from "@storybook/react";
import React from "react";
import {createUseStyles} from "react-jss";
import {createGrid} from "../../src";

// define grid
const Grid = createGrid();


// basics
storiesOf("Grid", module)
    .add("basic", () => {

    const classes = useStyles();
    return (
        <Grid className={classes.viewer}
              container
              alignContent="center"
              alignItems="stretch">
            <Grid className={classes.block}
                  style={{backgroundColor: "rgb( 66, 160, 206)"}}
                  item
                  flex={{xs: 12, md: 6}}>
                This is above on mobile / tablet,<br/>
                and to the left on larger screens.
            </Grid>
            <Grid className={classes.block}
                  style={{backgroundColor: "rgb(102, 205, 170)"}}
                  item
                  flex={{xs: 12, md: 6}}>
                This is below on mobile / tablet,<br/>
                and to the right on larger screens.
            </Grid>
        </Grid>
    );
});


// styles
const useStyles = createUseStyles({
    viewer: {
        minHeight: "300px",
        marginTop: "16px",
        border: "2px solid #b6b6b6"
    },
    block: {
        display: "flex",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "150px",
        padding: "8px",
        color: "#fff"
    }
});
