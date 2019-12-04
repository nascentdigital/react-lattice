// imports
import React, {Fragment} from "react";
import {createUseStyles} from "react-jss";
import {
    Card,
    Grid
} from "./components";


// component
export const ResponsiveLayout = () => {

    // render
    const classes = useStyles();
    return (
        <Fragment>
            {renderBasic(classes)}
            {responsiveDisplayDirection(classes)}
            {renderResponsiveColumn(classes)}
        </Fragment>
    );
};


// helpers
function renderBasic(classes: any) {
    return (
        <Card>
            <h2>Basic Responsive Layout</h2>
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
        </Card>
    );
}

function responsiveDisplayDirection(classes: any) {
    return (
        <Card>
            <h2>Changing display direction</h2>
            <Grid className={classes.viewer}
                  container
                  direction={{xs: "column", sm: "row", md: "columnReverse", lg: "rowReverse"}}
                  alignContent="stretch"
                  alignItems="stretch">
                <Grid className={classes.block}
                      style={{backgroundColor: "rgb( 66, 160, 206)"}}
                      item
                      flex={{xs: 12, sm: 4, md: 12, lg: 4}}>
                    This is above on xs,<br/>
                    This is left on sm,<br/>
                    This is bottom on md,<br/>
                    This is right on lg.
                </Grid>
                <Grid className={classes.block}
                      style={{backgroundColor: "rgb( 22, 80, 103)"}}
                      item
                      flex={{xs: 12, sm: 4, md: 12, lg: 4}}>
                    This is always in the middle.
                </Grid>
                <Grid className={classes.block}
                      style={{backgroundColor: "rgb( 166, 60, 26)"}}
                      item
                      flex={{xs: 12, sm: 4, md: 12, lg: 4}}>
                    This is bottom on xs,<br/>
                    This is right on sm,<br/>
                    This is above on md,<br/>
                    This is left on lg.
                </Grid>
            </Grid>
        </Card>
    );
}

function renderResponsiveColumn(classes: any) {
    return (
        <Card>
            <h2>Responsive Columns</h2>
            <Grid className={classes.viewer}
                  container
                  alignContent="stretch"
                  alignItems="stretch">
                <Grid container alignContent="stretch" alignItems="stretch" direction={{xs: "column", sm: "row"}}
                      item flex={6}>
                    <Grid className={classes.block}
                          style={{backgroundColor: "rgb( 66, 160, 206)"}}
                          item
                          flex={{xs: 6, md: 6}}>
                        This is above on mobile / tablet,<br/>
                        and to the left on larger screens.
                    </Grid>
                    <Grid className={classes.block}
                          style={{backgroundColor: "rgb(102, 205, 170)"}}
                          item
                          flex={{xs: 6, md: 6}}>
                        This is below on mobile / tablet,<br/>
                        and to the right on larger screens.
                    </Grid>
                </Grid>
                <Grid container item flex={6}>
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
        display: "flex",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "150px",
        padding: "8px",
        color: "#fff"
    }
});
