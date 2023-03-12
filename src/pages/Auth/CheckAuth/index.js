import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getItemFromStorage, TOKEN_KEY } from '../../../utils/storage';
import { getUser } from '../../../api/routes';

const CheckAuth = ({ children }) => {
  const [isOk, setIsOk] = React.useState(true);
  const location = useLocation();

  React.useEffect(() => {
    const token = getItemFromStorage(TOKEN_KEY);
    setIsOk(!!token);
    getUser();
  }, [location]);

  return isOk ? <>{children}</> : <Navigate to="/auth/login" />;
};

export default CheckAuth;
