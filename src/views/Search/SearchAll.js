/* eslint-disable */

import React, { useState } from 'react';

import 'assets/scss/search.scss';
import ClubsList from 'components/ClubsList';
import PostsList from 'components/PostsList';

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
