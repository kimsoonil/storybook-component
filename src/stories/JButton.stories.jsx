import React from 'react';

import JButton from 'components/idist/admin/JButton';

export default {
  title: 'Example/JButton',
  component: JButton,
  outline: false
};

const Template = (args) => <JButton {...args} />;

export const contain = Template.bind({});
contain.args = {
  color: 'primary',
  children: <div>button</div>,
  outline: false,
  size: 'm',
  disabled: false
};

export const outline = Template.bind({});
outline.args = {
  color: 'primary',
  children: <div>button</div>,
  outline: true,
  size: 'm',
  disabled: false
};
