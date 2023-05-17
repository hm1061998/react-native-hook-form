import React, {
  cloneElement,
  Children,
  useState,
  useMemo,
  useCallback,
  memo,
} from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import Icon from '~/components/BasesComponents/Icon';
import tw from '~/lib/tailwind';

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
}) => {
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
        <View
          pointerEvents="box-none"
          style={tw`absolute top-0 right-0 h-full items-end justify-center z-10 w-[70vw] `}>
          <TouchableHighlight
            underlayColor={tw.color('ROOT_COLOR_SMOOTH')}
            style={tw`rounded-full`}
            onPress={() => {
              setShowLabelError(prev => !prev);
            }}>
            <Icon
              type="MaterialIcons"
              name="error"
              size={16}
              color={tw.color('ROOT_COLOR_RED')}
            />
          </TouchableHighlight>

          {showLabelError && (
            <View
              style={tw`absolute bottom-3/4 right-0  bg-slate-500 py-1 px-2 items-center justify-center rounded-md shadow-sm`}>
              <Text style={tw`text-xs text-WHITE`}>{error?.message}</Text>
              <View style={tw`absolute -bottom-2.5 right-0`}>
                <Icon
                  type="Entypo"
                  name="triangle-down"
                  size={16}
                  color={tw.color('slate-500')}
                />
              </View>
            </View>
          )}
        </View>
      );
    }

    return (
      <Text style={[{ color: 'red', fontSize: 13 }, errorTextStyle]}>
        {error?.message}
      </Text>
    );
  }, [error, errorTextStyle, isErrorV2, showLabelError]);
  // console.log(name, shouldUpdate);
  const renderFormItem = useMemo(() => {
    // return null;
    return (
      <>
        <View
          style={[
            StyleSheet.flatten(style || {}),
            error && { borderColor: errorBorderColor },
          ]}>
          {_renderLabel()}
          {cloneElement(Children.only(children), {
            [valuePropsName]: valueFormatter(field.value),
            [handleChange]: e => {
              field.onChange(onChangeFormatter(e));
              children.props[handleChange]?.(onChangeFormatter(e));
            },
            [handeBlur]: () => {
              field.onBlur(field.value);
              children.props[handeBlur]?.(field.value);
            },
            ref: children.ref || field.ref,
          })}
          {/* {children} */}
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

FormItem.defaultProps = {
  valuePropsName: 'value',
  handleChange: 'onChangeText',
  handeBlur: 'onBlur',
  errorBorderColor: '#f86168',
  shouldUnregister: true,
  valueFormatter: val => val,
  onChangeFormatter: val => val,
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
