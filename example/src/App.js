import * as React from 'react';
import { TextInput } from 'react-native';

import { StyleSheet, View, Text } from 'react-native';
import { Form, FormItem, useForm } from 'react-native-hook-form';

export default function App() {
  const [form, setFormRef] = useForm();

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <View style={styles.container}>
      <Form style={styles.form} ref={setFormRef}>
        <View style={{ height: 50, borderWidth: 1 }}>
          <FormItem
            style={styles.inputView}
            errorTextStyle={{ marginTop: -20 }}
            isErrorV2
            name="userName"
            rules={{
              required: {
                value: true,
                message: 'Vui lòng nhập tài khoản',
              },
            }}
          >
            <TextInput
              autoCapitalize="none"
              placeholder="Tên tài khoản"
              spellCheck={false}
              keyboardType="default"
              returnKeyType="next"
              onSubmitEditing={() => form?.setFocus('password')}
            />
          </FormItem>
        </View>

        <View>
          <FormItem
            style={styles.inputView}
            errorTextStyle={{ marginTop: -20 }}
            name="password"
            isErrorV2
            rules={{
              required: {
                value: true,
                message: 'Vui lòng nhập mật khẩu',
              },
            }}
          >
            <TextInput
              autoCapitalize="none"
              placeholder="Nhập mật khẩu bảo mật"
              spellCheck={false}
              textContentType="password"
              style={styles.TextInput}
              onSubmitEditing={form?.handleSubmit(onSubmit)}
              secureTextEntry={true}
            />
          </FormItem>
        </View>
      </Form>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
