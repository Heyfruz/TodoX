import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { StyleSheet, View } from 'react-native';

import { AppRoutes, StackNavigationProps } from '../../navigation';

const Task = observer(function ({
  route,
}: StackNavigationProps<AppRoutes, 'Task'>): JSX.Element | null {
  const { item } = route.params;
  console.log(item?.addTask);

  useEffect(() => {
    // item?.createList('Steam');
    console.log(item);
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <View />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export default Task;
