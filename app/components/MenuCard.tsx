import React, { ComponentProps } from 'react';
import { observer } from 'mobx-react';
import {
  ColorValue,
  StyleSheet,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';

import { useStore } from '../store/rootStore';

import Text from './Text';

interface MenuCardProps {
  title: string;
  icon?: ComponentProps<typeof Icon>['name'];
  onPress?: () => void;
  component?: React.ReactNode;
  description?: string;
  color?: ColorValue;
}

const MenuCard = observer(function ({
  title,
  icon,
  onPress,
  component,
  description,
}: MenuCardProps): JSX.Element | null {
  const { uiState } = useStore();
  const color = uiState.getTheme();

  return (
    <TouchableNativeFeedback {...{ onPress }}>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          {icon && (
            <Icon
              name={icon}
              size={22}
              style={styles.icon}
              color={color.textColor}
            />
          )}
          <Text variant="regular">{title}</Text>
        </View>
        {component && <View>{component}</View>}
        {description && (
          <Text
            variant="custom"
            style={{ color: color.grey, fontSize: 14, marginRight: 10 }}>
            {description}
          </Text>
        )}
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
    paddingLeft: 30,
    width: '100%',
  },
  icon: {
    marginRight: 20,
  },
});

export default MenuCard;
