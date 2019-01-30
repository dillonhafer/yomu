import { Dimensions } from 'react-native';
import { Constants } from 'expo';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const isTablet =
  Constants.platform.ios &&
  Constants.platform.ios.userInterfaceIdiom === 'tablet';

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  isTablet,
};
