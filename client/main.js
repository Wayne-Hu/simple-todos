import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Meteor } from "meteor/meteor";

import App from "../imports/ui/App";

Meteor.startup(() => {
  render(
    <BrowserRouter>
      <App>Hello Meteor</App>
    </BrowserRouter>,
    document.getElementById("container")
  );
});
