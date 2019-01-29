import { connect } from 'react-redux';
import { logPages } from 'app/actions/books';
import LogPagesReadScreen from './LogPagesReadScreen';

const mapStateToProps = state => {
  return {
    books: state.books.books,
    readingLogs: state.books.readingLogs,
    pageGoal: state.settings.pageGoal,
    reminderTime: state.settings.reminderTime,
    reminderEnabled: state.settings.reminderEnabled,
  };
};

const mapDispatchToProps = dispatch => ({
  logPages: log => dispatch(logPages(log)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LogPagesReadScreen);
