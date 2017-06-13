import stepperReducer from 'home/reducers/stepperReducer';
import {combineReducers} from 'redux';

export default combineReducers({
  stepper: stepperReducer
});
