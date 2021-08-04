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
  | 'placeholder'
  | 'error'
  | 'custom'
  | 'picker';

interface TypefaceProps {
  children: React.ReactNode;
  style?: TextStyle | TextStyle[];
  variant?: textProps;
}

const Typeface = observer(function ({
  children,
  style,
  variant,
  ...props
}: TypefaceProps): JSX.Element | null {
  const { uiState } = useStore();
  const uiColor = uiState.getTheme();

  let textStyle: TextStyle = {};

  switch (variant) {
    case 'regular':
      textStyle = {
        color: uiColor.textColor,
        fontFamily: 'Titillium',
        fontSize: 16,
      };
      break;
    case 'semibold':
      textStyle = {
        color: uiColor.textColor,
        fontFamily: 'TitilliumSB',
        fontSize: 16,
      };
      break;
    case 'bold':
      textStyle = {
        color: uiColor.grey,
        fontFamily: 'TitilliumBD',
        fontSize: 16,
      };
      break;
    case 'logo':
      textStyle = {
        color: uiColor.textColor,
        fontFamily: 'Sarpanch',
        fontSize: 36,
      };
      break;
    case 'headerRegular':
      textStyle = {
        color: uiColor.textColor,
        fontFamily: 'Saira',
        fontSize: 16,
      };
      break;
    case 'headerMedium':
      textStyle = {
        color: uiColor.textColor,
        fontFamily: 'SairaMD',
        fontSize: 18,
        textTransform: 'uppercase',
      };
      break;
    case 'headerSB':
      textStyle = {
        color: uiColor.primary,
        fontFamily: 'SairaSB',
        fontSize: 26,
        textTransform: 'uppercase',
      };
      break;
    case 'placeholder':
      textStyle = {
        color: uiColor.primary,
        fontFamily: 'TitilliumSB',
        fontSize: 16,
      };
      break;
    case 'error':
      textStyle = {
        color: uiColor.red,
        fontFamily: 'Titillium',
        fontSize: 14,
      };
      break;
    case 'custom':
      textStyle = {
        fontFamily: 'Titillium',
      };
      break;
    case 'picker':
      textStyle = {
        fontFamily: 'TitilliumSB',
        fontSize: 16,
      };
      break;
    default:
      textStyle = {
        fontFamily: 'Titillium',
        fontSize: 16,
      };
  }

  return (
    <Text style={[style, textStyle]} {...props}>
      {children}
    </Text>
  );
});

export default Typeface;
