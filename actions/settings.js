import { UPDATE_SETTINGS } from "app/constants/action-types";

export const updateSettings = settings => {
  return {
    type: UPDATE_SETTINGS,
    settings
  };
};
