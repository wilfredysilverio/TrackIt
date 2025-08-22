import LoginForm from '../../../components/Forms/LoginForm/LoginForm';
import './Login.css';

const Login = () => {
  console.log('Login component rendered'); // Debug log
  
  return (
    <div className="login-page">
      <div className="login-page-container">
        <h1>Login Page Test</h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
