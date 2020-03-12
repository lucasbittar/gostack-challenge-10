import React from 'react';
import {useDispatch} from 'react-redux';
import {View, Text, TouchableOpacity} from 'react-native';

import {logOut} from '~/store/modules/auth/actions';

export default function Profile() {
  const dispatch = useDispatch();
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Profile</Text>
      <TouchableOpacity onPress={() => dispatch(logOut())}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

