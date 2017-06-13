import {changeStep, resetStepper} from 'home/actions/stepperActions';
import {Step, Stepper, StepButton} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
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

  nextStep = ({ currentTarget }) => {
    const currentStep = currentTarget.dataset.current;
    const nextStep = currentStep ? parseInt(currentStep) + 1 : 0;
    store.dispatch(changeStep(nextStep.toString()));
  };

  canPerformNextStep = () => {
    const {stepper = {}} = this.props;
    const {step, completed = []} = stepper;
    return completed.length === 3 || +step >= 2;
  };

  getStepContent = step => {
    switch (step) {
      case '0':
        return 'React is a very powerful view library and as any great architect or mechanic, you should master your tools.'
        + ' As your application grows and becomes more complex, it is worth investing some time'
        + ' in learning how to use a data management library like Redux (or about Flux).  It\'s also worthwhile'
        + ' learning some of the amazing tooling, like webpack, to customize and optimize your builds.'
        + ' A great tip is to start simple and only add complexity when necessary.';
      case '1':
        return 'If your going to be using this starter-kit, then you are going to need to be very comfortable'
        + ' with Node.js and how to design easy to maintain, modular apps. Learn about things like Express so you'
        + ' cusotmize your own web server, or GraphQL to build awesome API\'s. There are so many things you can do'
        + ' in Node. Learn the basics first and then start learning things relative'
        + ' to your stack so you can build a great application end to end.';
      case '2':
        return 'The final piece to mastering mern-kit is to learn Docker. With Docker, you can compose multiple services'
        + ' and easily setup environments running node, mongo, elasticsearch, and many other services while only needing docker installed.'
        + ' No more setting up and configuring all these separate environments. With Docker, there are also many deployment tools & services'
        + ' you would do well to learn and understand.';
      default:
        return 'Click a step above to read about some next steps to '
        + 'take this starter kit to the next level.';
    }
  };

  render () {
    const {stepper = {}} = this.props;
    const {step, completed = []} = stepper;

    return (
      <div className='home__next-steps inner'>
        <Stepper linear={false}>
          <Step completed={completed.indexOf('0') !== -1} active={step === '0'}>
            <StepButton data-id='0' onClick={this.setActiveStep}>Learn React</StepButton>
          </Step>
          <Step completed={completed.indexOf('1') !== -1} active={step === '1'}>
            <StepButton data-id='1' onClick={this.setActiveStep}>Learn Node</StepButton>
          </Step>
          <Step completed={completed.indexOf('2') !== -1} active={step === '2'}>
            <StepButton data-id='2' onClick={this.setActiveStep}>Learn Docker</StepButton>
          </Step>
        </Stepper>
        <div className='home__stepper-content'>
          {this.getStepContent(step)}
        </div>
        <div className='home__stepper-actions'>
          <RaisedButton
            primary={true}
            label="Next Step"
            data-current={step}
            onTouchTap={this.nextStep}
            disabled={this.canPerformNextStep()} />
          <RaisedButton
            secondary={true}
            label="Reset Stepper"
            onTouchTap={this.resetStepper} />
        </div>
      </div>
    );
  }

}
