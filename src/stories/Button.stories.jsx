import React from 'react';

import { Button } from 'components/idist/Button';

export default {
  title: 'Example/Button',
  component: Button,
  line: false
};

const Template = (args) => <Button {...args} />;

export const contained = Template.bind({});
contained.args = {
  primary: 'primary',
  label: 'Button',
  size: 'm',
  disabled: false,
  line: false,
  width: 140
};

export const outlined = Template.bind({});
outlined.args = {
  primary: 'primary',
  label: 'Button',
  size: 'm',
  disabled: false,
  line: true,
  width: 140
};
