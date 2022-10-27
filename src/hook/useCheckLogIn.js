import { useSelector } from 'react-redux';

const useCheckLogIn = () => {
  const { accessToken } = useSelector((state) => ({ ...state.logIn }));
  return !!accessToken;
};

export default useCheckLogIn;
