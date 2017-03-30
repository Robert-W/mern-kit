import Page from 'common/js/components/Page';
import React, {Component} from 'react';

const pageOptions = {
  links: {
    logout: true
  }
};

export default class Home extends Component {
  render () {
    return (
      <Page links={pageOptions.links}>
        <div>Hello from the Home Page</div>
      </Page>
    );
  }
}
