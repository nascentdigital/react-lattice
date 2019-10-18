// imports
import React, {useState} from "react";
import {createUseStyles} from "react-jss";
import {
    ContentAlignment,
    ContentAlignmentValues,
    Direction,
    DirectionValues,
    ItemAlignment,
    ItemAlignmentValues,
    Justification,
    JustificationValues
} from "react-lattice";
import {
    Card,
    Grid
} from "./components";


// component
export const BasicLayout = () => {

    // define state
    const [direction, setDirection] = useState<Direction>("row");
    const [justification, setJustification] = useState<Justification>("spaceEvenly");
    const [alignContent, setAlignContent] = useState<ContentAlignment>("stretch");
    const [alignItems, setAlignItems] = useState<ItemAlignment>("center");

    // render
    const classes = useStyles();
    return (
        <Card>
            <h2>Basic Layout</h2>
            <Grid className={classes.viewer}
                  container
                  direction={direction}
                  justify={justification}
                  alignContent={alignContent}
                  alignItems={alignItems}>
                {renderPreview(classes, [
                    {
                        label: "A",
                        height: 100,
                        color: "rgb(66, 160, 206)"
                    },
                    {
                        label: "B",
                        height: 60,
                        color: "rgb(191, 130, 211)"
                    },
                    {
                        label: "C",
                        height: 80,
                        color: "rgb(237, 115, 166)"
                    },
                    {
                        label: "D",
                        height: 40,
                        color: "rgb(241, 202, 87)"
                    },
                    {
                        label: "E",
                        height: 90,
                        color: "rgb(235, 62, 88)"
                    },
                ])}
            </Grid>
            <Grid className={classes.controls}
                  container>
                {renderOptions("Direction", DirectionValues, setDirection, direction)}
                {renderOptions("Justification", JustificationValues, setJustification, justification)}
                {renderOptions("Content Alignment", ContentAlignmentValues, setAlignContent, alignContent)}
                {renderOptions("Item Alignment", ItemAlignmentValues, setAlignItems, alignItems)}
            </Grid>
        </Card>
    );
};


// helpers
function renderPreview(classes: any, tiles: any) {
    return tiles.map((tile: any) =>
        <Grid key={tile.label}
              className={classes.previewTile}
              style={{minHeight: `${tile.height}px`, backgroundColor: tile.color}}
              item>{tile.label}</Grid>,
    );
}

function renderOptions(title: any, states: any, updateState: any, currentState: any) {
    return (
        <Grid item flex>
            <h3>{title}</h3>
            {
                states.map((state: any) => {

                    // prepare values
                    const classes = state === currentState
                        ? "outlined selected"
                        : "outlined";

                    // render option
                    return <button key={state}
                                   className={classes}
                                   onClick={() => updateState(state)}>{state}</button>;
                })
            }
        </Grid>
    );
}


// styles
const useStyles = createUseStyles({
    viewer: {
        minHeight: "300px",
        marginTop: "16px",
        border: "2px solid #b6b6b6"
    },
    controls: {
        marginTop: "20px",

        "@global button": {
            display: "block"
        }
    },
    previewTile: {
        minWidth: "60px",
        minHeight: "60px",
        padding: "8px",
        color: "#fff",
        textAlign: "center"
    }
});
