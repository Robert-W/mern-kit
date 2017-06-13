import {defaultState} from 'home/config';
import {
  STEPPER_RESET,
  STEPPER_CHANGE_STEP
} from 'home/constants/stepperConstants';

export default function stepperReducer (state = defaultState.stepper, action) {
  let completed;
  switch (action.type) {
    case STEPPER_RESET:
      return Object.assign({}, defaultState.stepper);
    case STEPPER_CHANGE_STEP:
      completed = state.completed.slice();
      if (completed.indexOf(action.payload) === -1) { completed.push(action.payload); }
      return Object.assign({}, {
        step: action.payload,
        completed
      });
    default:
      return state;
  }
}
