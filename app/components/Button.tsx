import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';

import Colors from '../config/Colors';

export interface ButtonProps {
  variant: 'default' | 'primary' | 'alt' | 'borderless';
  label: string;
  onPress?: () => void;
  transform?: 'uppercase';
}

const Button = observer(function ({
  label,
  onPress,
  variant,
  transform,
}: ButtonProps): JSX.Element | null {
  const backgroundColor =
    variant === 'primary' ? Colors.primary : Colors.inactive;
  const color =
    variant === 'primary'
      ? Colors.white
      : variant === 'alt'
      ? Colors.primary
      : variant === 'borderless'
      ? Colors.primary
      : Colors.black;

  const textTransform = transform === 'uppercase' ? 'uppercase' : 'none';

  const alternative =
    variant === 'alt'
      ? {
          backgroundColor: '#00000000',
          borderColor: Colors.primary,
          borderWidth: 2,
        }
      : variant === 'borderless'
      ? {
          backgroundColor: '#00000000',
        }
      : {
          backgroundColor,
        };

  return (
    <View style={[styles.control, alternative]}>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple('#33333333', true)}
        {...{ onPress }}>
        <View style={[styles.container]}>
          <Text style={[styles.label, { color, textTransform }]}>{label}</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderColor: '#000',
    height: 50,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  control: {
    borderRadius: 15,
    overflow: 'hidden',
    width: 250,
  },
  label: {
    fontFamily: 'TitilliumSB',
    fontSize: 15,
    textAlign: 'center',
  },
});

export default Button;
