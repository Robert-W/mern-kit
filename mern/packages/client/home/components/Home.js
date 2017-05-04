import Page from 'common/components/Page';
import React, {Component} from 'react';

const pageOptions = {
  links: {
    logout: true
  }
};

export default class Home extends Component {

  getWelcomeMessage () {
    // User is a sanitized global from express
    return app.user
      ? `Welcome ${app.user.firstName} ${app.user.lastName}!`
      : 'Who are you?';
  }

  render () {
    const welcomeMessage = this.getWelcomeMessage();


    return (
      <Page links={pageOptions.links}>
        <h2 className='home__welcome-banner'>{welcomeMessage}</h2>
      </Page>
    );
  }
}
