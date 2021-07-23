// import { Formik } from 'formik';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Screen, Text } from '../../components';

interface LoginProps {}

function Login({}: LoginProps): JSX.Element | null {
  return (
    <Screen>
      <View style={styles.container}>
        <View>
          <Text variant="headerSB" style={{ color: 'green' }}>
            Glad to have you back
          </Text>
        </View>
        <View>
          <Input placeholder="Email" error={true} />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default Login;
