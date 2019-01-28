import { connect } from "react-redux";
import BooksScreen from "./BooksScreen";

const mapStateToProps = state => {
  return {
    books: state.books.books
  };
};

export default connect(mapStateToProps)(BooksScreen);
