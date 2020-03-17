import axios from 'axios';
import {Platform} from 'react-native';

// Genymotion: http://10.0.3.2:3333
// const API_URL = 'http://10.0.3.2:3333';
// USB: machine's IP
const API_URL_ANDROID = 'http://192.168.0.6:3333';
// iOS Simulator: http://localhost:3333
const API_URL_IOS = 'http://localhost:3333';

// const API_URL = 'http://localhost:3333';

const api = axios.create({
  baseURL: Platform.OS === 'ios' ? API_URL_IOS : API_URL_ANDROID,
});

export default api;
