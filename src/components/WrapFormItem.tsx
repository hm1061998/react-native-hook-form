/* eslint-disable prettier/prettier */
import { useFormContext } from 'react-hook-form';
import { useMemo, memo, FC } from 'react';
import PropTypes from 'prop-types';
import type { WrapFormItemProps } from '../types';

const WrapFormItem: FC<WrapFormItemProps> = ({ shouldUpdate, children }) => {
  const { watch } = useFormContext();
  const fields = watch();
  const dependencies = useMemo(() => {
    if (shouldUpdate) {
      // console.log(shouldUpdate);
      if (Array.isArray(shouldUpdate)) {
        return shouldUpdate.map((item) =>
          typeof item === 'string' ? fields[item] : item
        );
      } else {
        return undefined;
      }
    }
    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields]);

  // console.log({ dependencies });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(() => children(fields), dependencies);
};

WrapFormItem.propTypes = {
  shouldUpdate: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
};
export default memo(WrapFormItem);
