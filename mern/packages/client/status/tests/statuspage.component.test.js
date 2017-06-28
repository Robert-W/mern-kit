import StatusPage from 'status/components/StatusPage';
import renderer from 'react-test-renderer';
import {mount} from 'enzyme';
import React from 'react';

describe('StatusPage Component Test', () => {

  test('Mounting and Unmounting the StatusPage component should not throw', () => {
    const wrapper = mount(<StatusPage />);
    wrapper.unmount();
  });

  test('Snapshot test of the StatusPage component', () => {
    const tree = renderer.create(<StatusPage />).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
