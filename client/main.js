import React from "react";
import { render } from "react-dom";
import { Meteor } from "meteor/meteor";

import App from '../imports/ui/App';

Meteor.startup(() => {
  render(<App>Hello Meteor</App>, document.getElementById("container"));
});
