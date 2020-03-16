import React, {useCallback, useState, useEffect, useRef} from 'react';
import {format} from 'date-fns';
import {useDispatch, useSelector} from 'react-redux';
import {StatusBar, ActivityIndicator} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {RNCamera} from 'react-native-camera';

import {orderUpdateRequest} from '~/store/modules/order/actions';

import api from '~/services/api';

import {
  Container,
  ColorStrip,
  OrderDetailsContainer,
} from '~/pages/OrderDetails/styles';

import {SubmitButton, SubmitButtonText} from '~/components/Layout';
import {OrderDetailsCard, SignatureCamera} from './styles';

export default function OrderConfirm({route, navigation}) {
  const {order} = route.params;
  const [signature_id, setSignatureId] = useState(null);
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
      setSignatureId(response.data.id);
    }
  }

  return (
    <Container>
      <ColorStrip />
      <OrderDetailsContainer>
        <OrderDetailsCard>
          <SignatureCamera
            captureAudio={false}
            ref={camera}
            type={RNCamera.Constants.Type.back}
          />
        </OrderDetailsCard>
        {signature_id !== null ? (
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
        ) : (
          <SubmitButton onPress={takePicture} color="#7d40e7">
            <SubmitButtonText>Get Signature</SubmitButtonText>
          </SubmitButton>
        )}
      </OrderDetailsContainer>
    </Container>
  );
}
