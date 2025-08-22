import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import './LoginForm.css';

const LoginForm = () => {
  console.log('LoginForm component rendered'); // Debug log
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted'); // Debug log
    
    setIsLoading(true);
    
    try {
      const result = await login(formData.email, formData.password);
      console.log('Login result:', result); // Debug log
      
      if (result.success) {
        setTimeout(() => {
          navigate('/dashboard');
        }, 100);
      } else {
        setErrors({ general: result.error });
      }
    } catch (error) {
      console.error('Login error:', error); // Debug log
      setErrors({ general: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setFormData({
      email: 'demo@trackit.com',
      password: 'demo123456',
      rememberMe: true
    });
    setErrors({});
  };

  // Keyboard shortcut for back navigation
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Escape') {
        window.history.back();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div className="login-form-container">
      <div className="back-button-container">
        <button 
          onClick={() => window.history.back()} 
          className="back-button"
          title="Go back (ESC key)"
        >
          ← Go Back
        </button>
        <Link to="/" className="back-button home-button" title="Go to Home">
          🏠 Home
        </Link>
      </div>
      
      <div className="login-form-header">
        <h1>Welcome Back</h1>
        <div className="trackit-logo">
          <h2>TrackIt</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="login-form">
        {errors.general && (
          <div className="error-message general">
            {errors.general}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            className={errors.email ? 'error' : ''}
            disabled={isLoading}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="password-input-container">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              className={errors.password ? 'error' : ''}
              disabled={isLoading}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading}
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>
          {errors.password && <span className="error-text">{errors.password}</span>}
        </div>

        <div className="form-group checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleInputChange}
              disabled={isLoading}
            />
            <span className="checkmark"></span>
            Remember me
          </label>
        </div>

        <button
          type="submit"
          className="submit-button"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              Signing In...
            </div>
          ) : (
            'Sign In'
          )}
        </button>

        <button
          type="button"
          className="demo-button"
          onClick={handleDemoLogin}
          disabled={isLoading}
        >
          Demo Login
        </button>

        <div className="form-footer">
          <Link to="/forgot-password" className="forgot-password">
            Forgot Password?
          </Link>
          <div className="signup-link">
            Don't have an account?{' '}
            <Link to="/signup">Sign up</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
