import { observer } from 'mobx-react';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { width } from '../../../config/Constants';
import { useStore } from '../../../store/rootStore';

interface SlideProps {
  image: number;
  index: number;
}

const Slide = observer(function ({ image }: SlideProps): JSX.Element | null {
  const { uiState } = useStore();
  const color = uiState.getTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: color.backgroundColor }]}>
      <View style={styles.underlay}>
        <Image source={image} style={styles.image} resizeMode="center" />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    height: undefined,
    width: undefined,
  },
  underlay: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export default Slide;
