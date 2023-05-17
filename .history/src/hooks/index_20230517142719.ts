import React from 'react';

export function useForm() {
  const [_, forceUpdate] = React.useState<any>(null);
  const formRef = React.useRef<any>();
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
