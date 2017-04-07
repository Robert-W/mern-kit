import ModalWrapper from 'common/components/Modal/ModalWrapper';
import { shallow } from 'enzyme';
import React from 'react';

describe('ModalWrapper Component Test', () => {

  test('Rendering the ModalWrapper should not throw', () => {
    shallow(<ModalWrapper />);
  });

  test('Should allow for passing html (or Components) into it', () => {
    const modalWrapper = shallow(
      <ModalWrapper>
        <div className='child' />
      </ModalWrapper>
    );

    expect(modalWrapper.contains(<div className='child' />)).toBeTruthy();
  });

  test('Should toggle the display based on the \'visible\' property', () => {
    const modalWrapper = shallow(<ModalWrapper />);
    expect(modalWrapper.node.props.style.display).toMatch('none');
    modalWrapper.setProps({ visible: true });
    expect(modalWrapper.node.props.style.display).toMatch('block');
    modalWrapper.setProps({ visible: false });
    expect(modalWrapper.node.props.style.display).toMatch('none');
  });

  test('Should invoke the \'onClose\' function when the close icon is clicked', () => {
    const onClose = jest.fn();
    const modalWrapper = shallow(<ModalWrapper onClose={onClose} />);
    modalWrapper.find('div[title="close"]').simulate('click');
    expect(onClose).toHaveBeenCalled();
  });

  test('Should invoke the \'onClose\' function when the background is clicked', () => {
    const onClose = jest.fn();
    const modalWrapper = shallow(<ModalWrapper onClose={onClose} />);
    modalWrapper.find('.app__modal-background').simulate('click');
    expect(onClose).toHaveBeenCalled();
  });

  test('Should append the \'className\' to the article element to allow custom themes', () => {
    const modalWrapper = shallow(<ModalWrapper className='sample-theme' />);
    const article = modalWrapper.find('.sample-theme');
    expect(article).toHaveLength(1);
    expect(article.node.type).toMatch('article');
    expect(article.node.props.className).toMatch(/sample-theme/);
  });

  test('Should not append any unnecessary style objects if \'noStyle\' is set to true', () => {
    const modalWrapper = shallow(<ModalWrapper noStyle={true} />);
    const background = modalWrapper.find('.app__modal-background');
    const modal = modalWrapper.find('.app__modal');
    const closeIconContainer = modalWrapper.find('.app__modal-close-icon-container');
    // calling find on className with a SVG does not seem to work reliably
    const closeIcon = closeIconContainer.childAt(0);
    const content = modalWrapper.find('.app__modal-content');
    // Background should only have one property which is the 'display' property,
    // and display should be set to none
    expect(Object.keys(background.node.props.style)).toHaveLength(1);
    expect(background.node.props.style).toHaveProperty('display', 'none');
    // All other elements should have no style props attached to them
    expect(Object.keys(modal.node.props.style)).toHaveLength(0);
    expect(Object.keys(closeIconContainer.node.props.style)).toHaveLength(0);
    expect(Object.keys(closeIcon.node.props.style)).toHaveLength(0);
    expect(Object.keys(content.node.props.style)).toHaveLength(0);
  });

});
