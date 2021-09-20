import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import {
  FlatList,
  StyleSheet,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import { HeaderBackButton } from '@react-navigation/stack';
import { Feather as Icon } from '@expo/vector-icons';

import { AppRoutes, StackNavigationProps } from '../../navigation';
import { Input, Text } from '../../components';
import { year } from '../../config/Constants';
import { usePicker } from '../../hooks';
import { useStore } from '../../store/rootStore';

const Step = observer(function ({
  navigation,
  route,
}: StackNavigationProps<AppRoutes, 'Step'>): JSX.Element | null {
  const { uiState, appStore } = useStore();
  const color = uiState.getTheme();

  const task = route.params;
  const steps = task.steps;
  const time = task.date;

  const { value, setValue } = usePicker();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderBackButton
          onPress={() => {
            navigation.goBack();
          }}
          tintColor={task.color as string}
        />
      ),
      headerTitle: () => (
        <Text variant="headerCustom" style={{ color: task.color }}>
          {task?.title}
        </Text>
      ),
    });
  }, []);

  const handleSubmit = (): void => {
    if (value === '') return;
    appStore.createStep(steps, value);
    setValue('');
    console.log(task);
  };

  function footer(): JSX.Element {
    return (
      <View style={styles.listComponent}>
        <Text variant="regular">
          Created on {time.day?.slice(0, 3)}, {time.date} {time.month},
          {time.year === year ? '' : ` ${time.year},`} {time.hour}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <FlatList
          data={steps.slice(1)}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <View>
                <Text variant="custom" style={{ color: task.color }}>
                  {item.title}
                </Text>
              </View>
            );
          }}
          ListFooterComponent={footer}
        />
        <View />
      </View>
      <View style={styles.footer}>
        <View style={{ flex: 0.87 }}>
          <Input
            value={value}
            onChangeText={text => setValue(text)}
            placeholder="Add Step"
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
    padding: 20,
  },
  container: {
    flex: 1,
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    width: '100%',
  },
  listComponent: {
    paddingTop: 100,
  },
});

export default Step;
