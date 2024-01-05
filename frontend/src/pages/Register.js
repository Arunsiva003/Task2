import React, {useState} from 'react';
import { Link } from 'react-router-dom';


const Register = ({ handleRegister }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleRegisterClick = async () => {
      await handleRegister(username, password);
    };
  
    return (
      <div className='loginPage'>
        <h2>Register</h2>
        <form className='form'>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          <br />
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <br />
          <button type="button" onClick={handleRegisterClick}>
            Register
          </button>
        </form>
        <p>Already have an account?</p>
        <Link to="/login">Login</Link>
      </div>
    );
  };

  export default Register;