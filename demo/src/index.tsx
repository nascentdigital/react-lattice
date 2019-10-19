// imports
import React from "react";
import ReactDOM from "react-dom";
import {ThemeProvider} from "react-jss";
import {App} from "./App";
import {theme} from "./AppTheme";


// render app
ReactDOM.render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>,
    document.getElementById("root"));
