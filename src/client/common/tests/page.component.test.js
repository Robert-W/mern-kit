import Page from 'common/js/components/Page';
import { shallow } from 'enzyme';
import React from 'react';

describe('Page Container Component Test', () => {

  test('Rendering the Page component should not throw', () => {
    shallow(<Page />);
  });

  test('Should contain children passed into it', () => {
    const page = shallow(
      <Page>
        <div className='sample-content' />
      </Page>
    );

    expect(page.contains(<div className='sample-content' />)).toBeTruthy();
  });

});
