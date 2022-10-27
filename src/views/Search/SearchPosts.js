/* eslint-disable */

import React, { useEffect } from 'react';

import 'assets/scss/search.scss';
import PostsList from 'components/idist/PostsList';

function SearchPosts() {
  const searchTab = window.location.pathname.split('/');

  return <PostsList limit={14} searchTab={searchTab[3]} />;
}

export default SearchPosts;
