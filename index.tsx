import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Colors = {
  black: '#000000',
  empty: 'transparent',
  red: '#FF0000',
  white: '#FFFFFF',
};

export function MainScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <View style={styles.content}>
        <Text>Open MainScreen.js to start working on your app!</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    ...Platform.select({
      android: {
        flex: 1,
      },
      ios: {
        backgroundColor: Colors.empty,
        flex: 1,
      },
    }),
  },
});
