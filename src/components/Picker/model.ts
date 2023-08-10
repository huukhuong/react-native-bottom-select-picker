import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface PickerItem {
  label: string;
  value: string;

  [key: string]: any;
}

export interface PickerProps {
  data: PickerItem[];
  value: string;
  placeholder: string;
  search?: boolean;
  searchPlaceholder?: string;
  disable?: boolean;
  onChange: (value: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
  containerDisableStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  placeholderStyle?: StyleProp<TextStyle>;
  inputSearchStyle?: StyleProp<TextStyle>;
}
