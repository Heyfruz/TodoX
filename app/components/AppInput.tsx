import { observer } from 'mobx-react';
import React from 'react';
import {
  ColorValue,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

import { useStore } from '../store/rootStore';

interface InputProps extends TextInputProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  error?: boolean;
  code: ColorValue;
}

const AppInput = observer(function ({
  placeholder,
  value,
  onChangeText,
  code,
  ...props
}: InputProps): JSX.Element | null {
  const { uiState } = useStore();
  const color = uiState.getTheme();

  return (
    <View style={[styles.container, { borderBottomColor: code }]}>
      <TextInput
        style={[
          styles.input,
          { borderBottomColor: code, color: color.textColor },
        ]}
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
    borderBottomWidth: 1.5,
    marginBottom: 5,
    width: '100%',
  },
  input: {
    fontFamily: 'Titillium',
    fontSize: 16,
    height: 45,
    marginTop: 10,
    paddingLeft: 20,
  },
  placeholder: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default AppInput;
