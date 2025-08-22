import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  console.log('useAuth called, context:', context); // Debug log
  
  if (!context) {
    console.error('useAuth must be used within an AuthProvider'); // Debug log
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  console.log('AuthProvider rendered'); // Debug log
  
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const login = async (email, password) => {
    console.log('Login attempt:', { email, password }); // Debug log
    
    // Simulate API call
    if (email === 'demo@trackit.com' && password === 'demo123456') {
      const userData = {
        id: 1,
        name: 'John Doe',
        email: email,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
      };
      console.log('Setting user data:', userData); // Debug log
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userData));
      return { success: true };
    } else {
      console.log('Invalid credentials'); // Debug log
      return { success: false, error: 'Invalid credentials' };
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  const checkAuth = () => {
    console.log('checkAuth called'); // Debug log
    try {
      const savedUser = localStorage.getItem('user');
      console.log('Saved user from localStorage:', savedUser); // Debug log
      
      if (savedUser) {
        const userData = JSON.parse(savedUser);
        console.log('Parsed user data:', userData); // Debug log
        setUser(userData);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
      localStorage.removeItem('user');
    } finally {
      console.log('Setting isLoading to false'); // Debug log
      setIsLoading(false);
    }
  };

  // Check authentication on mount
  useEffect(() => {
    console.log('AuthContext useEffect triggered'); // Debug log
    checkAuth();
  }, []);

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    checkAuth
  };
  
  console.log('AuthContext value:', value); // Debug log

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
