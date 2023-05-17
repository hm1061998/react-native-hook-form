import React from 'react';


export interface FormProps {
  children: React.ReactNode;
  style?: any;
  defaultValues?: object;
  innerRef?: React.Ref<any>;
}