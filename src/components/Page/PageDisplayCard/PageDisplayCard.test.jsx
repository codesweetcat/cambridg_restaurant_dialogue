import React from "react";
import ReactDom, { unmountComponentAtNode } from "react-dom";
import { render } from "@testing-library/react";

import PageDisplayCard from "./PageDisplayCard";
import { api } from "../../../utils/testingAPI";
import { act } from "react-dom/test-utils";


const singleItemInArray = [
  {"error":false,"error_display":false,"error_description":null,"input":"Chinese restaurant in the cheap price range",
  "data":{"system_utt":"golden house is a cheap chinese restaurant","utt_number":1,"success":1,"issued_token":null}
  }
]
function sleep(ms){
  return new Promise((resolve)=>setTimeout(resolve,ms))
}
test("display  array as list results", async ()=>{
const { getByTestId, rerender } = render(<PageDisplayCard responseStorage={singleItemInArray} />);
getByTestId("printed-user",{User:"Chinese restaurant in the cheap price range"});
getByTestId("printed-sys",{Sys:"   golden house is a cheap chinese restaurant"});
})