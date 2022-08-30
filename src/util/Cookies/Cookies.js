export const getToken = () => {
  const token = 'f7f4c7686084ed7d972821321016618f51361d01';
  const config = {
    headers: { Authorization: `Token ${token}` }
  };
  return config;
};
