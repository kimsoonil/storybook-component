import React from 'react';

import { Loader } from '../components/Loader';

export default {
  title: 'Example/Loader',
  component: Loader,
  line: false
};

function Template(args) {
  return <Loader {...args} />;
}

export const contained = Template.bind({});
contained.args = {};
