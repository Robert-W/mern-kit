import FlatButton from 'material-ui/FlatButton';
import React, {Component} from 'react';
import 'shared/css/header.scss';

export default class Header extends Component {

  render () {
    const labelStyle = { textDecoration: 'underline' };

    return (
      <header className='app__header'>
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
      </header>
    );
  }
}
