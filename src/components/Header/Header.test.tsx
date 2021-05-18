import React from "react";
import ReactDom from "react-dom";
import { render } from "@testing-library/react";

import Header  from "./Header";

test("static Header content", ()=>{
  // const root = document.createElement("div");
  // ReactDom.render(<Header/>, root);

  const { getByText } = render(<Header />);
  getByText("Restaurant information dialogue system")

})