import NextSteps from 'home/components/NextSteps';
import {Step} from 'material-ui/Stepper';
import Home from 'home/components/Home';
import {defaultState} from 'home/config';
import store from 'home/store';
import {mount} from 'enzyme';
import React from 'react';

/**
* This is a pure component so let's manipulate the store
* and pass in new props to make sure it updates
*/
describe('NextSteps Component Test', () => {

  beforeAll(() => {
    // Mock our console and make sure it's called by our store's middleware
    // Note this will swallow all logs in these tests, comment out if you need to log things
    global.originalConsole = global.console;
    global.console = { log: jest.fn() };
  });

  afterAll(() => {
    global.console = global.originalConsole;
  });

  test('Mounting and Unmounting the NextSteps component should not throw', () => {
    const wrapper = mount(<Home><NextSteps /></Home>);
    wrapper.unmount();
  });

  test('Component should render the correct step after the step is changed', () => {
    const mockEvent = { currentTarget: { dataset: { id: '1' }}};
    const state = store.getState();
    const wrapper = mount(<Home><NextSteps {...state} /></Home>);
    const component = wrapper.find(NextSteps).node;
    // Change the step and verify things have updated
    component.setActiveStep(mockEvent);
    // This should have triggered an action/reducer/store update and passed in new props
    const steps = wrapper.find(Step);
    const {props} = steps.nodes[1];
    expect(props.active).toBeTruthy();
    expect(props.completed).toBeTruthy();
  });

  test('Component should reset to default state after triggering the reset action', () => {
    const wrapper = mount(<Home><NextSteps stepper={defaultState.stepper} /></Home>);
    const component = wrapper.find(NextSteps).node;
    const steps = wrapper.find(Step);
    component.resetStepper();
    // Check the properties and make sure the whole Redux workflow worked correctly
    expect(component.props).toEqual({ stepper: defaultState.stepper });
    steps.nodes.forEach(step => {
      expect(step.props.active).toBeFalsy();
      expect(step.props.completed).toBeFalsy();
    });
  });

});
