export const getToken = () => {
  const token = localStorage.getItem('token');
  let config = '';
  if (token !== null) {
    config = {
      headers: { Authorization: `Token ${token}` }
    };
  }

  return config;
};
