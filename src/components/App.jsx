import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getImages } from 'services/api';
import { Container } from './App.styled';
import toast, { Toaster } from 'react-hot-toast';
import { LoadMoreBtn } from './Button/Button';

export class App extends Component {
  state = {
    page: 1,
    query: '',
    items: [],
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.query !== this.state.query
    ) {
      getImages(this.state.query, this.state.page)
        .then(resp => {
          if (!resp.data.totalHits) {
            return toast.error('Input correct query');
          }
          this.setState(prevState => ({
            items: [...prevState.items, ...resp.data.hits],
          }));
        })
        .catch(error => console.log(error));
    }
  }

  handleSearch = query => {
    this.setState(state => ({
      page: 1,
      query,
      items: [],
    }));
  };

  loadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  render() {
    return (
      <Container>
        <Toaster position="top-right" reverseOrder={false} />

        <Searchbar onSubmit={this.handleSearch} />
        {this.state.items.length > 0 && (
          <ImageGallery gallery={this.state.items} />
        )}
        {this.state.items.length > 0 && <LoadMoreBtn onClick={this.loadMore} />}
      </Container>
    );
  }
}
