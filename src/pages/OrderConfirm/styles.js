import styled from 'styled-components/native';
import {RNCamera} from 'react-native-camera';
import {Platform} from 'react-native';

export const TakePictureButton = styled.TouchableOpacity`
  background: #7159c1;
  position: absolute;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  bottom: ${Platform.OS === 'ios' ? '20px' : '-30px'};
  left: 50%;
  margin-left: -30px;
`;

export const CameraContainer = styled.View`
  border-radius: 4px;
  margin-bottom: ${Platform.OS === 'ios' ? '20px' : '80px'};
  background: #fff;
  shadow-color: #000;
  shadow-offset: 0px 0px;
  shadow-opacity: 0.1;
  shadow-radius: 3px;
  elevation: 2;
  position: relative;
`;

export const SignatureCamera = styled(RNCamera)`
  height: ${Platform.OS === 'ios' ? '400px' : '300px'};
`;

export const PreviewSignature = styled.Image.attrs({
  resizeMode: 'cover',
})`
  width: 100%;
  height: 300px;
  margin-bottom: 20px;
`;
