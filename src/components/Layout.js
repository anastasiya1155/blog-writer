import { Container, Fab, Paper } from '@mui/material';
import { useContext, useEffect } from 'react';
import { getUser } from '../api/routes';
import { useNavigate } from 'react-router';
import { Login, Logout } from '@mui/icons-material';
import { clearStorage, getItemFromStorage, TOKEN_KEY } from '../utils/storage';
import AuthContext from '../context/AuthContext';

const Layout = ({ children }) => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getItemFromStorage(TOKEN_KEY);
    if (token) {
      getUser().then((resp) => {
        setUser(resp);
      });
    }
  }, []);

  const handleLogout = () => {
    clearStorage();
    setUser(null);
  };

  return (
    <div className="relative">
      <Fab
        sx={{ position: 'fixed', bottom: 20, left: 20 }}
        color="secondary"
        onClick={() => (user?.id ? handleLogout() : navigate('/auth/login'))}
        title={user?.id ? 'Logout' : 'Login'}
      >
        {user?.id ? <Logout /> : <Login />}
      </Fab>
      <Container
        component={Paper}
        elevation={4}
        sx={{
          paddingTop: 3,
          paddingBottom: 3,
          minHeight: '100vh',
        }}
      >
        {children}
      </Container>
    </div>
  );
};

export default Layout;
