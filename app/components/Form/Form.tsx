import React from 'react';
import { Formik, FormikConfig, FormikValues } from 'formik';

type FormProps = FormikConfig<FormikValues>;

function Form({
  initialValues,
  onSubmit,
  validationSchema,
  children,
}: FormProps): JSX.Element {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {() => <>{children}</>}
    </Formik>
  );
}

export default Form;
