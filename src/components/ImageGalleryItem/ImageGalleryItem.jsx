import { Component } from 'react';
import { Item, Image } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';
// import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { showModal } = this.state;
    return (
      <>
        <Item onClick={this.toggleModal}>
          <Image src={this.props.smallImage} alt={this.props.alt} />
        </Item>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={this.props.largeImage} alt={this.props.alt} />
          </Modal>
        )}
      </>
    );
  }
}
