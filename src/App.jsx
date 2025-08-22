import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturesCarousel from './components/FeaturesCarousel';
import Footer from './components/Footer';
import Login from './pages/Auth/Login/Login';
import Signup from './pages/Auth/Signup/Signup';
import Dashboard from './pages/Dashboard/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function AppContent() {
  const { isLoading } = useAuth();
  
  console.log('AppContent isLoading:', isLoading); // Debug log

  if (isLoading) {
    console.log('AppContent: Showing loading screen'); // Debug log
    return (
      <div className="app">
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          fontSize: '1.2rem',
          color: '#666'
        }}>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={
          <>
            <Navbar />
            <Hero />
            <FeaturesCarousel />
            <Footer />
          </>
        } />
        <Route path="/login" element={
          <div>
            <h1>Login Route Test</h1>
            <Login />
          </div>
        } />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}

function App() {
  console.log('App component rendered'); // Debug log
  
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
