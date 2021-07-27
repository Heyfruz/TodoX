import React from 'react';
import { observer } from 'mobx-react';
import { StyleSheet, View } from 'react-native';
import * as Yup from 'yup';

import { height } from '../../config/Constants';
import { Field, Form, Screen, Submit, Text } from '../../components';
import { AuthRoutes, StackNavigationProps } from '../../navigation';
import { useStore } from '../../store/rootStore';

const passwordRegExr = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{5,}$/;
const validation = Yup.object().shape({
  name: Yup.string().required().min(3).label('Name'),
  password: Yup.string()
    .matches(passwordRegExr, 'Password too weak')
    .required()
    .min(5)
    .label('Password'),
});

const SignUp = observer(function ({
  route,
}: StackNavigationProps<AuthRoutes, 'SignUp'>): JSX.Element | null {
  const email = route.params;
  console.log(email);
  const { authStore } = useStore();

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text variant="headerSB" style={{ color: 'green' }}>
            Let's get you started!
          </Text>
        </View>
        <View style={styles.input}>
          <Form
            initialValues={{
              name: '',
              password: '',
            }}
            onSubmit={value => {
              console.log(value);
              authStore.login();
            }}
            validationSchema={validation}>
            <Field
              name="name"
              placeholder="Your Name"
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="done"
            />
            <Field
              name="password"
              placeholder="Password"
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="go"
              secureTextEntry={true}
            />
            <View style={styles.button}>
              <Submit
                label="Create account"
                variant="primary"
                transform="uppercase"
              />
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

export default SignUp;
