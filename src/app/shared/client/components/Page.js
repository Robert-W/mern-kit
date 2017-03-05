import React, {Component} from 'react';
import Header from './Header';
import 'shared/css/page.scss';

export default class Page extends Component {

  render () {
    return (
      <div className='app'>
        <Header />
        <div className='app__body'>
          {this.props.children}
        </div>
      </div>
    );
  }
}
