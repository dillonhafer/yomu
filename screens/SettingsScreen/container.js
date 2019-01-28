import { connect } from "react-redux";
import { updateSettings } from "app/actions/settings";
import SettingsScreen from "./SettingsScreen";

const mapStateToProps = state => {
  return { settings: state.settings };
};

const mapDispatchToProps = dispatch => ({
  updateSettings: settings => dispatch(updateSettings(settings))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsScreen);
