import React, { ComponentProps } from 'react';
import { observer } from 'mobx-react';
import {
  ColorValue,
  StyleSheet,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';

import Text from './Text';

interface MenuCardProps {
  title: string;
  icon?: ComponentProps<typeof Icon>['name'];
  onPress?: () => void;
  color?: ColorValue;
  component?: React.ReactNode;
  onLongPress?: () => void;
}

const MenuCard = observer(function ({
  title,
  icon,
  onPress,
  onLongPress,
  component,
  color = 'blue',
}: MenuCardProps): JSX.Element | null {
  return (
    <TouchableNativeFeedback
      delayPressIn={300}
      delayPressOut={0}
      onLongPress={onLongPress}
      {...{ onPress }}>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.icon}>
            {component && <View>{component}</View>}
            {icon && <Icon name={icon} size={22} color={color} />}
          </View>
          <Text variant="custom" style={[styles.text, { color }]}>
            {title}
          </Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingLeft: 20,
    width: '100%',
  },
  icon: {
    marginRight: 20,
  },
  text: {
    fontSize: 18,
  },
});

export default MenuCard;
