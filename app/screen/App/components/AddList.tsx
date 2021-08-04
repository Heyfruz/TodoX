import React from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { observer } from 'mobx-react';

import { AppInput, Item, Text } from '../../../components';
import { useStore } from '../../../store/rootStore';
import { picker } from '../../../config/Colors';
import { usePicker } from '../../../hooks';

interface AddListProps {
  visible: boolean;
  onPress: () => void;
  onBackgroundPress: () => void;
}

const AddList = observer(function ({
  visible,
  onPress,
  onBackgroundPress,
}: AddListProps): JSX.Element | null {
  const { uiState } = useStore();
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

  return (
    <Modal
      visible={visible}
      statusBarTranslucent
      transparent
      animationType="fade">
      <TouchableWithoutFeedback
        onPress={onBackgroundPress}
        // onPress={() => {
        //   setVisible(false);
        //   setValue('');
        //   setSelectedColor('Grey');
        //   setColorCode('#61656C');
        //   setSelected(undefined);
        // }}
      >
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
              <Text variant="semibold">New List</Text>
            </View>
            <AppInput
              placeholder="Create list"
              code={colorCode}
              value={value}
              onChangeText={text => setValue(text)}
            />
            <View style={{ alignSelf: 'center', padding: 5 }}>
              <Text variant="picker" style={{ color: colorCode }}>
                {selectedColor}
              </Text>
            </View>
            <View style={styles.item}>
              {picker.map(({ code, name }, index) => {
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
                  onPress={onPress}
                  // onPress={() => {
                  //   if (value === '') return;
                  //   appStore.createList(value, colorCode);
                  //   setVisible(false);
                  //   setValue('');
                  //   setSelectedColor('Grey');
                  //   setColorCode('#61656C');
                  //   setSelected(undefined);
                  // }}
                >
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
  item: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 10,
  },
});

export default AddList;
