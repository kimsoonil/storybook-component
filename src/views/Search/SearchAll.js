/* eslint-disable */

import React, { useState } from 'react';

import 'assets/scss/search.scss';
import ClubsList from 'components/idist/ClubsList';
import PostsList from 'components/idist/PostsList';

function Search() {
  const searchTab = window.location.pathname.split('/');
  return (
    <div>
      <ClubsList limit={12} searchTab={searchTab[2]} search={''} />
      <PostsList />
    </div>
  );
}

export default Search;
