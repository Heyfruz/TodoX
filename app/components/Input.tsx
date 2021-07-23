import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { useStore } from '../store/rootStore';
import Text from './Text';

interface InputProps {
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  error?: boolean;
}

const Input = observer(function ({
  placeholder,
  value,
  onChangeText,
  error,
  ...props
}: InputProps): JSX.Element | null {
  const { uiState } = useStore();
  const color = uiState.getTheme();

  return (
    <View style={styles.container}>
      <View>
        <Text variant="placeholder">{placeholder}</Text>
      </View>
      <TextInput
        style={[
          styles.input,
          { backgroundColor: color.inputBG },
          error && { borderWidth: 1, borderColor: color.red },
        ]}
        onChangeText={onChangeText}
        value={value}
        {...props}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
    width: '100%',
  },
  input: {
    borderRadius: 10,
    fontFamily: 'Titillium',
    fontSize: 18,
    height: 50,
    marginTop: 10,
    paddingLeft: 20,
  },
  placeholder: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default Input;
