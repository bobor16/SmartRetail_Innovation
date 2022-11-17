import React from 'react';
import './Login.css';
import { FaUserAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <>
      <div class='wrapper fadeInDown'>
        <div id='formContent'>
          <div class='fadeIn first'>
            <h3 class='pt-3 pb-3'>Sign in</h3>
          </div>
          <form>
            <input
              type='text'
              id='login'
              class='fadeIn second'
              name='login'
              placeholder='login'
            />
            <input
              type='password'
              id='password'
              class='fadeIn third'
              name='login'
              placeholder='password'
            />
            <input type='submit' class='fadeIn fourth' value='Log In' />
          </form>
          <Link to='employee'>
            <button class='directAccessButtons fadeIn fourth hoverEffect'>
              Employee
            </button>{' '}
          </Link>
          <Link to='customer'>
            <button class='directAccessButtons fadeIn fourth hoverEffect'>
              Customer
            </button>{' '}
          </Link>
          <div id='formFooter'>
            <a class='underlineHover' href='#'>
              Forgot Password?
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
