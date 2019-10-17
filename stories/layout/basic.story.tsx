// imports
import {storiesOf} from "@storybook/react";
import {withKnobs, select} from "@storybook/addon-knobs";
import React from "react";
import {createUseStyles} from "react-jss";
import {
    DirectionValues,
    JustificationValues,
    ContentAlignmentValues,
    ItemAlignmentValues
} from "../../src";
import {
    Grid,
    Tile
} from "../components";


// basics
storiesOf("Grid", module)
    .addDecorator(withKnobs)
    .add("Layout: Alignment", () => {

        // generate tiles
        // const classes = useStyles();

        const direction = select("Direction", getSelectOptions(DirectionValues), "row")
        console.log(`direction: ${direction}`);

        // render
        return (
            <Grid container
                  direction={direction}
                  justify={select("Justification", getSelectOptions(JustificationValues), "spaceEvenly")}
                  alignContent={select("Content Alignment", getSelectOptions(ContentAlignmentValues), "stretch")}
                  alignItems={select("Item Alignment", getSelectOptions(ItemAlignmentValues), "stretch")}>
                {
                    Array(5)
                        .fill(0)
                        .map((_value: any, index: number) => (
                            <Grid key={`tile-${index}`} item>
                                <Tile index={index}/>
                            </Grid>
                        ))
                }
            </Grid>
        );
    });


// styles
// const useStyles = createUseStyles({
//     tile: {
//         minWidth: "80px",
//         verticalAlign: "middle"
//     }
// });


// helpers
function getSelectOptions<T>(values: ReadonlyArray<T>) {

    // create options
    const options: any = {};

    // populate options
    for (const value of values) {
        options[value] = value;
    }

    // return options
    return options;
}
