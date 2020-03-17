import React, {useCallback, useState, useEffect, useRef} from 'react';
import {format} from 'date-fns';
import {useDispatch, useSelector} from 'react-redux';
import {StatusBar, ActivityIndicator, Platform} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {RNCamera} from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {orderUpdateRequest} from '~/store/modules/order/actions';
import {statusbarUpdateColor} from '~/store/modules/statusbar/actions';

import api from '~/services/api';

import {
  Container,
  ColorStrip,
  OrderDetailsCard,
  OrderDetailsContainer,
} from '~/pages/OrderDetails/styles';

import {SubmitButton, SubmitButtonText} from '~/components/Layout';
import {
  CameraContainer,
  TakePictureButton,
  SignatureCamera,
  PreviewSignature,
} from './styles';

export default function OrderConfirm({route, navigation}) {
  const {order} = route.params;
  const [signature_id, setSignatureId] = useState(null);
  const [signatureImage, setSignatureImage] = useState(null);
  const loading = useSelector(state => state.order.loading);
  const success = useSelector(state => state.order.success);
  const camera = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      navigation.goBack();
    }
  }, [success]);

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('light-content');
      Platform.OS === 'android' && StatusBar.setBackgroundColor('#7d40e7');
      dispatch(statusbarUpdateColor('#7d40e7'));
    }, []),
  );

  function handleSubmit() {
    const orderParams = {
      id: order.id,
      deliveryman_id: order.deliveryman_id,
      signature_id,
    };
    dispatch(orderUpdateRequest('confirm', orderParams));
  }

  async function takePicture() {
    if (camera.current) {
      const options = {quality: 0.8, base64: false};
      const data = await camera.current.takePictureAsync(options);
      const fileName = `signature-${format(
        new Date(),
        'MMddyyyyhhkkmmss',
      )}.jpg`;
      const signature = {
        uri: data.uri,
        type: 'image/jpeg',
        name: fileName,
      };
      const file = new FormData();
      file.append('file', signature);
      const response = await api.post('/upload', file);
      const signatureUrl =
        Platform.OS === 'ios'
          ? response.data.url
          : `http://192.168.0.6:3333/files/${response.data.path}`;
      setSignatureImage(signatureUrl);
      setSignatureId(response.data.id);
    }
  }

  return (
    <Container>
      <ColorStrip />
      <OrderDetailsContainer>
        {signature_id === null ? (
          <CameraContainer>
            <SignatureCamera
              captureAudio={false}
              ref={camera}
              type={RNCamera.Constants.Type.back}
            />
            <TakePictureButton onPress={takePicture}>
              <Icon name="photo-camera" color="#FFF" size={26} />
            </TakePictureButton>
          </CameraContainer>
        ) : (
          <>
            <OrderDetailsCard>
              <PreviewSignature source={{uri: signatureImage}} />
            </OrderDetailsCard>
            <SubmitButton
              loading={loading}
              onPress={handleSubmit}
              color="#7d40e7">
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <SubmitButtonText>Confirm Delivery</SubmitButtonText>
              )}
            </SubmitButton>
          </>
        )}
      </OrderDetailsContainer>
    </Container>
  );
}
