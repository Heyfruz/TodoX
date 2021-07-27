import React from 'react';
import { observer } from 'mobx-react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';

import { Screen, Text } from '../../components';
import { date, day, height, month } from '../../config/Constants';
import { useStore } from '../../store/rootStore';
import { AppRoutes, StackNavigationProps } from '../../navigation';

const Home = observer(function ({
  navigation,
}: StackNavigationProps<AppRoutes, 'Home'>): JSX.Element | null {
  const { uiState } = useStore();
  const color = uiState.getTheme();

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
      </View>
    </Screen>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});

export default Home;
