import React, {useCallback, useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {format} from 'date-fns';
import {useFocusEffect} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import {
  Container,
  ColorStrip,
  OrderDetailsContainer,
  OrderDetailsCard,
  OrderDetailsCardHeader,
  OrderDetailsCardHeaderText,
  OrderDetailsCardInfoWrapper,
  OrderDetailsCardInfoTextLarge,
  OrderDetailsCardInfoTextSmall,
  OrderDetailsCardFlex,
  OrderActions,
  OrderActionButton,
  OrderActionButtonText,
} from './styles';

export default function OrderDetails({route, navigation}) {
  const {order} = route.params;
  const {recipient} = order;

  const [totalIssues, setTotalIssues] = useState(0);
  const [issues, setIssues] = useState([]);

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('light-content');
      Platform.OS === 'android' && StatusBar.setBackgroundColor('#7d40e7');

      /* Fetch issues everytime the view is loaded */
      async function fetchOrderIssues() {
        const response = await api.get(`/order/${order.id}/issues`);

        setIssues(response.data);
        setTotalIssues(response.data.length);
      }
      fetchOrderIssues();
    }, []),
  );

  function getStatus(order) {
    const {start_date, end_date} = order;
    if (end_date === null && start_date !== null) return 'In Transit';
    if (end_date === null && start_date === null) return 'Waiting for pickup';
    if (end_date !== null) return 'Delivered';
  }

  return (
    <Container>
      <ColorStrip />
      <OrderDetailsContainer>
        <OrderDetailsCard>
          <OrderDetailsCardHeader>
            <Icon name="local-shipping" color="#7d40e7" size={21} />
            <OrderDetailsCardHeaderText>
              Order Information
            </OrderDetailsCardHeaderText>
          </OrderDetailsCardHeader>
          <OrderDetailsCardInfoWrapper>
            <OrderDetailsCardInfoTextLarge>
              Recipient
            </OrderDetailsCardInfoTextLarge>
            <OrderDetailsCardInfoTextSmall>
              {recipient.name}
            </OrderDetailsCardInfoTextSmall>
          </OrderDetailsCardInfoWrapper>
          <OrderDetailsCardInfoWrapper>
            <OrderDetailsCardInfoTextLarge>
              Address
            </OrderDetailsCardInfoTextLarge>
            <OrderDetailsCardInfoTextSmall>
              {recipient.address}, {recipient.number}
              {recipient.address_2 ? ` - ${recipient.address_2}` : null}
              {'\n'}
              {recipient.city} - {recipient.state} - {recipient.zip_code}
            </OrderDetailsCardInfoTextSmall>
          </OrderDetailsCardInfoWrapper>
          <OrderDetailsCardInfoWrapper>
            <OrderDetailsCardInfoTextLarge>
              Product
            </OrderDetailsCardInfoTextLarge>
            <OrderDetailsCardInfoTextSmall>
              {order.product}
            </OrderDetailsCardInfoTextSmall>
          </OrderDetailsCardInfoWrapper>
        </OrderDetailsCard>
        <OrderDetailsCard>
          <OrderDetailsCardHeader>
            <Icon name="event" color="#7d40e7" size={21} />
            <OrderDetailsCardHeaderText>
              Order Progress
            </OrderDetailsCardHeaderText>
          </OrderDetailsCardHeader>
          <OrderDetailsCardInfoWrapper>
            <OrderDetailsCardInfoTextLarge>
              Status
            </OrderDetailsCardInfoTextLarge>
            <OrderDetailsCardInfoTextSmall>
              {getStatus(order)}
            </OrderDetailsCardInfoTextSmall>
          </OrderDetailsCardInfoWrapper>
          <OrderDetailsCardFlex>
            <OrderDetailsCardInfoWrapper width={60}>
              <OrderDetailsCardInfoTextLarge>
                Picked up on
              </OrderDetailsCardInfoTextLarge>
              <OrderDetailsCardInfoTextSmall>
                {order.start_date
                  ? format(new Date(order.start_date), 'MM/dd/yyyy')
                  : '--/--/--'}
              </OrderDetailsCardInfoTextSmall>
            </OrderDetailsCardInfoWrapper>
            <OrderDetailsCardInfoWrapper>
              <OrderDetailsCardInfoTextLarge>
                Delivered on
              </OrderDetailsCardInfoTextLarge>
              <OrderDetailsCardInfoTextSmall>
                {order.end_date
                  ? format(new Date(order.end_date), 'MM/dd/yyyy')
                  : '--/--/--'}
              </OrderDetailsCardInfoTextSmall>
            </OrderDetailsCardInfoWrapper>
          </OrderDetailsCardFlex>
        </OrderDetailsCard>
        {order.end_date === null && (
          <OrderActions>
            <OrderActionButton
              first
              width={totalIssues !== 0 ? 33.3 : 50}
              onPress={() => navigation.navigate('Report Issue', {order})}>
              <Icon name="highlight-off" color="#E74040" size={21} />
              <OrderActionButtonText>Report{'\n'}Issue</OrderActionButtonText>
            </OrderActionButton>
            {totalIssues !== 0 && (
              <OrderActionButton
                middle
                width={33.3}
                onPress={() =>
                  navigation.navigate('List Issues', {order, issues})
                }>
                <Icon name="error-outline" color="#E7BA40" size={21} />
                <OrderActionButtonText>List{'\n'}Issues</OrderActionButtonText>
              </OrderActionButton>
            )}
            <OrderActionButton width={totalIssues !== 0 ? 33.3 : 50}>
              <Icon name="done" color="#7D40E7" size={21} />
              <OrderActionButtonText>
                Confirm{'\n'}Delivery
              </OrderActionButtonText>
            </OrderActionButton>
          </OrderActions>
        )}
      </OrderDetailsContainer>
    </Container>
  );
}
