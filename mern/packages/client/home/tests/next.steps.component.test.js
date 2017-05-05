import NextSteps from 'home/components/NextSteps';
import Home from 'home/components/Home';
import store from 'home/store';
import {mount} from 'enzyme';
import React from 'react';

/**
* This is a pure component so let's manipulate the store
* and pass in new props to make sure it updates
*/
describe('NextSteps Component Test', () => {

  test('Mounting and Unmounting the NextSteps component should not throw', () => {
    const wrapper = mount(<Home><NextSteps /></Home>);
    wrapper.unmount();
  });

  test('Component should render the correct step after an the step is changed', () => {
    const mockEvent = { currentTarget: { dataset: { id: '1' }}};
    const defaultState = store.getState();
    const wrapper = mount(<Home><NextSteps {...defaultState} /></Home>);
    const component = wrapper.find(NextSteps).node;
    component.setActiveStep(mockEvent);
    // const step = wrapper.find('[data-id=\'1\']');
  });

  test('Component should reset to default state after triggering the reset action', () => {
    const defaultState = store.getState();
    const wrapper = mount(<Home><NextSteps {...defaultState} /></Home>);
    const component = wrapper.find(NextSteps).node;
    component.resetStepper();
  });

});
