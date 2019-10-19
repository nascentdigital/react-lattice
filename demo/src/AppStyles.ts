// exports
export const appStyles: any = {
    "@global": {
        "body,h1,h2,h3,h4,h5,p,div,span,button": {
            padding: 0,
            margin: 0,
            fontFamily: "'Raleway', sans-serif",
            fontWeight: 300,
            fontStyle: "normal",
            fontSmoothing: "antialiased"
        },
        body: {
            backgroundColor: "#eee",
            fontSize: "14px"
        },
        "h1,h2,h3,h4,h5": {
            fontFamily: "'Lato', sans-serif",
            fontWeight: 400
        },
        h1: {
            fontSize: "28px"
        },
        h2: {
            fontSize: "24px"
        },
        h3: {
            fontSize: "18px"
        },
        h4: {
            fontSize: "14px"
        },
        h5: {
            fontSize: "12px"
        },
        code: {
            fontFamily: "'Source Code Pro', monospace",
            fontSize: "14px",
            fontWeight: 300
        },


        button: {
            boxSizing: "border-box",
            minWidth: "64px",
            padding: "4px 8px",
            margin: "8px",
            color: "rgba(0, 0, 0, 0.87)",
            backgroundColor: "transparent",
            fontSize: "14px",
            fontWeight: 500,
            lineHeight: "22px",
            letterSpacing: "0.4px",
            textAlign: "center",
            textDecoration: "none",
            textTransform: "uppercase",
            border: "none",
            borderRadius: "4px",
            appearance: "none",
            userSelect: "none",
            cursor: "pointer",
            transition: "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",

            "&:hover, &:focus": {
                backgroundColor: "rgba(0, 0, 0, 0.08)"
            },

            "&:focus": {
                boxShadow: "0px 0px 5px 1px rgba(0, 0, 0, 0.4)",
                outline: "none"
            },

            "&:active": {
                transform: "scale(0.97)"
            },

            "&.outlined": {
                border: "1px solid rgba(0, 0, 0, 0.23)",
            },

            "&.selected": {
                color: "#1976d2",

                "&:hover, &:focus": {
                    backgroundColor: "rgba(25, 118, 210, 0.08)"
                },

                "&:focus": {
                    boxShadow: "0px 0px 5px 1px rgba(25, 118, 210, 0.4)"
                },

                "&.outlined": {
                    border: "1px solid rgba(25, 118, 210, 0.5)"
                },
            }
        }
    }
};
