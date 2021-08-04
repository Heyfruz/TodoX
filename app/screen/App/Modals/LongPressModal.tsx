import React from 'react';
import { observer } from 'mobx-react';
import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { useStore } from '../../../store/rootStore';
import { height } from '../../../config/Constants';

const LongPressModal = observer(function (): JSX.Element | null {
  const { uiState } = useStore();
  const color = uiState.getTheme();

  return (
    <Modal
      visible={uiState.longPress}
      statusBarTranslucent
      transparent
      animationType="slide">
      <View style={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => {
            uiState.toggleLongPress();
          }}>
          <View style={[styles.background, { backgroundColor: color.black }]} />
        </TouchableWithoutFeedback>
        <View
          style={[
            styles.modal,
            { backgroundColor: `${color.altBG as string}` },
          ]}>
          <View />
        </View>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0,
  },
  container: {
    flex: 1,
    flexDirection: 'column-reverse',
  },
  modal: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    height: height * 0.4,
  },
});

export default LongPressModal;
