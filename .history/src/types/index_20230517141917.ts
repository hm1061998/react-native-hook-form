import type React from 'react';
import WrapFormItem from 'src/components/WrapFormItem';

export interface FormProps {
  children: React.ReactChild;
  style?: any;
  defaultValues?: object;
  innerRef?: React.Ref<any>;
}

export interface FormItemProps {
  name: string;
  children: React.ReactChild & { ref: React.Ref<any>; props: any };
  renderLabel?: () => React.ReactElement | null;
  valuePropsName?: string;
  handleChange?: string;
  handeBlur?: string;
  shouldUnregister?: boolean;
  rules?: object;
  errorTextStyle?: any;
  defaultValue?: any;
  label?: string;
  labelStyle?: any;
  style?: any;
  valueFormatter?: (value: any) => any;
  onChangeFormatter?: (value: any) => any;
  errorBorderColor?: string;
  isErrorV2?: boolean;
}

export interface WrapFormItemProps {
  shouldUpdate?: Array<T>;
  children: React.ReactChild;
}
