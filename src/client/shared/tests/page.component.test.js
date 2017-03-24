import Page from 'shared/components/Page';
import { shallow } from 'enzyme';
import React from 'react';

/**
* Enzyme is great for dom testing
*/
describe('Modal Wrapper Tests', () => {

  test('Rendering the Modal Wrapper should not throw', () => {
    shallow(<Page />);
  });

  test('Should contain children passed into it', () => {
    const wrapper = shallow(
      <Page>
        <div className='sample-content' />
      </Page>
    );

    expect(wrapper.contains(<div className='sample-content' />)).toBeTruthy();
  });

});
