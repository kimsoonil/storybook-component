export const getToken = () => {
  const token = 'e5b5e53f379f68f14d5e923c8a6c7858de4d3052';
  const config = {
    headers: { Authorization: `Token ${token}` }
  };
  return config;
};
