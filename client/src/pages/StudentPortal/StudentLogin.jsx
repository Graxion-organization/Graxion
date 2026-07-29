import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { studentAPI } from '../../utils/api';
import { Mail, KeyRound, Loader, ArrowRight, ShieldCheck } from 'lucide-react';
import './StudentLogin.css';

export default function StudentLogin() {
  const navigate = useNavigate();
  const [step, setStep] = useState('email'); // 'email' or 'otp'
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const res = await studentAPI.sendOtp(email);
      setMessage(res.message || 'OTP sent successfully!');
      setStep('otp');
    } catch (err) {
      setError(err.message || 'Error sending OTP. Ensure this email is registered.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) return;

    setLoading(true);
    setError('');

    try {
      const res = await studentAPI.verifyOtp(email, otp);
      // Save token to localStorage
      localStorage.setItem('studentToken', res.token);
      localStorage.setItem('studentEmail', email);
      navigate('/student/dashboard');
    } catch (err) {
      setError(err.message || 'Invalid or expired OTP.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Student Portal Login — Graxion</title>
      </Helmet>

      <div className="student-login-page">
        <div className="student-login-bg">
          <div className="student-login-orb" />
          <div className="student-login-grid" />
        </div>

        <div className="student-login-card">
          <div className="student-login-header">
            <ShieldCheck size={48} className="student-login-icon" />
            <h1>Student Portal</h1>
            <p>Access your certificates and report cards</p>
          </div>

          {error && <div className="student-login-alert error">{error}</div>}
          {message && <div className="student-login-alert success">{message}</div>}

          {step === 'email' ? (
            <form onSubmit={handleSendOtp} className="student-login-form">
              <div className="student-input-group">
                <Mail size={18} />
                <input
                  type="email"
                  placeholder="Enter your registered Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="student-login-btn" disabled={loading}>
                {loading ? <Loader className="spin" size={18} /> : 'Send OTP'}
                {!loading && <ArrowRight size={18} />}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="student-login-form">
              <p className="student-otp-text">
                Enter the 6-digit code sent to <strong>{email}</strong>
              </p>
              <div className="student-input-group">
                <KeyRound size={18} />
                <input
                  type="text"
                  placeholder="6-Digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  required
                />
              </div>
              <button type="submit" className="student-login-btn" disabled={loading}>
                {loading ? <Loader className="spin" size={18} /> : 'Verify & Login'}
                {!loading && <ArrowRight size={18} />}
              </button>
              
              <button
                type="button"
                className="student-login-back"
                onClick={() => {
                  setStep('email');
                  setOtp('');
                  setError('');
                  setMessage('');
                }}
              >
                Change Email Address
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
