import React from 'react';
import { observer } from 'mobx-react';
import {
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { useStore } from '../../../store/rootStore';
import { AppInput, Item, Text } from '../../../components';
import { usePicker } from '../../../hooks';
import { picker } from '../../../config/Colors';

const GroupModal = observer(function (): JSX.Element | null {
  const { uiState, appStore } = useStore();
  const color = uiState.getTheme();

  const {
    selected,
    selectedColor,
    setSelected,
    setSelectedColor,
    setColorCode,
    colorCode,
    value,
    setValue,
  } = usePicker();

  const toggle = (): void => {
    uiState.toggleGroup();
    setValue('');
    setSelectedColor('Grey');
    setColorCode('#61656C');
    setSelected(undefined);
  };

  const handleSubmit = (): void => {
    if (value === '') return;
    appStore.createGroup(value, colorCode);
    toggle();
  };

  return (
    <Modal
      visible={uiState.groupVisible}
      statusBarTranslucent
      transparent
      animationType="fade">
      <TouchableWithoutFeedback
        onPress={() => {
          toggle();
        }}>
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: color.black,
            opacity: 0.5,
          }}
        />
      </TouchableWithoutFeedback>
      <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
        <KeyboardAvoidingView behavior="padding" style={{ width: '85%' }}>
          <View
            style={{
              alignSelf: 'center',
              backgroundColor: color.backgroundColor,
              borderRadius: 10,
              padding: 20,
              width: '100%',
            }}>
            <View>
              <Text variant="semibold">New Group</Text>
            </View>
            <AppInput
              placeholder="Group Name"
              code={colorCode}
              value={value}
              onChangeText={text => setValue(text)}
              onSubmitEditing={() => {
                handleSubmit();
              }}
              returnKeyType="done"
            />
            <View style={{ alignSelf: 'center', padding: 5 }}>
              <Text variant="picker" style={{ color: colorCode }}>
                {selectedColor}
              </Text>
            </View>
            <View style={styles.item}>
              {picker.slice(0, 5).map(({ code, name }, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      padding: 5,
                    }}>
                    <Item
                      index={selected}
                      id={index}
                      code={code}
                      onPress={() => {
                        setSelected(index);
                        setSelectedColor(name);
                        setColorCode(code);
                      }}
                    />
                  </View>
                );
              })}
            </View>

            <View
              style={{
                flexDirection: 'row-reverse',
              }}>
              <View style={{ borderRadius: 5, overflow: 'hidden' }}>
                <TouchableNativeFeedback
                  onPress={() => {
                    handleSubmit();
                  }}>
                  <View
                    style={{
                      backgroundColor: colorCode,
                    }}>
                    <Text
                      style={{
                        color: color.backgroundColor,
                        padding: 5,
                        paddingHorizontal: 10,
                      }}>
                      Create List
                    </Text>
                  </View>
                </TouchableNativeFeedback>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    opacity: 0.2,
  },
  item: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 10,
  },
  modal: {
    padding: 20,
  },
});

export default GroupModal;
