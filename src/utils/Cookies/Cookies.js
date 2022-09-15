export const getToken = () => {
  const token = localStorage.getItem('token');
  const config = {
    headers: { Authorization: `Token ${token}` }
  };
  return config;
};
