import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import * as Yup from 'yup';
import { Feather as Icon } from '@expo/vector-icons';
import { observer } from 'mobx-react';

import { Field, Form, Screen, Submit, Text } from '../../components';
import { height } from '../../config/Constants';
import { useStore } from '../../store/rootStore';

const validation = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string()
    .required('Password is required')
    .min(5, 'Password too short')
    .label('Password'),
});

const Login = observer(function (): JSX.Element | null {
  const { uiState, authStore } = useStore();
  const color = uiState.getTheme();

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text variant="headerSB" style={{ color: 'green' }}>
            Glad to have you back
          </Text>
        </View>
        <View style={styles.input}>
          <Form
            initialValues={{
              email: authStore.email,
              password: '',
            }}
            onSubmit={value => {
              console.log(value);
              authStore.setEmail(value.email);
              authStore.login();
            }}
            validationSchema={validation}>
            <Field
              name="email"
              placeholder="Email"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="done"
            />
            <Field
              name="password"
              placeholder="Password"
              secureTextEntry={true}
              returnKeyType="go"
            />
            <View style={styles.checkContainer}>
              <Text style={{ color: color.primary }}>Remember Me</Text>
              <TouchableWithoutFeedback
                onPress={() => {
                  console.log(authStore.checkBox);
                  authStore.setCheckBox();
                }}>
                <View>
                  {authStore.checkBox === false ? (
                    <Icon name="square" size={24} color={color.primary} />
                  ) : (
                    <Icon name="check-square" size={24} color={color.primary} />
                  )}
                </View>
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.button}>
              <Submit label="Login" variant="primary" transform="uppercase" />
            </View>
          </Form>
        </View>
      </View>
    </Screen>
  );
});

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.1,
  },
  checkContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    height: height * 0.12,
    justifyContent: 'center',
  },
  input: {
    marginTop: 20,
  },
});

export default Login;
