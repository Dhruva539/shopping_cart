import React from 'react';
import Modal from 'react-bootstrap/Modal';
import './ModalComponent.css';

class ModalComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: false,
      modalId: '',
      modalSize: '',
      showFooter: false,
      footerContent: ''
    }
  }

  /* For Handling to open the modal */
  openModal(e) {
    if (e) e.preventDefault();
    this.setState({
      display: true,
      modalId: this.props.modalId
    });
  }

  /* For handling close modal */
  closeModal(e) {
    if (e) e.preventDefault();
    this.setState({
      display: false
    }, () => {
      this.props.onModalClose && this.props.onModalClose();
    })
  }

  render() {
    const {modalTitle,showFooter,footerContent} = this.props;

    return(
    <Modal
      {...this.props}
      centered
      show={this.state.display}
      dialogClassName="modal-40w"
      bsPrefix="custom-modal"
    >
      <div className="modal-header">
        {modalTitle ? <div className="modal-title">{modalTitle}</div> : ""}
        <button type="button" className="close" onClick={() => this.closeModal()}>
          <span aria-hidden="true">x</span>
        </button>
      </div>
      <div id={this.state.modalId}>
        <Modal.Body>
          {this.props.children}
        </Modal.Body>
        {
          (showFooter) ?
            <Modal.Footer>
              {footerContent}
            </Modal.Footer>
          :""
        }
      </div>
    </Modal>
    )
  }
}

export default ModalComponent;