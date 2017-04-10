import Login from 'login/components/Login';
import { shallow, mount } from 'enzyme';
import React from 'react';

/**
* Import with as so that later we can override the default export to mock out it's functionality
*/
import * as request from 'common/utils/request';

/**
* Set up a mock window.location property since login redirects after a successful login
*/
Object.defineProperty(window.location, 'href', { writable: true, value: '' });


describe('Login Component Test', () => {

  test('Rendering the Login component should not throw', () => {
    shallow(<Login />);
  });

  test('Should show the modal if Sign Up button is clicked', () => {
    const component = shallow(<Login />);
    expect(component.state('dialogOpen')).toBeFalsy();
    component.find({ label: 'Sign Up' }).simulate('touchTap');
    expect(component.state('dialogOpen')).toBeTruthy();
  });

  test('Should close the modal when closeDialog is called', () => {
    const component = shallow(<Login />);
    component.find({ label: 'Sign Up' }).simulate('touchTap');
    expect(component.state('dialogOpen')).toBeTruthy();
    // I can't seem to find the RaisedButton inside the dialog, so let's trigger it's callback manually
    component.instance().closeDialog();
    expect(component.state('dialogOpen')).toBeFalsy();
  });

  test('Should handle a request error and show the message in the dialog', async () => {
    const component = mount(<Login />);
    const error = new Error('Bad Request');
    // Mock out the request module to reject the request
    request.default = () => new Promise((_, reject) => reject(error));
    await component.instance().signIn();
    expect(component.state('dialogOpen')).toBeTruthy();
    expect(component.state('dialogMessage')).toMatch('Bad Request');
  });

  test('Should handle a failed login attempt and show the correct message in the dialog', async () => {
    const component = mount(<Login />);
    const error = new Error('Invalid username/password');
    // Mock out the request to resolve with an error
    request.default = () => new Promise((resolve, _) => resolve(error));
    await component.instance().signIn();
    expect(component.state('dialogOpen')).toBeTruthy();
    expect(component.state('dialogMessage')).toMatch('Invalid username/password');
  });

  test('Should redirect after a successful login attempt', async () => {
    const component = mount(<Login />);
    // Mock out the request to resolve with a status of success
    request.default = () => new Promise((resolve, _) => resolve({ status: 'success' }));
    await component.instance().signIn();
    expect(component.state('dialogOpen')).toBeFalsy();
    expect(global.window.location.href).toMatch('/home');
  });

});
