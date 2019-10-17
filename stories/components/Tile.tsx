// imports
import React, {HTMLAttributes} from "react";
import Color from "color";
import {createUseStyles} from "react-jss";


// constants
const TileSpecs: ReadonlyArray<TileSpec> = [
    {color: Color("rgb( 66, 160, 206)"), size: {width: 200, height: 120}},
    {color: Color("rgb(191, 130, 211)"), size: {width: 220, height: 80}},
    {color: Color("rgb(237, 115, 166)"), size: {width: 80, height: 100}},
    {color: Color("rgb(241, 202,  87)"), size: {width: 110, height: 60}},
    {color: Color("rgb(235,  62,  88)"), size: {width: 185, height: 100}},
    {color: Color("rgb( 42,  52, 105)"), size: {width: 150, height: 90}},
    {color: Color("rgb( 72, 113,  91)"), size: {width: 120, height: 105}},
    {color: Color("rgb(231, 138, 100)"), size: {width: 200, height: 70}},
    {color: Color("rgb(156,  60, 158)"), size: {width: 260, height: 115}},
    {color: Color("rgb(102, 208,  66)"), size: {width: 120, height: 95}},
    {color: Color("rgb(166, 170, 161)"), size: {width: 140, height: 125}}
];
export const MaxTiles = TileSpecs.length;

// types
type TileSpec = {
    color: Color
    size: Size
}
type Size = {
    width: number
    height: number
}

interface Props extends HTMLAttributes<HTMLDivElement> {
    index: number
}


// component
export const Tile: React.FC<Props> = (props) => {

    // resolve props + classes
    const {className, index = 0} = props;
    const classes = useStyles(TileSpecs[index % MaxTiles]);

    // render
    return (
        <div className={[classes.container, className].join(" ")}>
            {String.fromCharCode("A".charCodeAt(0) + index)}
        </div>
    );
};


// styles
const useStyles = createUseStyles({
    container: (props: TileSpec) => ({
        boxSizing: "border-box",
        minWidth: `${props.size.width}px`,
        minHeight: `${props.size.height}px`,
        paddingTop: "18px",
        color: props.color.isDark() ? "#FFF" : "#000",
        backgroundColor: props.color.toString(),
        textAlign: "center"
    })
});
