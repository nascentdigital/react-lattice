# react-lattice

> A set of flexible React components that simplify responsive web development.

[![NPM](https://img.shields.io/npm/v/react-lattice.svg)](https://www.npmjs.com/package/react-lattice) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm i -s @nascentdigital/react-lattice
```

## Usage

```tsx
// imports
import * as React from "react";
import {createGrid} from "react-lattice";

// define Grid (can be customized)
const Grid = createGrid();


// component
export const Page = () => {

    // render
    return (
        <Grid container justify="spaceEvenly" alignItems="center">
            <Grid item flex={{xs: 12, md: 6}}>                  
                Left (desktop), Top (mobile + tablet)                
            </Grid>
            <Grid item flex={{xs: 12, md: 6}}>                  
                Right (desktop), Bottom (mobile + tablet)                
            </Grid>
        </Grid>
    );
};
```

## License

MIT © [Nascent Digital](https://github.com/nascentdigital)
