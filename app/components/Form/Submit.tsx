import React from 'react';
import { useFormikContext } from 'formik';

import Button, { ButtonProps } from '../Button';

type SubmitProps = ButtonProps;

function Submit({ label, variant, ...props }: SubmitProps): JSX.Element | null {
  const { handleSubmit } = useFormikContext();
  return (
    <Button label={label} variant={variant} onPress={handleSubmit} {...props} />
  );
}

export default Submit;
