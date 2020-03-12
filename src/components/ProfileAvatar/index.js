import React from 'react';

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

export default function ProfileAvatar({profile}) {
  const {name, avatar} = profile;
  return (
    <Container>
      {avatar !== null ? (
        <AvatarPicture source={{uri: avatar.url}} />
      ) : (
        <Initials>
          <InitialsText>{initials(name)}</InitialsText>
        </Initials>
      )}
    </Container>
  );
}
