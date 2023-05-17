import React from 'react';

export interface FormProps {
  children: React.ReactChild;
  style?: any;
  defaultValues?: object;
  innerRef?: React.Ref<any>;
}
