import React, {useState} from "react";
import {useHistory, Link} from 'react-router-dom';
import axios from 'axios';

const initialFormValues = {
  username: '',
  password: ''
}
const Login = () => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [loginError, setLoginError] = useState('');
  const history = useHistory();

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    })
  }
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const loginUser = (e) => {
    e.preventDefault();
    console.log(formValues);
    // const testValues = {
    //   username: 'Lambda School',
    //   password: 'i<3Lambd4'
    // }
    axios.post('http://localhost:5000/api/login', formValues)
      .then(res => {
        setLoginError('');
        const token = res.data.payload;
        console.log(token);
        localStorage.setItem('token', token);
        history.push('/bubblepage');
      })
      .catch(err => {
        console.log(err);
        setLoginError('Login request failed, username and/or password are not valid');
      })
    setFormValues(initialFormValues); 
  }
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <Link to='/'>Home</Link>
      <Link to='/bubblepage'>Bubbles</Link>

      <div className='login-wrapper'>
               <form className='form' onSubmit={loginUser}>
                   <h3>Login to Your Account</h3>
                   <div className='FormGroup'>
                   <label htmlFor='username'>Username: </label>
                   <input type='text'
                   id='username'
                   name='username'
                   value= {formValues.username}
                   onChange={handleChange}
                   />
                   </div>
                   <div className='FormGroup'>
                   <label htmlFor='password'>Password: </label>
                   <input type='password'
                   id='password'
                   name='password'
                   value= {formValues.password}
                   onChange={handleChange}
                   />
                   </div>
                   <button type='submit'>Login</button>
                   {loginError && <p style={{color: 'crimson'}}>{loginError}</p>}
               </form>
        </div>
    </>
  );
};

export default Login;
