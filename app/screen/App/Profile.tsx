import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { StyleSheet, View } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';

import { MenuCard, Screen, Text } from '../../components';
import { useStore } from '../../store/rootStore';
import { AppRoutes, StackNavigationProps } from '../../navigation';

const Profile = observer(function ({
  navigation,
}: StackNavigationProps<AppRoutes, 'Profile'>): JSX.Element | null {
  const { uiState, userStore } = useStore();
  const color = uiState.getTheme();

  useEffect(() => {
    userStore.setUser();
  }, []);

  return (
    <Screen>
      <View style={styles.container}>
        <View style={[styles.header, { flex: 0.12 }]}>
          <Text variant="headerSB">Account</Text>
        </View>
        <View style={[styles.body]}>
          <View style={[styles.nameContainer]}>
            <View style={[styles.profile, { backgroundColor: color.red }]}>
              <Icon name="user" size={24} color={color.white} />
            </View>
            <View style={[styles.name]}>
              <Text
                variant="custom"
                style={{
                  color: color.grey,
                  fontSize: 18,
                  textTransform: 'capitalize',
                }}>
                {userStore.userName}
              </Text>
              <Text
                variant="custom"
                style={{
                  color: color.grey,
                  fontSize: 16,
                }}>
                {userStore.userEmail}
              </Text>
            </View>
          </View>
          <View style={styles.cardContainer}>
            <MenuCard title="Add account" icon="user-plus" />
            <MenuCard title="Manage accounts" icon="users" />
          </View>
          <View style={styles.settings}>
            <MenuCard
              title="Settings"
              icon="settings"
              onPress={() => navigation.navigate('Settings')}
            />
          </View>
          <View
            style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}
          />
        </View>
      </View>
    </Screen>
  );
});

const styles = StyleSheet.create({
  body: {
    flex: 0.88,
    padding: 20,
  },
  cardContainer: {
    marginTop: 50,
  },
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  name: {
    marginLeft: 20,
  },
  nameContainer: {
    flexDirection: 'row',
  },
  profile: {
    alignItems: 'center',
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
    overflow: 'hidden',
    width: 50,
  },
  profileDetails: {
    fontSize: 20,
  },
  settings: {
    marginTop: 50,
  },
});

export default Profile;
