import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getImages } from 'services/api';
import { Container, Loader } from './App.styled';
import toast, { Toaster } from 'react-hot-toast';
import { LoadMoreBtn } from './Button/Button';
import { ThreeDots } from 'react-loader-spinner';

export class App extends Component {
  state = {
    page: 1,
    query: '',
    items: [],
    isLoading: false,
  };

  componentDidUpdate(_, prevState) {
    const { page, query } = this.state;
    if (prevState.page !== page || prevState.query !== query) {
      this.setState({ isLoading: true });
      getImages(query, page)
        .then(resp => {
          if (!resp.data.totalHits) {
            this.setState({ isLoading: false });
            return toast.error('Enter correct query');
          }
          this.setState(({ items }) => ({
            items: [...items, ...resp.data.hits],
            isLoading: false,
          }));
        })
        .catch(error => console.log(error));
    }
  }

  handleSearch = query => {
    if (query !== this.state.query) {
      this.setState(state => ({
        page: 1,
        query,
        items: [],
      }));
    }
  };

  loadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  render() {
    const { items, isLoading } = this.state;
    return (
      <Container>
        <Toaster position="top-right" reverseOrder={false} />
        <Searchbar onSubmit={this.handleSearch} isSubmiting={isLoading} />
        {this.state.items.length > 0 && <ImageGallery items={items} />}
        <Loader>
          {this.state.isLoading && (
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="#3f51b5"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
              justifyContent="center"
            />
          )}
        </Loader>
        {this.state.items.length > 0 && <LoadMoreBtn onClick={this.loadMore} />}
      </Container>
    );
  }
}
