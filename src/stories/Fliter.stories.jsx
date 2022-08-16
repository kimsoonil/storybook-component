import React from "react";

import { Fliter } from "./Fliter";

export default {
  title: "Example/Fliter",
  component: Fliter,
};

const Template = (args) => <Fliter {...args} />;

export const page = Template.bind({});
page.args = {};
