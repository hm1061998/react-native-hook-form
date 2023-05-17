import React from 'react';
import {Stylesheet} from 'react-native'

export interface FormProps {
  children: React.ReactNode;
  style?: any;
  defaultValues?: object;
  innerRef?: React.Ref<any>;
}