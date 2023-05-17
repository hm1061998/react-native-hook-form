/* eslint-disable prettier/prettier */
import React, {
  cloneElement,
  Children,
  useState,
  useMemo,
  useCallback,
  memo,
} from 'react';
import { useController, useFormContext } from 'react-hook-form';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import type { FormItemProps } from '../types';

const { width: widthWindow } = Dimensions.get('window');
const ROOT_COLOR_SMOOTH = '#6D7B81';
const ROOT_COLOR_RED = '#FF0000';
const slate = '#64748b';

const FormItem = ({
  name,
  children,
  renderLabel,
  valuePropsName,
  handleChange,
  handeBlur,
  shouldUnregister,
  rules,
  errorTextStyle,
  defaultValue,
  label,
  labelStyle,
  style,
  valueFormatter,
  onChangeFormatter,
  errorBorderColor,
  isErrorV2,
}: FormItemProps) => {
  const { control } = useFormContext();
  const [showLabelError, setShowLabelError] = useState(true);

  const {
    field,
    fieldState: { error },
  } = useController({
    control,
    defaultValue,
    name,
    rules,
    shouldUnregister,
  });

  const _renderLabel = useCallback(() => {
    if (renderLabel) {
      return renderLabel();
    }
    return label ? <Text style={labelStyle}>{label}</Text> : null;
  }, [label, labelStyle, renderLabel]);

  const renderError = useCallback(() => {
    if (!error) {
      return null;
    }
    if (isErrorV2) {
      return (
        <View pointerEvents="box-none" style={styles.errorContainer}>
          <TouchableHighlight
            underlayColor={ROOT_COLOR_SMOOTH}
            style={styles.errorAction}
            onPress={() => {
              setShowLabelError((prev) => !prev);
            }}
          >
            <Text style={styles.errorActionContent}>!</Text>
          </TouchableHighlight>

          {showLabelError && (
            <View style={styles.errorMessage}>
              <Text style={styles.errorMessageTxt}>{error?.message}</Text>
              <View style={styles.triangle} />
            </View>
          )}
        </View>
      );
    }

    return (
      <Text style={[styles.errorTextDefault, errorTextStyle]}>
        {error?.message}
      </Text>
    );
  }, [error, errorTextStyle, isErrorV2, showLabelError]);

  const renderFormItem = useMemo(() => {
    return (
      <>
        <View
          style={[
            StyleSheet.flatten(style),
            error && { borderColor: errorBorderColor },
          ]}
        >
          {_renderLabel()}
          {cloneElement(Children.only(children as any), {
            [valuePropsName!]: valueFormatter!(field.value),
            [handleChange!]: (e: any) => {
              field.onChange(onChangeFormatter!(e));
              children.props[handleChange!]?.(onChangeFormatter!(e));
            },
            [handeBlur!]: () => {
              field.onBlur();
              children.props[handeBlur!]?.(field.value);
            },
            ref: children.ref || field.ref,
          })}
        </View>

        {renderError()}
      </>
    );
  }, [
    _renderLabel,
    children,
    error,
    errorBorderColor,
    field,
    handeBlur,
    handleChange,
    onChangeFormatter,
    renderError,
    style,
    valueFormatter,
    valuePropsName,
  ]);

  return renderFormItem;
};

const styles = StyleSheet.create({
  errorTextDefault: { color: 'red', fontSize: 13 },
  errorContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    zIndex: 999,
    width: widthWindow * 0.7,
  },
  errorAction: {
    borderRadius: 9999,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ROOT_COLOR_RED,
  },
  errorActionContent: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
  errorMessage: {
    position: 'absolute',
    bottom: '75%',
    right: 0,
    backgroundColor: slate,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 0.125,
    shadowRadius: 3,
  },
  errorMessageTxt: {
    fontSize: 12,
    color: '#fff',
  },

  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: slate,
    transform: [{ rotate: '60deg' }],
    position: 'absolute',
    bottom: -3,
    right: 1,
  },
});

FormItem.defaultProps = {
  valuePropsName: 'value',
  handleChange: 'onChangeText',
  handeBlur: 'onBlur',
  errorBorderColor: '#f86168',
  shouldUnregister: true,
  valueFormatter: (val: any) => val,
  onChangeFormatter: (val: any) => val,
};
FormItem.propTypes = {
  name: PropTypes.string.isRequired,
  valuePropsName: PropTypes.string,
  handleChange: PropTypes.string,
  handeBlur: PropTypes.string,
  shouldUnregister: PropTypes.bool,
  rules: PropTypes.object,
  renderLabel: PropTypes.func,
  valueFormatter: PropTypes.func,
  onChangeFormatter: PropTypes.func,
  errorBorderColor: PropTypes.string,
  isErrorV2: PropTypes.bool,
};

export default memo(FormItem);
