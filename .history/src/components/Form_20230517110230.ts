import React, { forwardRef, useImperativeHandle, memo } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { useForm, FormProvider } from 'react-hook-form';
import { FormProps } from '../types';

const Form = forwardRef((props: FormProps, ref: React.Ref<any>) => {
  const { children, style, defaultValues, innerRef, ...otherProps } = props;
  const form = useForm({
    defaultValues,
    ...otherProps,
  });

  const setValues = (value: object | string, val?: any) => {
    if (typeof value === 'object') {
      for (const property in value) {
        form.setValue(property, value[property]);
      }
    } else if (typeof value === 'string') {
      form.setValue(value, val);
    }
  };

  const resetFields = (values?: object, options?: any) => {
    form.reset(values || defaultValues, options);
  };

  useImperativeHandle(innerRef, () => ({
    ...form,
    setValues,
    resetFields,
  }));

  return (
    <FormProvider {...form}>
      <View style={style}>{children}</View>
    </FormProvider>
  );
});

Form.defaultProps = {
  defaultValues: {},
};

Form.propTypes = {
  defaultValues: PropTypes.object,
};

const WrapForm = forwardRef((props: FormProps, ref: React.Ref<any>) => {
  return <Form {...props} innerRef={ref} />;
});

export default memo(WrapForm);