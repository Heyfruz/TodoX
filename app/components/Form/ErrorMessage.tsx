import React from 'react';

import Text from '../Text';

interface ErrorMessageProps {
  error: string;
  visible: boolean;
}

const ErrorMessage = function ({
  error,
  visible,
}: ErrorMessageProps): JSX.Element | null {
  if (!error || !visible) return null;
  return <Text variant="error">{error}</Text>;
};

export default ErrorMessage;
