import { UPDATE_SETTINGS } from "app/constants/action-types";

const initialState = {
  pageGoal: 10,
  reminderEnabled: true,
  reminderTime: new Date()
};

export default function settingState(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SETTINGS:
      return { ...action.settings };
    default:
      return state;
  }
}
