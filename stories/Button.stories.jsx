import React from 'react';

import { Button } from './Button';

export default {
  title: 'Example/Button',
  component: Button
};

const Template = (args) => <Button {...args} />;

export const contained = Template.bind({});
contained.args = {
  primary: 'Primary',
  line: 'false',
  label: 'Button',
  size: 'M',
  disabled: false
};

export const outlined = Template.bind({});
outlined.args = {
  primary: 'Primary',
  line: 'true',
  label: 'Button',
  size: 'M',
  disabled: false
};
