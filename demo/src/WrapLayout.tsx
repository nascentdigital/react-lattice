// imports
import {
    ContentAlignment,
    ContentAlignmentValues,
    Direction,
    DirectionValues,
    ItemAlignment,
    ItemAlignmentValues,
    Justification,
    JustificationValues,
    Wrapping,
    WrappingValues
} from "@nascentdigital/react-lattice";
import React, {useState} from "react";
import {createUseStyles} from "react-jss";
import {
    Card,
    Grid
} from "./components";


// component
export const WrapLayout = () => {

    // define state
    const [direction, setDirection] = useState<Direction>("row");
    const [justification, setJustification] = useState<Justification>("spaceEvenly");
    const [alignContent, setAlignContent] = useState<ContentAlignment>("stretch");
    const [alignItems, setAlignItems] = useState<ItemAlignment>("center");
    const [wrap, setWrap] = useState<Wrapping>("wrap");

    // render
    const classes = useStyles();
    return (
        <Card>
            <h2>Wrap Layout</h2>
            <Grid className={classes.viewer}
                  container
                  direction={direction}
                  justify={justification}
                  alignContent={alignContent}
                  alignItems={alignItems}
                  wrap={wrap}>
                {renderPreview(classes, [
                    {
                        label: "A",
                        width: 180,
                        height: 100,
                        color: "rgb(66, 160, 206)"
                    },
                    {
                        label: "B",
                        width: 220,
                        height: 60,
                        color: "rgb(191, 130, 211)"
                    },
                    {
                        label: "C",
                        width: 80,
                        height: 80,
                        color: "rgb(237, 115, 166)"
                    },
                    {
                        label: "D",
                        width: 110,
                        height: 40,
                        color: "rgb(241, 202, 87)"
                    },
                    {
                        label: "E",
                        width: 165,
                        height: 90,
                        color: "rgb(235, 62, 88)"
                    },
                    {
                        label: "F",
                        width: 130,
                        height: 70,
                        color: "rgb(42, 52, 105)"
                    },
                    {
                        label: "G",
                        width: 100,
                        height: 85,
                        color: "rgb(72, 113, 91)"
                    },
                    {
                        label: "H",
                        width: 180,
                        height: 50,
                        color: "rgb(231, 138, 100)"
                    },
                    {
                        label: "I",
                        width: 240,
                        height: 95,
                        color: "rgb(156, 60, 158)"
                    },
                    {
                        label: "J",
                        width: 110,
                        height: 75,
                        color: "rgb(102, 208, 66)"
                    },
                    {
                        label: "K",
                        width: 130,
                        height: 105,
                        color: "rgb(166, 170, 161)"
                    }
                ])}
            </Grid>
            <Grid className={classes.controls}
                  container>
                {renderOptions("Direction", DirectionValues, setDirection, direction)}
                {renderOptions("Justification", JustificationValues, setJustification, justification)}
                {renderOptions("Content Alignment", ContentAlignmentValues, setAlignContent, alignContent)}
                {renderOptions("Item Alignment", ItemAlignmentValues, setAlignItems, alignItems)}
                {renderOptions("Wrap", WrappingValues, setWrap, wrap)}
            </Grid>
        </Card>
    );
};


// helpers
function renderPreview(classes: any, tiles: any) {
    return tiles.map((tile: any) =>
        <Grid key={tile.label}
              className={classes.previewTile}
              style={{minHeight: `${tile.height}px`, minWidth: `${tile.width}px`, backgroundColor: tile.color}}
              item>{tile.label}</Grid>,
    );
}

function renderOptions<T>(title: any, states: any, updateState: any, currentState: any) {
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
        maxHeight: "400px",
        marginTop: "16px",
        border: "2px solid #b6b6b6",
        overflow: "hidden"
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
