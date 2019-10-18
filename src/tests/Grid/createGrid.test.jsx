// imports
import {createGrid} from "../../";


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
});
