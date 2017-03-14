import React, {Component} from 'react';
import 'shared/css/header.scss';

export default class Header extends Component {

  render () {
    return (
      <header className='app__header'>
        <div className='inner'>
          <nav className='app__navigation'>
            <ul className='app__navigation-list'>
              <li className='app__navigation-list__item'>
                <a href='/auth/signout' target='_self'>Logout</a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}
