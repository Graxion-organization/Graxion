import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AdminAuthContext';
import { Eye, EyeOff, Lock, Mail, Shield, User, KeyRound } from 'lucide-react';
import './AdminLogin.css';

export default function AdminLogin() {
  const { login, setup, isAuthenticated, setupRequired, loading, adminPath } = useAuth();
  const navigate = useNavigate();

  const [isSetup, setIsSetup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    setupKey: '',
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate(`/${adminPath}/students/dashboard`);
    }
  }, [isAuthenticated, navigate, adminPath]);

  useEffect(() => {
    if (setupRequired) {
      setIsSetup(true);
    }
  }, [setupRequired]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormLoading(true);
    setError('');

    try {
      if (isSetup) {
        await setup({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          setupKey: formData.setupKey,
        });
      } else {
        await login(formData.email, formData.password);
      }
      navigate(`/${adminPath}/students/dashboard`);
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setFormLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="admin-login-page">
        <div className="admin-login-loading">
          <div className="admin-loading-spinner" />
        </div>
      </div>
    );
  }

  return (
    <div className="admin-login-page">
      {/* Animated background */}
      <div className="admin-login-bg">
        <div className="admin-login-orb admin-login-orb-1" />
        <div className="admin-login-orb admin-login-orb-2" />
        <div className="admin-login-orb admin-login-orb-3" />
        <div className="admin-login-grid" />
      </div>

      <div className="admin-login-container">
        {/* Logo */}
        {/* Logo */}
        <div className="admin-login-logo">
          <img src="/logo.png" alt="Graxion" style={{ height: '48px', marginBottom: '15px' }} />
          <span className="admin-login-logo-sub">Control Panel</span>
        </div>

        {/* Form Card */}
        <div className="admin-login-card">
          <div className="admin-login-card-header">
            <h2>{isSetup ? 'Initial Setup' : 'Admin Login'}</h2>
            <p>
              {isSetup
                ? 'Create your superadmin account'
                : 'Enter your credentials to access the admin panel'}
            </p>
          </div>

          {error && (
            <div className="admin-login-error">
              <span>⚠</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="admin-login-form">
            {isSetup && (
              <>
                <div className="admin-login-field">
                  <label htmlFor="username">
                    <User size={16} />
                    Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Enter username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    minLength={3}
                  />
                </div>

                <div className="admin-login-field">
                  <label htmlFor="setupKey">
                    <KeyRound size={16} />
                    Setup Key
                  </label>
                  <input
                    id="setupKey"
                    name="setupKey"
                    type="password"
                    placeholder="Enter setup key"
                    value={formData.setupKey}
                    onChange={handleChange}
                    required
                  />
                </div>
              </>
            )}

            <div className="admin-login-field">
              <label htmlFor="email">
                <Mail size={16} />
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="admin@graxion.in"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="admin-login-field">
              <label htmlFor="password">
                <Lock size={16} />
                Password
              </label>
              <div className="admin-login-password-wrap">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  className="admin-login-eye"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="admin-login-btn"
              disabled={formLoading}
            >
              {formLoading ? (
                <span className="admin-login-btn-loading">
                  <span className="admin-loading-spinner small" />
                  {isSetup ? 'Creating Account...' : 'Signing In...'}
                </span>
              ) : (
                <>
                  <Shield size={18} />
                  {isSetup ? 'Create Admin Account' : 'Sign In'}
                </>
              )}
            </button>
          </form>

          {!setupRequired && (
            <div className="admin-login-footer">
              <button
                type="button"
                className="admin-login-toggle"
                onClick={() => setIsSetup(!isSetup)}
              >
                {isSetup ? '← Back to Login' : 'First time? Setup Admin →'}
              </button>
            </div>
          )}
        </div>

        <p className="admin-login-copyright">
          © {new Date().getFullYear()} Graxion. All rights reserved.
        </p>
      </div>
    </div>
  );
}
