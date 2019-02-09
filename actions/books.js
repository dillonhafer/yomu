import {
  BOOKS_LOADED,
  LOAD_BOOKS,
  BOOK_ADDED,
  LOG_PAGES,
  BOOK_DELETED,
  BOOK_UPDATED,
} from 'app/constants/action-types';

export const booksLoaded = books => {
  return {
    type: BOOKS_LOADED,
    books,
  };
};

export const addBook = book => {
  return {
    type: BOOK_ADDED,
    book,
  };
};

export const deleteBook = book => {
  return {
    type: BOOK_DELETED,
    book,
  };
};

export const updateBook = (book, originalISBN) => {
  return {
    type: BOOK_UPDATED,
    book,
    originalISBN,
  };
};

export const logPages = log => {
  return {
    type: LOG_PAGES,
    log,
  };
};

export const loadBooks = () => dispatch => {
  dispatch({
    type: LOAD_BOOKS,
  });

  return new Promise((resolve, reject) => {
    return resolve(dispatch(booksLoaded([])));
  });
};
