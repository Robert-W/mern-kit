import {
  STEPPER_RESET,
  STEPPER_CHANGE_STEP
} from 'home/constants/stepperConstants';

export function resetStepper () {
  return {
    type: STEPPER_RESET
  };
}

export function changeStep (stepId) {
  return {
    type: STEPPER_CHANGE_STEP,
    payload: stepId
  };
}
