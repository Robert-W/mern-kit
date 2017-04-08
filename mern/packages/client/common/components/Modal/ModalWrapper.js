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

/**
* @class ModalWrapper
* @classdesc Controlled container component for presenting modals.
* @property {Boolean} visible - Boolean indicating whether this class is visible or not
* @property {Function} onClose - Function to invoke when a user clicks the close icon or the background
* @property {String} [className] - CSS class to help apply a custom theme on the article
* @property {Component | HTML} [children] - Components or Markup to Embed in this component
* @property {Boolean} [noStyle=false] - Disable all inline style except display property. You must
* provide all of your own styles via the used classNames. Below is a sample skeelton of the output
* with the classes you would need to implement in your css
  <div class='app__modal-background'>
    <article class='app__modal-window'>
      <div class='app__modal-close-icon-container'>
        <svg class='app__modal-close-icon' />
      </div>
      <div class='app__modal-content'>
      </div>
    </article>
  </div>
* @example
* <ModalWrapper
    visible={false}
    className={'Error-Modal'}
    onClose={this.handleClose}>
    <div>
      Upload some stuff with my upload component
      <UploadComponent />
    </div>
  </ModalWrapper>
*/
export default class ModalWrapper extends Component {
  displayName: 'ModalWrapper';

  render () {
    const {visible, onClose, className, children, noStyle} = this.props;
    // Build up the wrapper's attributes
    const wrapperStyle = noStyle ? {} : Object.assign({}, stylesheet.background);
    wrapperStyle.display = visible ? 'block' : 'none';
    // Set styles for other elements here
    const closeIconContainerStyle = noStyle ? {} : stylesheet.closeIconContainer;
    const closeIconContainer = noStyle ? {} : stylesheet.closeIcon;
    const contentStyle = noStyle ? {} : stylesheet.content;
    // Build up attributes for the modal
    const modalAttributes = {
      style: (noStyle ? {} : stylesheet.modal),
      className: `app__modal ${className}`
    };

    return (
      <div className='app__modal-background' style={wrapperStyle} onClick={onClose}>
        <article {...modalAttributes}>
          <div
            title='close'
            onClick={onClose}
            style={closeIconContainerStyle}
            className='app__modal-close-icon-container'>
            <svg
              viewBox='0 0 25 25'
              style={closeIconContainer}
              className='app_modal-close-icon'>
              <title>Close</title>
              <path d="M 5 19 L 19 5 L 21 7 L 7 21 L 5 19 ZM 7 5 L 21 19 L 19 21 L 5 7 L 7 5 Z" />
            </svg>
          </div>
          <div style={contentStyle} className='app__modal-content'>
            {children}
          </div>
        </article>
      </div>
    );
  }
}
