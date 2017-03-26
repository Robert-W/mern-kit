import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Home from 'home/components/Home';
import {render} from 'react-dom';
import React from 'react';

const App = () => (
  <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
    <Home />
  </MuiThemeProvider>
);

render(<App />, document.getElementById('mount'));
