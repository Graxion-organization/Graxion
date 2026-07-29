import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminAPI, setToken, removeToken } from '../utils/api';

const AuthContext = createContext(null);

const ADMIN_PATH = import.meta.env.VITE_ADMIN_PATH || 'gx-ctrl-a7f3b2c1';

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [setupRequired, setSetupRequired] = useState(false);
  const navigate = useNavigate();

  // Check auth on mount
  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const token = localStorage.getItem('graxion_admin_token');
      if (!token) {
        // Check if setup is needed
        const setupCheck = await adminAPI.checkSetup();
        setSetupRequired(setupCheck.setupRequired);
        setLoading(false);
        return;
      }

      const response = await adminAPI.getProfile();
      setAdmin(response.data);
    } catch (error) {
      console.error('Auth check failed:', error);
      removeToken();
      // Check setup status
      try {
        const setupCheck = await adminAPI.checkSetup();
        setSetupRequired(setupCheck.setupRequired);
      } catch {
        // Server might be down
      }
    } finally {
      setLoading(false);
    }
  }

  async function login(email, password) {
    const response = await adminAPI.login({ email, password });
    setToken(response.data.token);
    setAdmin(response.data);
    return response;
  }

  async function setup(credentials) {
    const response = await adminAPI.setup(credentials);
    setToken(response.data.token);
    setAdmin(response.data);
    setSetupRequired(false);
    return response;
  }

  function logout() {
    removeToken();
    setAdmin(null);
    navigate(`/${ADMIN_PATH}/login`);
  }

  const value = {
    admin,
    loading,
    setupRequired,
    login,
    setup,
    logout,
    isAuthenticated: !!admin,
    adminPath: ADMIN_PATH,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { ADMIN_PATH };
