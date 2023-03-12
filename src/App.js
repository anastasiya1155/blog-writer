import { useMemo, useState } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Route, BrowserRouter as Router, Routes, Outlet } from 'react-router-dom';
import { theme } from './theme';
import Blog from './pages/Blog';
import AuthRoot, { authLoader } from './pages/Auth';
import LoginPage from './pages/Auth/Login';
import RegistrationPage from './pages/Auth/Registration';
import CheckAuth from './pages/Auth/CheckAuth';
import ErrorSnackbar from './components/ErrorSnackbar';
import './App.css';
import ArticlesList from './pages/ArticlesList';
import AuthContext from './context/AuthContext';
import Layout from './components/Layout';

function App() {
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  const authContextValue = useMemo(() => ({ user, setUser }), [user]);

  return (
    <AuthContext.Provider value={authContextValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/auth" loader={authLoader} element={<AuthRoot />}>
              <Route path="login" element={<LoginPage setError={setError} />} />
              <Route path="registration" element={<RegistrationPage setError={setError} />} />
            </Route>
            <Route
              path="/"
              element={
                <Layout>
                  <Outlet />
                </Layout>
              }
            >
              <Route path="/article/:id">
                <Route
                  path="edit"
                  element={
                    <CheckAuth>
                      <Blog isEdit />
                    </CheckAuth>
                  }
                />
                <Route path="" index element={<Blog />} />
              </Route>
              <Route path="/" index element={<ArticlesList />} />
            </Route>
          </Routes>
          <ErrorSnackbar error={error} setError={setError} />
        </Router>
      </ThemeProvider>
    </AuthContext.Provider>
  );
}

export default App;
