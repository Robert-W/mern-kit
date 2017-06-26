import Page from 'common/components/Page';
import React, {Component} from 'react';
import Paper from 'material-ui/Paper';

export default class StatusPage extends Component {

  render () {
    const title = window.statusTitle || document.title || '';
    const message = window.statusMessage || '';

    return (
      <Page>
        <Paper className='status__container' zDepth={3}>
          <h1 className='status-title'>{ title }</h1>
          <h3 className='status-message'>{ message }</h3>
        </Paper>
      </Page>
    );
  }
}
