import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

export type valueType = string | number | boolean;

export interface PickerItem {
  label: string;
  value: valueType;

  [key: string]: any;
}

export interface PickerProps {
  data: PickerItem[];
  value: PickerItem | undefined;
  placeholder: string;
  search?: boolean;
  searchPlaceholder?: string;
  disable?: boolean;
  onChange: (value: PickerItem | undefined) => void;
  containerStyle?: StyleProp<ViewStyle>;
  containerDisableStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  placeholderStyle?: StyleProp<TextStyle>;
  inputSearchStyle?: StyleProp<TextStyle>;
}
