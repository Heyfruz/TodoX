import { Dispatch, SetStateAction, useState } from 'react';
import { ColorValue } from 'react-native';

type HookType = {
  colorCode: ColorValue;
  selected: number | undefined;
  selectedColor: string;
  setColorCode: Dispatch<SetStateAction<ColorValue>>;
  setSelected: Dispatch<SetStateAction<number | undefined>>;
  setSelectedColor: Dispatch<SetStateAction<string>>;
  setValue: Dispatch<SetStateAction<string>>;
  setVisible: Dispatch<SetStateAction<boolean>>;
  value: string;
  visible: boolean;
};

function usePicker(): HookType {
  const [visible, setVisible] = useState<boolean>(false);
  const [selected, setSelected] = useState<number>();
  const [selectedColor, setSelectedColor] = useState<string>('Grey');
  const [colorCode, setColorCode] = useState<ColorValue>('#61656C');
  const [value, setValue] = useState<string>('');

  return {
    colorCode,
    selected,
    selectedColor,
    setColorCode,
    setSelected,
    setSelectedColor,
    setValue,
    setVisible,
    value,
    visible,
  };
}

export default usePicker;
