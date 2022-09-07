export const getToken = () => {
  const token = '10f973b74bd0ad70224806415f570155adf1006f';
  const config = {
    headers: { Authorization: `Token ${token}` }
  };
  return config;
};
