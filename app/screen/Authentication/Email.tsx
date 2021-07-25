import React from 'react';
import { observer } from 'mobx-react';
import { StyleSheet, View } from 'react-native';
import * as Yup from 'yup';

import { height } from '../../config/Constants';
import { Field, Form, Screen, Submit, Text } from '../../components';
import { AuthRoutes, StackNavigationProps } from '../../navigation';

const validation = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
});

const Email = observer(function ({
  navigation,
}: StackNavigationProps<AuthRoutes, 'Email'>): JSX.Element | null {
  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text variant="headerSB" style={{ color: 'green' }}>
            What's Your email?
          </Text>
        </View>
        <View style={styles.input}>
          <Form
            initialValues={{
              email: '',
            }}
            onSubmit={({ email }) => {
              console.log(email);
              navigation.navigate('SignUp', email);
            }}
            validationSchema={validation}>
            <Field
              name="email"
              placeholder="Email"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="go"
            />
            <View style={styles.button}>
              <Submit
                label="Continue"
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

export default Email;
