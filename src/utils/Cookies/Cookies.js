export const getToken = () => {
  const token = '3806fb390ec81cec361ff8efda9d21a7a793965f';
  const config = {
    headers: { Authorization: `Token ${token}` }
  };
  return config;
};
