import React from "react";

import { Button } from "./Button";

export default {
  title: "Example/Button",
  component: Button,
  line: false,
};

const Template = (args) => <Button {...args} />;

export const contained = Template.bind({});
contained.args = {
  primary: "Primary",
  label: "Button",
  size: "M",
  disabled: false,
  line: false,
  width: 140,
};

export const outlined = Template.bind({});
outlined.args = {
  primary: "Primary",
  label: "Button",
  size: "M",
  disabled: false,
  line: true,
  width: 140,
};
