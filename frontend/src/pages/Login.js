import React, {useState} from 'react';
import { Link } from 'react-router-dom';


const Login = ({ handleLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLoginClick = async () => {
      await handleLogin(username, password);
    };
  
    return (
      <div className='loginPage'>
        <h2>Login</h2>
        <form className='form'>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          <br />
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <br />
          <button type="button" onClick={handleLoginClick}>
            Login
          </button>
          <p>Don't Have an account?</p>
          <Link to="/register">Register</Link>
        </form>
      </div>
    );
  };

  export default Login;