import React from "react";

import { Pageination } from "../components/Pageination";

export default {
  title: "Example/Pageination",
  component: Pageination,
};

const Template = (args) => <Pageination {...args} />;

export const page = Template.bind({});
page.args = { numPages: 5 };
