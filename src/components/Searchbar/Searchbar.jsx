import { Formik } from 'formik';
import PropTypes from 'prop-types';
import {
  Header,
  FormWrap,
  Input,
  FormBtn,
  FormBtnLabel,
} from './Searchbar.styled';
import { ReactComponent as SearchIcon } from 'icons/search.svg';

const initialValues = {
  query: '',
};

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = ({ query }, { resetForm }) => {
    if (!query) {
      return alert('пусто');
    }
    onSubmit(query);
    resetForm();
  };

  return (
    <Header>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <FormWrap>
          <FormBtn type="submit">
            <SearchIcon width="20" height="20" />
            <FormBtnLabel>Search</FormBtnLabel>
          </FormBtn>
          <Input
            type="text"
            name="query"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </FormWrap>
      </Formik>
    </Header>
  );
};

Searchbar.propTypes = {
  getImages: PropTypes.func,
};
