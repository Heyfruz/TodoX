import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { observer } from 'mobx-react';

import { Button, Screen } from '../../components';
import Colors from '../../config/Colors';
import { height } from '../../config/Constants';
import { useStore } from '../../store/rootStore';
import { AuthRoutes, StackNavigationProps } from '../../navigation';

const image = {
  src: require('./Onboarding/images/4.png'),
};

export const assets = [image.src];

const Welcome = observer(function ({
  navigation,
}: StackNavigationProps<AuthRoutes, 'Welcome'>): JSX.Element | null {
  const { uiState } = useStore();
  const color = uiState.getTheme();

  return (
    <Screen>
      <View style={[styles.container]}>
        <View style={styles.header}>
          <Text style={[styles.welcome, { color: color.textColor }]}>
            Welcome to
          </Text>
          <Text style={[styles.logo, { color: color.primary }]}>TodoX</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image source={image.src} style={styles.image} resizeMode="contain" />
        </View>
        <View style={styles.footer}>
          <Button
            label="Sign Up"
            transform="uppercase"
            onPress={() => navigation.navigate('Email')}
            variant="primary"
          />
          <Button
            label="Continue With Google"
            transform="uppercase"
            onPress={() => console.log('pressed')}
            variant="alt"
          />
          <Button
            label="Continue as Guest"
            transform="uppercase"
            onPress={() => console.log('pressed')}
            variant="alt"
          />
          <Button
            label="Log in"
            transform="uppercase"
            onPress={() => navigation.navigate('Login')}
            variant="borderless"
          />
        </View>
      </View>
    </Screen>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  footer: {
    alignItems: 'center',
    height: height * 0.4,
    justifyContent: 'space-around',
    padding: 10,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    height: height * 0.1,
    justifyContent: 'center',
  },
  image: {
    height: undefined,
    width: undefined,
    ...StyleSheet.absoluteFillObject,
  },
  imageContainer: {
    alignItems: 'center',
    height: height * 0.5,
    justifyContent: 'center',
  },
  logo: {
    color: Colors.orange,
    fontFamily: 'Sarpanch',
    fontSize: 36,
  },
  welcome: {
    fontFamily: 'Titillium',
    fontSize: 16,
  },
});

export default Welcome;
