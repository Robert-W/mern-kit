import { ERROR_MESSAGES } from 'resources/strings';
import Page from 'common/components/Page';
import React, {Component} from 'react';

export default class StatusPage extends Component {

  getContent = () => {
    const code = parseInt(document.title);
    return {
      code,
      ...ERROR_MESSAGES[code || '404']
    };
  };

  render () {
    const { code, message, details } = this.getContent();

    return (
      <Page>
        <div className='status__container inner'>
          <section className='status__title-container'>
            <h1 className='status-code'>{ code }</h1>
            <h2 className='status-message'>{ message }</h2>
          </section>
          <p className='status-details'>{ details }</p>
        </div>
      </Page>
    );
  }

}
