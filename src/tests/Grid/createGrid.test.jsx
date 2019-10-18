// imports
import React from "react";
import {createGrid} from "../../";
import {mount} from "enzyme";


// tests
describe("createGrid", () => {

    it("method exists", () => {
        expect(createGrid).toBeDefined();
    });

    it("creates a Grid with no options", () => {

        // create grid
        const Grid = createGrid();

        // check assertions
        expect(Grid).toBeDefined();
        expect(Grid).toBeInstanceOf(Function);
    });

    it("creates a Grid that renders", () => {

        // create/render grid
        const Grid = createGrid();
        const wrapper = mount(<Grid container />);

        // check assertions
        expect(wrapper).toContainExactlyOneMatchingElement("div.nd_grid");
    });
});
