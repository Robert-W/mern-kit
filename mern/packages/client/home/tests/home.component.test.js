import {changeStep} from 'home/actions/stepperActions';
import renderer from 'react-test-renderer';
import Home from 'home/components/Home';
import store from 'home/store';
import {mount} from 'enzyme';
import React from 'react';

describe('Home Component Test', () => {

  test('Mounting and Unmounting the Home component should not throw', () => {
    const wrapper = mount(<Home />);
    wrapper.unmount();
  });

  test('Home component should receive updated state after an action is dispatched', () => {
		// Mock our console and make sure it's called by our store's middleware
    global.console = { log: jest.fn() };
    const wrapper = mount(<Home />);
    const expected = ['1'];
    const newStepId = '1';

    store.dispatch(changeStep(newStepId));
    // Grab the stepper state and see if it correctly updated
    const {stepper} = wrapper.state();
    expect(stepper.step).toEqual(newStepId);
    expect(stepper.completed).toEqual(expect.arrayContaining(expected));
    expect(console.log).toHaveBeenCalledTimes(2);
  });

  test('Rendering the Home component with a user should render a welcome message', () => {
    const defaultUser = { firstName: 'Mr.', lastName: 'Johnson' };
    const tree = renderer.create(<Home user={defaultUser} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
