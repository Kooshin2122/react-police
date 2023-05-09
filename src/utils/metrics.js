import { Dimensions, Platform } from 'react-native';

const IS_ANDROID = Platform.OS === 'android';
const { height, width } = Dimensions.get('window');

export default {
  ANDROID_STATUSBAR: 24,
  deviceHeight: height,
  deviceWidth: width,
  onePercentWidth: (width - 56) / 100,
  onePercentHeigh: (height - 56) / 100,
};
