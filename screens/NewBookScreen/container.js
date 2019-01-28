import { connect } from "react-redux";
import { addBook } from "app/actions/books";
import NewBookScreen from "./NewBookScreen";

const mapStateToProps = state => {
  return {
    books: state.books.books
  };
};

const mapDispatchToProps = dispatch => ({
  addBook: book => dispatch(addBook(book))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewBookScreen);
