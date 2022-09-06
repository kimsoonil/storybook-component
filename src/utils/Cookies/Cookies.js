export const getToken = () => {
  const token = 'd59b2f154aab1bd43023258deb8f461936f939a8';
  const config = {
    headers: { Authorization: `Token ${token}` }
  };
  return config;
};
