import React from 'react';

import { TextField } from '../components/TextField';

export default {
  title: 'Example/TextField',
  component: TextField
};

const Template = (args) => <TextField {...args} />;

export const textfield = Template.bind({});
textfield.args = {};
