import React from 'react';
import { useFormikContext } from 'formik';
import { TextInputProps } from 'react-native';

import Input from '../Input';
import { FieldKeys } from '../../config/type';

import ErrorMessage from './ErrorMessage';

interface FormFieldProps extends TextInputProps {
  name: keyof FieldKeys;
  placeholder: string;
  onTextChange?: (text: string) => void;
}

function FormField({
  name,
  placeholder,
  onTextChange,
  ...props
}: FormFieldProps): JSX.Element | null {
  const {
    setFieldTouched,
    setFieldValue,
    errors,
    touched,
    handleSubmit,
    values,
  } = useFormikContext<FieldKeys>();

  //*NOTE: getIn(touched, name) can replace errors[name]

  return (
    <>
      <Input
        onChangeText={text => {
          setFieldValue(name, text);
          onTextChange?.(text);
        }}
        placeholder={placeholder}
        onBlur={() => setFieldTouched(name)}
        error={!!(errors[name] && touched[name])}
        onSubmitEditing={() => handleSubmit()}
        value={values[name]}
        {...props}
      />
      <ErrorMessage error={errors[name] as string} visible={!!touched[name]} />
    </>
  );
}

export default FormField;
