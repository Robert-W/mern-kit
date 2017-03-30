import LoadingWheel from 'common/js/components/Loaders/LoadingWheel';
import { shallow } from 'enzyme';
import React from 'react';

describe('LoadingWheel Component Test', () => {

  test('Rendering the ModalWrapper should not throw', () => {
    shallow(<LoadingWheel />);
  });

  test('Should toggle the display based on the \'active\' property', () => {
    const loader = shallow(<LoadingWheel />);
    expect(loader.node.props.style.display).toMatch('none');
    loader.setProps({ active: true });
    expect(loader.node.props.style.display).toMatch('block');
    loader.setProps({ active: false });
    expect(loader.node.props.style.display).toMatch('none');
  });

  test('Should have a default fill of of \'#FFF\'', () => {
    const loader = shallow(<LoadingWheel />);
    const svg = loader.childAt(0);
    const html = svg.node.props.dangerouslySetInnerHTML.__html;
    expect(html).toEqual(expect.stringContaining('#FFF'));
  });

  test('Should be able to override the fill value', () => {
    const loader = shallow(<LoadingWheel fill='#F00'/>);
    const svg = loader.childAt(0);
    const html = svg.node.props.dangerouslySetInnerHTML.__html;
    expect(html).toEqual(expect.stringContaining('#F00'));
  });

});
