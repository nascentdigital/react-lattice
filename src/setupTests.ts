// imports
// import "jsdom-global/register";
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import "jest-enzyme";


// initialize enzyme with React
configure({adapter: new Adapter()});
