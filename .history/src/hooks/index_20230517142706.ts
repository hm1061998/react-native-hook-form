import React from 'react';

export function useForm() {
  const [_, forceUpdate] = React.useState<object | any>(null);
  const formRef = React.useRef();
  const setFormRef = (ref: any) => {
    if (!formRef.current) {
      formRef.current = ref;
      forceUpdate({});
    }
  };

  const clearForm = () => {
    formRef.current = null;
    forceUpdate({});
  };

  return [formRef.current, setFormRef, clearForm];
}
