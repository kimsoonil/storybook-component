export const getToken = () => {
  const token = localStorage.getItem('token');
  const accessToken = localStorage.getItem('accessToken');

  let config = '';
  if (accessToken !== null) {
    config = {
      headers: { Authorization: `Bearer ${accessToken}` }
    };
  } else if (token !== null) {
    config = {
      headers: { Authorization: `Token ${token}` }
    };
  }

  return config;
};
