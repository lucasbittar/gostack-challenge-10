import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {ActivityIndicator} from 'react-native';

import {
  Container,
  Form,
  Input,
  SubmitButton,
  SubmitButtonText,
  Logo,
} from './styles';

import {loginRequest} from '~/store/modules/auth/actions';

export default function Login() {
  const [deliveryman_id, setDeliverymanId] = useState('');

  const loading = useSelector(state => state.auth.loading);

  const dispatch = useDispatch();

  function handleSubmit() {
    dispatch(loginRequest(deliveryman_id));
  }

  function handleInputChange(text) {
    setDeliverymanId(text);
  }

  return (
    <Container>
      <Logo />
      <Form>
        <Input
          autoCorrect={false}
          autoCapitaliza="none"
          placeholder="Type in your ID"
          returnKeyType="send"
          value={deliveryman_id}
          onChangeText={text => handleInputChange(text)}
        />
        <SubmitButton loading={loading} onPress={handleSubmit}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <SubmitButtonText>Access Dashboard</SubmitButtonText>
          )}
        </SubmitButton>
      </Form>
    </Container>
  );
}
