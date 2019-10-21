// imports
import classNames from "classnames";
import "hamburgers/dist/hamburgers.min.css";
import React, {HTMLAttributes} from "react";
import {createUseStyles} from "react-jss";


// types
interface IProps extends HTMLAttributes<HTMLButtonElement> {
    active?: boolean;
}


// component
export const MenuIcon: React.FC<IProps> = (props) => {

    // resolve state + classes
    const {active = false} = props;
    const classes = useStyles({active});

    // render
    return (
        <button className={classNames("hamburger", "hamburger--spin", {"is-active": props.active}, classes.container)}
                type="button"
                onClick={props.onClick}>
            <span className={classNames("hamburger-box")}>
                <span className={classNames("hamburger-inner")} />
            </span>
        </button>
    );
};


// styles
const useStyles = createUseStyles({
    container: {
        color: "#fff",
        height: "50px",

        "& .hamburger-box": {
            width: "20px",
            height: "12px",

            "& .hamburger-inner": {
                extend: "hamburgerLine",

                "&::before": {
                    top: (data: any) => data.active ? 0 : "-6px",
                    extend: "hamburgerLine"
                },

                "&::after": {
                    bottom: (data: any) => data.active ? 0 : "-6px",
                    extend: "hamburgerLine"
                }
            }
        },

        "&:focus": {
            backgroundColor: "#444",
            outline: 0
        }
    },
    hamburgerLine: {
        width: "20px",
        height: "2px",
        backgroundColor: "#fff"
    }
});
