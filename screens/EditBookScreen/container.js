import { connect } from 'react-redux';
import { updateBook, deleteBook } from 'app/actions/books';
import EditBookScreen from './EditBookScreen';

const mapStateToProps = state => {
  return {
    books: state.books.books,
  };
};

const mapDispatchToProps = dispatch => ({
  updateBook: book => dispatch(updateBook(book)),
  deleteBook: book => dispatch(deleteBook(book)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditBookScreen);
