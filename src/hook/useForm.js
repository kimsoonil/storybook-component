import React, { useState } from 'react';

const useForm = () => {
  const [state, useState] = useState({});

  const register = ({ name, validationFunction, when }) => {};

  return { register };
};

useForm({ name });
