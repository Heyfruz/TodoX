import React from 'react';
import { Image, StyleSheet, View } from 'react-native';

import { width } from '../../../config/Constants';

interface SlideProps {
  image: number;
  index: number;
}

function Slide({ image, index }: SlideProps): JSX.Element | null {
  return (
    <View style={[styles.container, { backgroundColor: `#333333${index}0` }]}>
      <View style={styles.underlay}>
        <Image source={image} style={styles.image} resizeMode="center" />
      </View>
    </View>
  );
}

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
