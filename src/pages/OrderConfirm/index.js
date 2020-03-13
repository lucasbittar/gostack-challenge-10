import React, {useCallback, useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {StatusBar, ActivityIndicator} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import {orderUpdateRequest} from '~/store/modules/order/actions';

import {
  Container,
  ColorStrip,
  OrderDetailsContainer,
  OrderDetailsCard,
} from '~/pages/OrderDetails/styles';

import {SubmitButton, SubmitButtonText} from '~/components/Layout';

export default function OrderConfirm({route, navigation}) {
  const {order} = route.params;
  const loading = useSelector(state => state.order.loading);
  const success = useSelector(state => state.order.success);

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
      signature_id: 5,
    };
    dispatch(orderUpdateRequest('confirm', orderParams));
  }

  return (
    <Container>
      <ColorStrip />
      <OrderDetailsContainer>
        <OrderDetailsCard />
        <SubmitButton loading={loading} onPress={handleSubmit} color="#7d40e7">
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <SubmitButtonText>Send</SubmitButtonText>
          )}
        </SubmitButton>
      </OrderDetailsContainer>
    </Container>
  );
}
