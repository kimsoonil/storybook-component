/* eslint-disable */

import React, { useState, useEffect } from 'react';
import ClubsList from 'components/ClubsList';

function SearchClub(props) {
  const searchTab = window.location.pathname.split('/');
  console.log(searchTab);
  return <ClubsList limit={16} searchTab={searchTab[2]} search={''} />;
}

export default SearchClub;
