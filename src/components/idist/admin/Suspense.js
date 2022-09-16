import React from 'react';
import { Loader } from 'components/idist/Loader';

const Suspense = ({ state, children }) => {
  console.log(
    'render suspence render suspence render suspence render suspence render suspence render suspence render suspence render suspence render suspence render suspence render suspence render suspence render suspence render suspence render suspence render suspence render suspence render suspence render suspence render suspence render suspence render suspence render suspence render suspence '
  );
  console.log(state);
  console.log(state);
  console.log(state);
  console.log(state);
  console.log(state);
  if (state) {
    return (
      <div className="root-center">
        <Loader />
      </div>
    );
  }
  return <>{children}</>;
};

export default Suspense;
