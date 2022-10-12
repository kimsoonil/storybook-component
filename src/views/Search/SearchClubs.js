/* eslint-disable */

import React, { useState, useEffect } from 'react';
import ClubsList from 'components/idist/ClubsList';

function SearchClub(props) {
  const searchTab = window.location.pathname.split('/');
  return <ClubsList limit={20} searchTab={searchTab[3]} />;
}

export default SearchClub;
