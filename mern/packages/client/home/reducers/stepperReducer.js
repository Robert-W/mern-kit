import {
  STEPPER_RESET,
  STEPPER_CHANGE_STEP
} from 'home/constants/stepperConstants';

const defaultState = {
  completed: [],
  step: undefined
};

export default function stepperReducer (state = defaultState, action) {
  let completed;
  switch (action.type) {
    case STEPPER_RESET:
      return defaultState;
    case STEPPER_CHANGE_STEP:
      completed = state.completed.slice();
      if (completed.indexOf(action.payload) === -1) { completed.push(action.payload); }
      return Object.assign(state, {
        step: action.payload,
        completed
      });
    default:
      return state;
  }
}
