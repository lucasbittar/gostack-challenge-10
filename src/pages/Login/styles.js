import {Platform} from 'react-native';
import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

import logo from '../../assets/fastfeet-logo-white.png';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 30px;
  background: #7d40e7;
`;

export const Logo = styled.Image.attrs({
  source: logo,
  resizeMode: 'cover',
})`
  width: 254px;
  height: 42px;
  margin-bottom: 50px;
`;

export const Form = styled.View`
  width: 100%;
`;

export const Input = styled.TextInput.attrs({placeholderTextColor: '#999'})`
  height: 45px;
  margin-bottom: 20px;
  background: #eee;
  font-size: 16px;
  border-radius: 4px;
  padding: 0 15px;
  border: 1px solid #eee;
`;

export const SubmitButton = styled(RectButton)`
  height: 45px;
  justify-content: center;
  align-items: center;
  background: #82bf18;
  border-radius: 4px;
  padding: 0 12px;
`;

export const SubmitButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;
