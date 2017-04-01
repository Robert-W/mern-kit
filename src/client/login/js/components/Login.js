import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import Paper from 'material-ui/Paper';
import Page from 'common/js/components/Page';
import React, {Component} from 'react';

export default class Login extends Component {

  constructor (props) {
    super(props);

    this.state = {
      dialogOpen: false,
      dialogTitle: '',
      dialogMessage: ''
    };
  }

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
        this.setState({
          dialogOpen: true,
          dialogTitle: 'Unable to login',
          dialogMessage: response.message
        });
      }
    };
    // request.onerror = err => { console.log(`Error: ${err}`); };
    request.open('POST', '/auth/signin', true);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.send(`username=${username.input.value}&password=${password.input.value}`);
  };

  signUp = () => {
    this.setState({
      dialogOpen: true,
      dialogTitle: 'Sign Up',
      dialogMessage: 'The Sign Up feature has not yet been implemented, it\'s coming soon!'
    });
  };

  shouldCloseDialog = () => {
    this.setState({ dialogOpen: false });
  };

  render () {
    const {dialogOpen, dialogTitle, dialogMessage} = this.state;
    const defaultAction = [
      <RaisedButton label="OK" secondary={true} keyboardFocused={true} onTouchTap={this.shouldCloseDialog} />
    ];

    return (
      <Page>
        <Dialog
          open={dialogOpen}
          title={dialogTitle}
          actions={defaultAction}
          onRequestClose={this.shouldCloseDialog}>
          {dialogMessage}
        </Dialog>
        <Paper className='login__container' zDepth={3}>
          <form className='login__form flex'>
            <h2 className='login__form-title'>Sign In</h2>
            <TextField
              ref='username'
              name='username'
              floatingLabelText='Username' />
            <TextField type='password'
              ref='password'
              name='password'
              floatingLabelText='Password' />
            <div className='login__form-actions flex'>
              <RaisedButton
                label="Sign In"
                onTouchTap={this.signIn} />
              <RaisedButton
                label="Sign Up"
                onTouchTap={this.signUp} />
            </div>
          </form>
        </Paper>
      </Page>
    );
  }
}
