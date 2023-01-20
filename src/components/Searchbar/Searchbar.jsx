import { Formik } from 'formik';
import PropTypes from 'prop-types';
import toast, { Toaster } from 'react-hot-toast';

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

export const Searchbar = ({ onSubmit, isSubmiting }) => {
  const handleSubmit = ({ query }, { resetForm }) => {
    if (!query) {
      return toast.error('Empty search');
    }
    onSubmit(query);
    resetForm();
  };

  return (
    <Header>
      <Toaster position="top-right" reverseOrder={false} />
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <FormWrap>
          <FormBtn type="submit" disabled={isSubmiting}>
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
  onSubmit: PropTypes.func.isRequired,
  isSubmiting: PropTypes.bool.isRequired,
};
