import Page from 'shared/components/Page';
import React, {Component} from 'react';
import 'login/css/login.scss';

export default class Login extends Component {

  signIn = () => {
    const {username, password} = this.refs;
    // Create our request
    var request = new XMLHttpRequest();
    // Handle successful or failed logins
    request.onload = () => {
      const response = JSON.parse(request.responseText);
      if (response.success) {
        window.location.href = '/home';
      } else {
        // const {toaster} = this.refs;
        // toaster.toast({
        //   type: 'error',
        //   title: 'Unable to login',
        //   message: response.message
        // });
      }
    };
    // request.onerror = err => { console.log(`Error: ${err}`); };
    request.open('POST', '/auth/signin', true);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send(`username=${username.value}&password=${password.value}`);
  };

  signUp = () => {
    // const {toaster} = this.refs;
    // toaster.toast({
    //   type: 'warning',
    //   title: 'Coming Soon!',
    //   message: 'We\'re still working on this feature, please check back soon'
    // });
  };

  render () {
    return (
      <Page>
        <div className='login__container shadow'>
          <form className='login__form flex'>
            <h2 className='login__form-title'>Login</h2>
            <input type='text'
              ref='username'
              name='username'
              placeholder='Username'
              className='login__form-input no-outline' />
            <input type='password'
              ref='password'
              name='password'
              placeholder='Password'
              className='login__form-input no-outline' />
            <div className='login__form-actions flex'>
              <button type='button'
                onClick={this.signIn}
                className='login__form-buttons button-theme no-outline'>
                Sign In
              </button>
              <button type='button'
                onClick={this.signUp}
                className='login__form-buttons button-theme no-outline'>
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </Page>
    );
  }
}
