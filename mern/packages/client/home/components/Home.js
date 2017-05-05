import NextSteps from 'home/components/NextSteps';
import Page from 'common/components/Page';
import React, {Component} from 'react';
import store from 'home/store';

const pageOptions = {
  links: {
    logout: true
  }
};

export default class Home extends Component {

  constructor (props) {
    super(props);
    this.state = store.getState();
  }

  componentDidMount () {
    this.unsubscribe = store.subscribe(this.storeDidUpdate);
  }

  componentWillUnmount () {
    this.unsubscribe();
  }

  storeDidUpdate = () => {
    this.setState(() => store.getState());
  }

  getWelcomeMessage (user) {
    return user
      ? `Welcome ${user.firstName} ${user.lastName}!`
      : 'Who are you?';
  }

  render () {
    const {user} = this.props;
    const welcomeMessage = this.getWelcomeMessage(user);


    return (
      <Page links={pageOptions.links}>
        <h2 className='home__welcome-banner'>{welcomeMessage}</h2>
        <NextSteps {...this.state} />
      </Page>
    );
  }
}
