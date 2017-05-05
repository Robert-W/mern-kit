import {changeStep} from 'home/actions/stepperActions';
import Home from 'home/components/Home';
import {shallow, mount} from 'enzyme';
import store from 'home/store';
import React from 'react';

describe('Home Component Test', () => {

  test('Mounting and Unmounting the Home component should not throw', () => {
    const wrapper = mount(<Home />);
    wrapper.unmount();
  });

  test('Home component should receive updated state after an action is dispatched', () => {
    const wrapper = mount(<Home />);
    const expected = ['1'];
    const newStepId = '1';

    store.dispatch(changeStep(newStepId));
    // Grab the stepper state and see if it correctly updated
    const {stepper} = wrapper.state();
    expect(stepper.step).toEqual(newStepId);
    expect(stepper.completed).toEqual(expect.arrayContaining(expected));
  });

  test('Rendering the Home component with a user should render a welcome message', () => {
    const defaultUser = { firstName: 'Mr.', lastName: 'Johnson' };
    shallow(<Home user={defaultUser} />);
  });

});
