import { Component } from 'react';
import { Item, Image } from './ImageGalleryItem.styled';
// import PropTypes from 'prop-types';

export class ImageGalleryItem extends Component {
  // state = {
  //   page: 1,
  //   query: '',
  //   items: [],
  // };

  render() {
    return (
      <Item>
        <Image src={this.props.smallImage} alt={this.props.alt} />
      </Item>
    );
  }
}
