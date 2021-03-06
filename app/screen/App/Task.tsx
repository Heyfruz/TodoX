import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import {
  ColorValue,
  FlatList,
  StyleSheet,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { HeaderBackButton } from '@react-navigation/stack';

import { AppRoutes, StackNavigationProps } from '../../navigation';
import { Card, Input, Text } from '../../components';
import { useStore } from '../../store/rootStore';
import { usePicker } from '../../hooks';

const Task = observer(function ({
  navigation,
  route,
}: StackNavigationProps<AppRoutes, 'Task'>): JSX.Element | null {
  const { item } = route.params;
  const { uiState, appStore } = useStore();
  const color = uiState.getTheme();
  const tasks = item?.task;
  const itemColor = item?.color as ColorValue;

  const { value, setValue } = usePicker();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderBackButton
          onPress={() => {
            navigation.goBack();
          }}
          tintColor={itemColor as string}
        />
      ),
      headerTitle: () => (
        <Text variant="headerCustom" style={{ color: itemColor }}>
          {item?.title}
        </Text>
      ),
    });
  }, []);

  const handleSubmit = (): void => {
    if (value === '') return;
    appStore.createTask(item?.task, value, itemColor);
    setValue('');
    console.log(item?.task);
  };

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <FlatList
          data={tasks?.slice(1)}
          keyExtractor={task => task.id}
          renderItem={({ item }) => {
            return (
              <Card
                onPress={() => {
                  navigation.navigate('Step', item);
                }}
                color={itemColor}
                title={item.title}
                component={<Icon name="square" size={24} color={itemColor} />}
              />
            );
          }}
        />
      </View>
      <View style={styles.footer}>
        <View style={{ flex: 0.87 }}>
          <Input
            value={value}
            onChangeText={text => setValue(text)}
            placeholder="Create Task"
            textStyle={{ color: color.textColor }}
            onSubmitEditing={handleSubmit}
          />
        </View>
        <TouchableNativeFeedback onPress={handleSubmit}>
          <View
            style={{
              alignItems: 'center',
              flex: 0.13,
              height: '100%',
              justifyContent: 'center',
            }}>
            <Icon name="plus" size={24} color={color.grey} />
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  body: {
    flex: 1,
    width: '100%',
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default Task;
