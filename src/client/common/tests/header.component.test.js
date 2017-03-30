import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Header from 'common/js/components/Header';
import renderer from 'react-test-renderer';
import React from 'react';

/**
* Snapshot testing can be very useful if used correctly, this example just shows how to use
* it but this is not the most useful snapshot, sometimes it is better to call it multiple
* times inside a test and take snapshots of the component changing throughout some interactions,
* Ex. snapshot default state, snapshot after click/mouseover, snapshot after mouseleave
*/
describe('Header snapshot Tests', () => {

  test('Should render a simple header wrapped around an app bar', () => {
    const header = renderer.create(
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <Header />
      </MuiThemeProvider>
    );
    const tree = header.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Should render a simple header with a link in it', () => {
    const props = { links: { logout: true }};
    const header = renderer.create(
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <Header {...props} />
      </MuiThemeProvider>
    );
    const tree = header.toJSON();
    expect(tree).toMatchSnapshot();
  });

});
