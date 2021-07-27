import React from 'react';
import { observer } from 'mobx-react';
import { ScrollView, StyleSheet, Switch, View } from 'react-native';
import Constants from 'expo-constants';

import { MenuCard, Text } from '../../components';
import { useStore } from '../../store/rootStore';

const Setting = observer(function (): JSX.Element | null {
  const { uiState, authStore } = useStore();
  //NOTE: Changing of the them can be advanced by adding the option to use the system default theme. This can be done using the appearance api from react native. The switch component will be replace by a modal picker.
  const color = uiState.getTheme();

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text variant="bold" style={{ textTransform: 'uppercase' }}>
          General
        </Text>
        <View style={styles.cardContainer}>
          <MenuCard
            title={`Theme (${uiState.theme})`}
            component={
              <Switch
                trackColor={{
                  false: color.grey,
                  true: `${color.primary.toString()}50`,
                }}
                thumbColor={uiState.enabled ? color.primary : '#f4f3f4'}
                onValueChange={() => uiState.setEnabled()}
                value={uiState.enabled}
              />
            }
          />
        </View>
        <Text variant="bold" style={{ textTransform: 'uppercase' }}>
          Notifications
        </Text>
        <View style={styles.cardContainer}>
          <MenuCard
            title="Reminder"
            component={
              <Switch
                trackColor={{
                  false: color.grey,
                  true: `${color.primary.toString()}50`,
                }}
                thumbColor={uiState.enabled ? color.primary : '#f4f3f4'}
              />
            }
          />
        </View>
        <Text variant="bold" style={{ textTransform: 'uppercase' }}>
          Help & Feedback
        </Text>
        <View style={styles.cardContainer}>
          <MenuCard title="Suggest a feature" />
          <MenuCard title="Get support" />
          <MenuCard title="Sync" />
        </View>
        <Text variant="bold" style={{ textTransform: 'uppercase' }}>
          About
        </Text>
        <View style={styles.cardContainer}>
          <MenuCard title="Privacy" />
          <MenuCard title="Terms & Conditions" />
          <MenuCard
            title="Version"
            description={Constants.nativeAppVersion as string}
          />
        </View>
        <View style={styles.cardContainer}>
          <MenuCard
            title="Log out"
            icon="log-out"
            onPress={() => authStore.logout()}
          />
        </View>
      </View>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: 10,
  },
  container: {
    flex: 1,
    padding: 20,
  },
});

export default Setting;
