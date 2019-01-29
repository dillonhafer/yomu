import {
  BOOK_ADDED,
  BOOKS_LOADED,
  BOOK_UPDATED,
  LOG_PAGES,
  LOAD_BOOKS,
  BOOK_DELETED,
} from '../constants/action-types';

const initialState = {
  books: [],
  readingLogs: [],
  booksLoading: true,
};

export default function booksState(state = initialState, action) {
  switch (action.type) {
    case LOG_PAGES:
      return { ...state, readingLogs: [...state.readingLogs, action.log] };
    case LOAD_BOOKS:
      return {
        ...state,
        booksLoading: true,
      };
    case BOOK_DELETED:
      return {
        ...state,
        books: state.books.filter(b => b.isbn !== action.book.isbn),
      };
    case BOOK_ADDED:
      return {
        ...state,
        books: [...state.books, action.book],
      };
    case BOOK_UPDATED:
      return {
        ...state,
        books: state.books.map(b => {
          if (b.isbn === action.book.isbn) {
            return action.book;
          }
          return b;
        }),
      };
    case BOOKS_LOADED:
      return {
        ...state,
        books: action.books,
        booksLoading: false,
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}
