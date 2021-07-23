import React from 'react';

import { observer } from 'mobx-react';
import { Text, TextStyle } from 'react-native';
import { useStore } from '../../store/rootStore';

type textProps =
  | 'regular'
  | 'semibold'
  | 'bold'
  | 'logo'
  | 'headerRegular'
  | 'headerMedium'
  | 'headerSB'
  | 'placeholder';

interface TypefaceProps {
  children: React.ReactNode;
  style?: TextStyle;
  variant?: textProps;
}

const Typeface = observer(function ({
  children,
  style,
  variant = 'regular',
  ...props
}: TypefaceProps): JSX.Element | null {
  const { uiState } = useStore();
  const uiColor = uiState.getTheme();

  let textStyle: TextStyle = {};

  switch (variant) {
    case 'regular':
      textStyle = {
        fontFamily: 'Titillium',
        fontSize: 16,
        color: uiColor.textColor,
        lineHeight: 16,
      };
      break;
    case 'semibold':
      textStyle = {
        fontFamily: 'TitilliumSB',
        fontSize: 16,
        color: uiColor.textColor,
      };
      break;
    case 'bold':
      textStyle = {
        fontFamily: 'TitilliumBD',
        fontSize: 20,
        color: uiColor.textColor,
      };
      break;
    case 'logo':
      textStyle = {
        fontFamily: 'Sarpanch',
        fontSize: 36,
        color: uiColor.textColor,
      };
      break;
    case 'headerRegular':
      textStyle = {
        fontFamily: 'Saira',
        fontSize: 16,
        color: uiColor.textColor,
      };
      break;
    case 'headerMedium':
      textStyle = {
        fontFamily: 'SairaMD',
        fontSize: 16,
        color: uiColor.textColor,
      };
      break;
    case 'headerSB':
      textStyle = {
        fontFamily: 'SairaSB',
        fontSize: 24,
        color: uiColor.primary,
        lineHeight: 48,
        textTransform: 'uppercase',
      };
      break;
    case 'placeholder':
      textStyle = {
        fontFamily: 'TitilliumSB',
        fontSize: 16,
        color: uiColor.primary,
      };
      break;
    default:
      textStyle = {
        fontFamily: 'Titillium',
        fontSize: 16,
        color: uiColor.textColor,
        lineHeight: 16,
      };
  }

  return (
    <Text style={[style, textStyle]} {...props}>
      {children}
    </Text>
  );
});

export default Typeface;
