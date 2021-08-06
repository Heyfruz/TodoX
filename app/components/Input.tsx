import { observer } from 'mobx-react';
import React from 'react';
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';

interface InputProps extends TextInputProps {
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  error?: boolean;
  viewStyle?: ViewStyle;
  textStyle?: TextInputProps['style'];
}

const AppInput = observer(function ({
  placeholder,
  value,
  onChangeText,
  textStyle,
  viewStyle,
  ...props
}: InputProps): JSX.Element | null {
  return (
    <View style={[styles.container, viewStyle]}>
      <TextInput
        style={[styles.input, textStyle]}
        onChangeText={onChangeText}
        value={value}
        placeholder={placeholder}
        placeholderTextColor="#898A8B"
        {...props}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  input: {
    fontFamily: 'Titillium',
    fontSize: 16,
    height: 45,
    paddingLeft: 20,
  },
  placeholder: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default AppInput;
