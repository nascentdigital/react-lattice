// imports
import {storiesOf} from "@storybook/react";
import React from "react";
import {createUseStyles} from "react-jss";
import {Grid} from "../components";


// basics
storiesOf("Grid", module)
    .add("Responsive: Basic Flex", () => {

    const classes = useStyles();
    return (
        <Grid container
              alignContent={{xs: "stretch", md: "center"}}
              alignItems="stretch">
            <Grid className={classes.block}
                  style={{backgroundColor: "rgb( 66, 160, 206)"}}
                  item
                  offset={{xs: 8, sm: 0}}
                  order={{sm: "last"}}
                  flex={4}>
                This is above on mobile / tablet,<br/>
                and to the left on larger screens.
            </Grid>
            <Grid className={classes.block}
                  style={{backgroundColor: "rgb(102, 205, 170)"}}
                  item
                  flex={{xs: 12, sm: 8}}>
                This is below on mobile / tablet,<br/>
                and to the right on larger screens.
            </Grid>
        </Grid>
    );
});


// styles
const useStyles = createUseStyles({
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
