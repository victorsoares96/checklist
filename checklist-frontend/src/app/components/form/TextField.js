import React, { useRef, useEffect, useState } from 'react';

import { TextField as BaseTextField } from '@material-ui/core';
import { useField } from '@unform/core';


const TextField = ({
  name,
  helperText,
  defaultValue,
  InputLabelProps,
  ...restProps
}) => {

  const inputRef = useRef(null);
  const {
    fieldName,
    defaultValue: defaultFieldValue,
    registerField,
    error,
  } = useField(name);
  const defaultInputValue = defaultValue ?? defaultFieldValue;
  const [shrink, setShrink] = useState(!!defaultInputValue);

  useEffect(() => {
    if (fieldName) {
      registerField({
        name: fieldName,
        ref: inputRef.current,
        path: 'value',
        clearValue(ref, resetValue) {
          const newValue = resetValue ?? defaultInputValue ?? '';
          ref.value = newValue;
          setShrink(!!newValue);
        },
        setValue(ref, value) {
          if (ref) {
            const newValue = value ?? '';
            ref.value = newValue;
            setShrink(!!newValue);
          }
        },
      });
    }
  }, [fieldName, registerField, defaultInputValue, setShrink]);

  useEffect(() => {
    const input = inputRef.current;

    function handlerFocusEvent(evt) {
      const inputValue = (evt.currentTarget).value;
      if (!inputValue) setShrink(true);
    }

    function handlerBlurEvent(evt) {
      const inputValue = (evt.target).value;
      if (!inputValue) setShrink(false);
    }

    if (input) {
      input.addEventListener('focus', handlerFocusEvent);
      input.addEventListener('blur', handlerBlurEvent);
    }

    return () => {
      if (input) {
        input.removeEventListener('focus', handlerFocusEvent);
        input.removeEventListener('blur', handlerBlurEvent);
      }
    };
  }, [inputRef]);

  return (
    <BaseTextField
      {...restProps}
      name={fieldName}
      error={!!error}
      helperText={error || helperText}
      inputRef={inputRef}
      defaultValue={defaultInputValue}
      InputLabelProps={{
        ...InputLabelProps,
        shrink: InputLabelProps?.shrink ?? shrink,
      }}
    />
  );
};

export default React.memo(TextField);