import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { StyleSheet, TouchableNativeFeedback, View } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';

import { AppRoutes, StackNavigationProps } from '../../navigation';
import { Text } from '../../components';
import { useStore } from '../../store/rootStore';

const Task = observer(function ({
  navigation,
  route,
}: StackNavigationProps<AppRoutes, 'Task'>): JSX.Element | null {
  const { item } = route.params;
  const { uiState } = useStore();
  const color = uiState.getTheme();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Text variant="headerSB">{item?.title}</Text>,
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View />
      </View>
      <View style={styles.footer}>
        <TouchableNativeFeedback
          onPress={() => {
            uiState.toggleVisible();
          }}>
          <View style={[styles.footerComponent]}>
            <Text style={{ color: color.grey, paddingLeft: 10 }}>
              Create Task
            </Text>
            <Icon
              name="plus"
              size={24}
              color={color.grey}
              style={{ paddingLeft: 10 }}
            />
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#fff',
    flex: 1,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    // height: 50,
    justifyContent: 'space-between',
  },
  footerComponent: {
    alignItems: 'center',
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    width: '100%',
  },
});

export default Task;
