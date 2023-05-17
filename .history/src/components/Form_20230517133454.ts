import * as React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { useForm, FormProvider } from 'react-hook-form';
import type { FormProps } from '../types';

const Form = (props: FormProps) => {
  const { children, style, defaultValues, innerRef, ...otherProps } = props;
  const form = useForm<object, any>({
    ...otherProps,
    defaultValues,
  });

  const setValues = (value: object | string, val?: any) => {
    if (typeof value === 'object') {
      for (const property in value) {
        form.setValue(property as never, value[property as never] as never);
      }
    } else if (typeof value === 'string') {
      form.setValue(value as never, val as never);
    }
  };

  const resetFields = (values?: object, options?: any) => {
    form.reset(values || defaultValues, options);
  };

  React.useImperativeHandle(innerRef, () => ({
    ...form,
    setValues,
    resetFields,
  }));

  return <View style={style}>{children}</View>;
};

Form.defaultProps = {
  defaultValues: {},
};

Form.propTypes = {
  defaultValues: PropTypes.object,
};

const WrapForm = React.forwardRef((props: FormProps, ref: React.Ref<any>) => {
  return <Form {...props} innerRef={ref} />;
});

export default React.memo(WrapForm);