import React from 'react';

import { Tags } from 'components/idist/Tags';

export default {
  title: 'Example/Tags',
  component: Tags,
  line: false
};

function Template(args) {
  return <Tags {...args} />;
}

export const contained = Template.bind({});
contained.args = {
  label: 'Tag'
};
