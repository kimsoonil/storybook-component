import React from 'react';
import { Loader } from 'components/idist/Loader';

const Suspense = ({ isLoading, children, fallback }) => {
  if (isLoading) {
    if (fallback) {
      return fallback;
    }
    return null;
  }
  return children;
};

export default Suspense;
