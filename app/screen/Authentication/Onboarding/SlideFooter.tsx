import { observer } from 'mobx-react';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '../../../components';
import Colors from '../../../config/Colors';
import { useStore } from '../../../store/rootStore';

interface SlideFooterProps {
  title: string;
  description: string;
  last?: boolean;
  onPress: () => void;
}

const SlideFooter = observer(function ({
  description,
  title,
  last,
  onPress,
}: SlideFooterProps): JSX.Element | null {
  const { uiState } = useStore();
  const color = uiState.getTheme();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text
        style={[
          styles.description,
          {
            color: color.textColor,
          },
        ]}>
        {description}
      </Text>
      <Button
        label={last ? "Let's Begin" : 'Next'}
        variant={last ? 'primary' : 'default'}
        {...{ onPress }}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 40,
  },
  description: {
    color: Colors.dark,
    fontFamily: 'Titillium',
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
  },
  title: {
    color: Colors.primary,
    fontFamily: 'TitilliumBD',
    fontSize: 24,
    marginBottom: 20,
    textTransform: 'uppercase',
  },
});

export default SlideFooter;
