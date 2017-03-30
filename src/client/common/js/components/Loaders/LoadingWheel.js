import React, { Component } from 'react';

const stylesheet = {
  loadingWheel: {
    transform: 'translate(-50%, -50%)',
    position: 'absolute',
    height: '50px',
    width: '50px',
    left: '50%',
    top: '50%'
  },
  animation: 'animation: spinner 0.95s cubic-bezier(0.645, 0.045, 0.355, 1.000) infinite;',
  foreground: { fill: '#FFF' }
};

/**
* @class LoadingWheel
* @classdesc Simple loading wheel you can toggle via it's active prop. It will attempt to center
* itself inside whatever component you place it in
* @property {Boolean} active - Whether or not to display the modal
* @property {String} [fill='#FFF'] - Valid css or hex color which is the fill for the SVG element
* @example
  <LoadingWheel active={this.state.fetchingData} fill='#FF00FF' />
*/
export default class LoadingWheel extends Component {
  displayName: 'LoadingWheel';

  render () {
    const {active, fill} = this.props;
    const loadingWheelStyle = Object.assign({}, stylesheet.loadingWheel);
    // Show the spinner if it is active
    loadingWheelStyle.display = active ? 'block' : 'none';
    // Construct the foreground styles
    let foreground = active ? stylesheet.animation : '';
    foreground += `fill: ${fill || stylesheet.foreground.fill};`;

    return (
      <div style={loadingWheelStyle}>
        <svg width='50' height='50' dangerouslySetInnerHTML={{ __html: `
            <g transform='translate(25,25) rotate(-90)'>
              <path d="M0,25A25,25 0 1,1 0,-25A25,25 0 1,1 0,25M0,20A20,20 0 1,0 0,-20A20,20 0 1,0 0,20Z" style="fill:transparent"></path>
              <path
                d="M1.5308084989341915e-15,-25A25,25 0 0,1 25,0L20,0A20,20 0 0,0 1.2246467991473533e-15,-20Z"
                transform="rotate(709.287459262793)"
                style="${foreground}">
              </path>
            </g>
          `
        }} />
      </div>
    );
  }
}
