import React from 'react';
import { Text } from 'react-native';

export default function CustomText({ style, children, ...props }) {
  return (
    <Text
      style={[{ fontFamily: 'Kidmania' }, style]}
      {...props}
    >
      {children}
    </Text>
  );
} 