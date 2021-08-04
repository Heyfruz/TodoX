import React from 'react';
import { observer } from 'mobx-react';
import {
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';

import { AppInput, Card, Item, Screen, Text } from '../../components';
import { date, day, height, month } from '../../config/Constants';
import { useStore } from '../../store/rootStore';
import { AppRoutes, StackNavigationProps } from '../../navigation';
import { picker } from '../../config/Colors';
import { usePicker } from '../../hooks';

const Home = observer(function ({
  navigation,
}: StackNavigationProps<AppRoutes, 'Home'>): JSX.Element | null {
  const { uiState, appStore } = useStore();
  const appData = appStore.appDefault;
  const userData = appStore.list;
  const color = uiState.getTheme();

  const {
    selected,
    selectedColor,
    visible,
    setSelected,
    setSelectedColor,
    setVisible,
    setColorCode,
    colorCode,
    value,
    setValue,
  } = usePicker();

  return (
    <Screen>
      <View style={styles.container}>
        <View style={[styles.header, { height: height * 0.12 }]}>
          <View>
            <Text variant="headerMedium">
              {month} {date}
            </Text>
            <Text variant="headerSB" style={{ lineHeight: 30 }}>
              {day}
            </Text>
          </View>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate('Profile');
            }}>
            <View style={[styles.profile, { backgroundColor: color.red }]}>
              <Icon name="user" size={20} color={color.white} />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <ScrollView>
          <View style={styles.body}>
            <View style={styles.defaultData}>
              {appData.map(item => (
                <Card
                  key={item.id}
                  title={item.title}
                  icon={item.icon}
                  color={item.color}
                  onPress={() => {
                    console.log('onPress');
                  }}
                />
              ))}
            </View>
            <View style={styles.userData}>
              {userData.map(item => (
                <Card
                  key={item.id}
                  title={item.title}
                  icon={item.icon}
                  color={item.color}
                  onPress={() => {
                    navigation.navigate('Task', { item });
                  }}
                />
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <TouchableNativeFeedback
          onPress={() => {
            setVisible(true);
          }}>
          <View
            style={[
              styles.footerComponent,
              {
                flex: 0.9,
              },
            ]}>
            <Icon
              name="file-plus"
              size={24}
              color={color.grey}
              style={{ paddingLeft: 10 }}
            />
            <Text style={{ color: color.grey, paddingLeft: 10 }}>
              Add new list
            </Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          onPress={() => {
            console.log('Pressed');
          }}>
          <View
            style={[
              styles.footerComponent,
              {
                flex: 0.1,
                justifyContent: 'center',
              },
            ]}>
            <Icon name="folder-plus" size={24} color={color.grey} />
          </View>
        </TouchableNativeFeedback>
      </View>
      <Modal
        visible={visible}
        statusBarTranslucent
        transparent
        animationType="fade">
        <TouchableWithoutFeedback
          onPress={() => {
            setVisible(false);
            setValue('');
            setSelectedColor('Grey');
            setColorCode('#61656C');
            setSelected(undefined);
          }}>
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: color.black,
              opacity: 0.5,
            }}
          />
        </TouchableWithoutFeedback>
        <View
          style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
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
                    onPress={() => {
                      if (value === '') return;
                      appStore.createList(value, colorCode);
                      setVisible(false);
                      setValue('');
                      setSelectedColor('Grey');
                      setColorCode('#61656C');
                      setSelected(undefined);
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
    </Screen>
  );
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 10,
  },
  container: {
    flex: 1,
  },
  defaultData: {},
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
  },
  footerComponent: {
    alignItems: 'center',
    flexDirection: 'row',
    height: '100%',
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  item: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 10,
  },
  profile: {
    alignItems: 'center',
    borderRadius: 10,
    height: 30,
    justifyContent: 'center',
    overflow: 'hidden',
    width: 30,
  },
  userData: {
    marginTop: 40,
  },
});

export default Home;
