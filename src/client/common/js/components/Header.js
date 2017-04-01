import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import React, {Component} from 'react';

/* <header className='app__header'>
  <div className='inner'>
    <nav className='app__navigation'>
      <ul className='app__navigation-list'>
        <li className='app__navigation-list__item'>
          <FlatButton
            label='Logout'
            href='/auth/signout'
            labelStyle={labelStyle} />
        </li>
      </ul>
    </nav>
  </div>
</header> */

export default class Header extends Component {

  render () {
    const labelStyle = { textDecoration: 'underline', color: 'white' };
    const { links = {} } = this.props;

    return (
      <AppBar
        title='Mern-Kit'
        className='app__header'
        showMenuIconButton={false}>
        <nav className='app__navigation'>
          <ul className='app__navigation-list'>
            { !links.logout ? undefined :
              <li className='app__navigation-list__item'>
                <FlatButton
                  label='Logout'
                  href='/auth/signout'
                  labelStyle={labelStyle} />
              </li>
            }
          </ul>
        </nav>
      </AppBar>
    );
  }
}
