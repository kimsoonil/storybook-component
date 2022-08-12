import React from "react";

import { TextField } from "./TextField";

export default {
  title: "Example/TextField",
  component: TextField,
};

const Template = (args) => <TextField {...args} />;

export const page = Template.bind({});
page.args = {};
