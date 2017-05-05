import {changeStep, resetStepper} from 'home/actions/stepperActions';
import {Step, Stepper, StepButton} from 'material-ui/Stepper';
import React, {Component} from 'react';
import store from 'home/store';

export default class NextSteps extends Component {

  setActiveStep = ({ currentTarget }) => {
    const stepId = currentTarget.dataset.id;
    store.dispatch(changeStep(stepId));
  };

  resetStepper = () => {
    store.dispatch(resetStepper());
  };

  render () {
    const {step, completed} = this.props.stepper;

    return (
      <div className='home__next-steps inner'>
        <Stepper linear={false}>
          <Step completed={completed.indexOf('0') !== -1} active={step === '0'}>
            <StepButton data-id='0' onClick={this.setActiveStep}>
              Learn React
            </StepButton>
          </Step>
          <Step completed={completed.indexOf('1') !== -1} active={step === '1'}>
            <StepButton data-id='1' onClick={this.setActiveStep}>
              Learn Node
            </StepButton>
          </Step>
          <Step completed={completed.indexOf('2') !== -1} active={step === '2'}>
            <StepButton data-id='2' onClick={this.setActiveStep}>
              Learn Docker
            </StepButton>
          </Step>
        </Stepper>
      </div>
    );
  }

}
