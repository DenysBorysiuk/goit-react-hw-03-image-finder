import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getImages } from 'services/api';
import { Container } from './App.styled';

export class App extends Component {
  state = {
    page: 1,
    query: '',
    items: [],
  };

  handleSearch = async query => {
    try {
      const gallery = await getImages(query, this.state.page);
      // console.log(gallery.data);
      if (!gallery.data.totalHits) {
        return alert('ничего не нашлось');
      }

      this.setState(state => ({
        query,
        items: [...gallery.data.hits],
      }));
    } catch (error) {
      console.log(error);
    }
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  // componentDidUpdate(_, prevState) {
  //   if (
  //     prevState.page !== this.state.page ||
  //     prevState.query !== this.state.query
  //   ) {
  //     console.log('тут фетч');
  //     getImages(this.state.query, this.state.page);
  //   }
  // }

  render() {
    return (
      <Container>
        {console.log(this.state.items)}
        <Searchbar onSubmit={this.handleSearch} />
        {this.state.items && <ImageGallery gallery={this.state.items} />}
      </Container>
    );
  }
}
