import React, { useEffect, useRef, useState } from 'react';
import { useField } from '@unform/core';
import { Checkbox, Typography } from '@material-ui/core';

const CheckboxInput = ({ name, options, ...rest }) => {
  const inputRefs = useRef([]);
  const { fieldName, registerField, defaultValue = [] } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRefs.current,
      getValue: (refs) => {
        return refs.filter(ref => ref.checked).map(ref => ref.value);
      },
      clearValue: (refs) => {
        refs.forEach(ref => {
          ref.checked = false;
        });
      },
      setValue: (refs, values) => {
        refs.forEach(ref => {
          if (values.includes(ref.id)) {
            ref.checked = true;
          }
        });
      },
    });
  }, [defaultValue, fieldName, registerField]);
  
  const CheckBox = ({ option, index }) => {
    const { id, label } = option;
    const [checked, setChecked] = useState(false);
    const handleChange = () => {
      setChecked(oldState => !oldState);
    };
    return (
      <Typography variant='subtitle1'>
        <Checkbox
        ref={ref => {
          inputRefs.current[index] = ref;
        }}
        key={id}
        checked={checked}
        onChange={handleChange}
        color="primary"
        />
        {label}
      </Typography>
    );
  }
  return (
    <div>
      {options.map((option, index) => (
        <CheckBox option={option} index={index} />  
      ))}
    </div>
  );
};
export default CheckboxInput;