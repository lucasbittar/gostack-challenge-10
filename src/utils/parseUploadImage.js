import {Platform} from 'react-native';

export default function parseUploadImage(imageObj) {
  const {url, path} = imageObj;

  return Platform.OS === 'ios' ? url : `http://192.168.0.6:3333/files/${path}`;
}
