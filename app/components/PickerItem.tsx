import React from 'react';
import {
  ColorValue,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

interface PickerItemProps {
  code: ColorValue;
  onPress?: () => void;
  index?: number;
  id?: number;
}

function PickerItem({
  code,
  onPress,
  id,
  index,
}: PickerItemProps): JSX.Element | null {
  return (
    <TouchableWithoutFeedback {...{ onPress }}>
      <View
        style={[
          styles.container,
          id === index ? { borderColor: code, borderWidth: 2 } : null,
        ]}>
        <View style={[styles.item, { backgroundColor: code }]} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: 2,
  },
  item: {
    borderRadius: 12,
    height: 24,
    width: 24,
  },
});

export default PickerItem;
