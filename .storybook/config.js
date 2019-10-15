// imports
import {
    addDecorator,
    configure
} from "@storybook/react";
import {withKnobs} from "@storybook/addon-knobs";


// define loader
function loadStories() {

    // bind decorators
    addDecorator(withKnobs);

    // load stories
    const target = require.context("../stories", true, /.tsx$/);
    target.keys().forEach(target);
}

// configure storybook
configure(loadStories, module);
