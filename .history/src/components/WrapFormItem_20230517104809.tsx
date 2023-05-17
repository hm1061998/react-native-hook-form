import { useFormContext } from 'react-hook-form';
import { useMemo, memo } from 'react';
import PropTypes from 'prop-types';

const WrapFormItem = ({ shouldUpdate, children }) => {
  const { watch } = useFormContext();
  const fields = watch();
  const dependencies = useMemo(() => {
    if (shouldUpdate) {
      // console.log(shouldUpdate);
      if (Array.isArray(shouldUpdate)) {
        return shouldUpdate.map(item => fields[item]);
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
