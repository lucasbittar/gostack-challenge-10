import React from 'react';
import {Text, Platform} from 'react-native';

import {Container, AvatarPicture, Initials, InitialsText} from './styles';

const initials = name => {
  const fullNameArray = name.split(' ');
  const firstInitial = fullNameArray[0].split('')[0];
  const hasLastName = fullNameArray.length - 1 !== 0;
  if (hasLastName) {
    const lastInitial = fullNameArray[fullNameArray.length - 1].split('')[0];
    return firstInitial + lastInitial;
  }
  return firstInitial;
};

export default function ProfileAvatar({profile, large = false}) {
  const {name, avatar} = profile;
  const avatarUrl =
    Platform.OS === 'ios'
      ? avatar.url
      : `http://192.168.0.6:3333/files/${avatar.path}`;
  return (
    <Container>
      {avatar !== null ? (
        <AvatarPicture source={{uri: avatarUrl}} large={large} />
      ) : (
        <Initials large={large}>
          <InitialsText large={large}>{initials(name)}</InitialsText>
        </Initials>
      )}
    </Container>
  );
}
