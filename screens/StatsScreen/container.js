import { connect } from "react-redux";
import StatsScreen from "./StatsScreen";

const mapStateToProps = state => {
  return {
    readingLogs: state.books.readingLogs,
    pageGoal: state.settings.pageGoal
  };
};

export default connect(mapStateToProps)(StatsScreen);
