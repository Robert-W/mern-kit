import {STEPPER_RESET, STEPPER_CHANGE_STEP} from 'home/constants/stepperConstants';
import reducer from 'home/reducers/stepperReducer';
import {defaultState} from 'home/config';

describe('Stepper Reducer Test', () => {

  test('Reducer should successfully reset the state after making some changes', () => {
    const {stepper} = defaultState;
    // Pass in a mock state and make sure the state that comes out equals the defaultState
    const state = reducer({ step: '1', completed: ['0', '1', '2']}, { type: STEPPER_RESET });
    expect(state.step).toEqual(stepper.step);
    expect(state.completed.length).toEqual(stepper.completed.length);
    // default state should be immutable and never modified
    expect(state).not.toBe(stepper);
  });

  test('Reducer should successfully update the step and completed properties', () => {
    const currentState = Object.assign({}, defaultState.stepper);
    // Let's bump the state a few times before resetting
    let state = reducer(currentState, { type: STEPPER_CHANGE_STEP, payload: '0' });
    state = reducer(state, { type: STEPPER_CHANGE_STEP, payload: '1' });
    // Make sure the state updated
    expect(state).toEqual(expect.objectContaining({
      step: expect.stringMatching('1'),
      completed: expect.arrayContaining(['0', '1'])
    }));
    // Changing to a step already visited should not add duplicate entries to completed
    state = reducer(state, { type: STEPPER_CHANGE_STEP, payload: '0' });
    expect(state.completed.length).toEqual(2);
    expect(state.completed).toEqual(expect.arrayContaining(['0', '1']));
  });

  test('should return whatever the current state is if reducer is passed an invalid type', () => {
    // The reducer should just return whatever state it is given if an invalid type is passed in
    const baseState = { foo: 'bar' };
    const state = reducer(baseState, { type: 'SOME_INVALID_ACTION_TYPE' });
    expect(state).toBe(baseState);
  });

  test('should default to the defaultState.stepper if no state is given', () => {
    // The reducer should just return whatever state it is given if an invalid type is passed in
    const state = reducer(undefined, { type: 'SOME_INVALID_ACTION_TYPE' });
    expect(state).toBe(defaultState.stepper);
  });

});
