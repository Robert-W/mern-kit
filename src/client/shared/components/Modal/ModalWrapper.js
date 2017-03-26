import React, { Component } from 'react';

const stylesheet = {
  background: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    position: 'fixed',
    height: '100%',
    width: '100%',
    zIndex: 10,
    left: 0,
    top: 0
  },
  modal: {
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    position: 'absolute',
    padding: '30px',
    height: 'auto',
    left: '50%',
    top: '50%'
  },
  closeIconContainer: {
    position: 'absolute',
    cursor: 'pointer',
    display: 'flex',
    height: '30px',
    width: '30px',
    right: 0,
    top: 0
  },
  closeIcon: {
    fill: '#555555',
    margin: 'auto',
    height: '26px',
    width: '26px'
  },
  content: {
    maxHeight: '450px',
    overflowX: 'hidden',
    overflowY: 'auto',
    padding: '5px'
  }
};

export default class ModalWrapper extends Component {
  render () {
    const {visible, onClose, className, children} = this.props;

    // Build up the wrapper's attributes
    const wrapperStyle = Object.assign({}, stylesheet.background);
    wrapperStyle.display = visible ? 'block' : 'none';

    // Build up attributes for the modal
    const attributes = { style: stylesheet.modal };
    attributes.className = className;

    return (
      <div className='app__modal-background' style={wrapperStyle} onClick={onClose}>
        <article {...attributes}>
          <div title='close' style={stylesheet.closeIconContainer} onClick={onClose}>
            <svg style={stylesheet.closeIcon} viewBox='0 0 25 25'>
              <title>Close</title>
              <path d="M 5 19 L 19 5 L 21 7 L 7 21 L 5 19 ZM 7 5 L 21 19 L 19 21 L 5 7 L 7 5 Z" />
            </svg>
          </div>
          <div style={stylesheet.content}>
            {children}
          </div>
        </article>
      </div>
    );
  }
}
