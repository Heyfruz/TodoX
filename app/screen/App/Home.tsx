import React from 'react';
import { observer } from 'mobx-react';
import {
  ScrollView,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';

import { Card, Screen, Text } from '../../components';
import { date, day, height, month } from '../../config/Constants';
import { useStore } from '../../store/rootStore';
import { AppRoutes, StackNavigationProps } from '../../navigation';

import { GroupModal, ListModal, LongPress } from './Modals';

const Home = observer(function ({
  navigation,
}: StackNavigationProps<AppRoutes, 'Home'>): JSX.Element | null {
  const { uiState, appStore } = useStore();
  const appData = appStore.appDefault;
  const userData = appStore.user;
  const color = uiState.getTheme();

  console.log(userData);

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
                    // console.log('onPress');
                  }}
                />
              ))}
            </View>
            <View style={styles.userData}>
              {userData.map(item => {
                return (
                  <Card
                    key={item.id}
                    title={item.title}
                    icon={item.icon}
                    color={item.color}
                    onLongPress={() => {
                      uiState.toggleLongPress();
                    }}
                    onPress={() => {
                      if (item.type === 'group') return;
                      navigation.navigate('Task', { item });
                    }}
                  />
                );
              })}
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={styles.footer}>
        <TouchableNativeFeedback
          onPress={() => {
            uiState.toggleVisible();
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
            uiState.toggleGroup();
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
      <ListModal />
      <LongPress />
      <GroupModal />
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
