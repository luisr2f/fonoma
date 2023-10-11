import React from "react";

import { render, fireEvent } from "@testing-library/react-native";
import App from "../App";

let component;

describe("<App />", () => {
  beforeEach(() => {
    component = render(<App />);
  });
  it("Render ok", () => {
    expect(component).toBeDefined();
    expect(component.queryAllByText("FormExchange.button"));
  });
});
