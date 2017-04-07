import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import React, {Component} from 'react';
import Header from './Header';

//- Needed for onTouchTap
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

//- Set the user agent so server rendering works
lightBaseTheme.userAgent = 'all';

export default class Page extends Component {

  render () {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <div className='app'>
          <Header {...this.props} />
          <div className='app__body'>
            {this.props.children}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
