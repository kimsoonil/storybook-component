export const getToken = () => {
  const token = '4c1a5a82b8d23fb507acb577fd7d2ce8dee924e5';
  const config = {
    headers: { Authorization: `Token ${token}` }
  };
  return config;
};
