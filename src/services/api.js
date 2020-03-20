import axios from 'axios';
import {Platform} from 'react-native';

// Choose one of the Android options below and comment the one you're not using
// Genymotion: http://10.0.3.2:3333
// const API_URL_GENYMONTION = 'http://10.0.3.2:3333';
// USB: machine's IP
const API_USB = 'http://192.168.0.6:3333';

// Checks whether to use the user's IP address (real device test) or Genymotion's IP (simulator)
const API_URL_ANDROID = API_URL_GENYMONTION || API_USB;
// iOS Simulator: http://localhost:3333
const API_URL_IOS = 'http://localhost:3333';

const api = axios.create({
  baseURL: Platform.OS === 'ios' ? API_URL_IOS : API_URL_ANDROID,
});

export default api;
