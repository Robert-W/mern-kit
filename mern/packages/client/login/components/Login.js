import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Page from 'common/components/Page';
import Dialog from 'material-ui/Dialog';
import React, {Component} from 'react';
import Paper from 'material-ui/Paper';

import request from 'common/utils/request';

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

    return request({
      type: 'POST',
      url: '/auth/signin',
      params: { username: username.input.value, password: password.input.value },
      headers: [{ name: 'Content-type', value: 'application/x-www-form-urlencoded' }]
    })
    .then(response => {
      if (response.status === 'success') {
        window.location.href = '/home';
      } else {
        this.showDialog('Unable to login', response.message || 'Unknown error');
      }
    })
    .catch(err => {
      this.showDialog('Unable to login', err && err.message || 'Unknown error');
    });
  };

  signUp = () => {
    this.showDialog('Sign Up', 'The Sign Up feature has not yet been implemented, it\'s coming soon!');
  };

  closeDialog = () => {
    this.setState({ dialogOpen: false });
  };

  showDialog = (title, message) => {
    this.setState({
      dialogOpen: true,
      dialogTitle: title,
      dialogMessage: message
    });
  };

  render () {
    const {dialogOpen, dialogTitle, dialogMessage} = this.state;
    const defaultAction = [
      <RaisedButton label="OK" secondary={true} keyboardFocused={true} onTouchTap={this.closeDialog} />
    ];

    return (
      <Page>
        <Dialog
          open={dialogOpen}
          title={dialogTitle}
          actions={defaultAction}
          onRequestClose={this.closeDialog}>
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
