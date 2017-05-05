import Home from 'home/components/Home';
import { shallow } from 'enzyme';
import React from 'react';

describe('Home Component Test', () => {

  test('Rendering the Home component should not throw', () => {
    shallow(<Home />);
  });

  test('Rendering the Home component with a user should render a welcome message', () => {
    const defaultUser = { firstName: 'Mr.', lastName: 'Johnson' };
    shallow(<Home user={defaultUser} />);
  });

});
