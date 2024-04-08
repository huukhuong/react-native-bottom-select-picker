import type { ReactElement, ReactNode } from 'react';
import type { StyleProp, TextStyle, ViewStyle } from 'react-native';

export type ValueType = any | any[];
export type RenderItemProps = { item: PickerItem; isSelected?: boolean };

export interface PickerItem {
  label: string;
  value: ValueType;

  [key: string]: any;
}

export interface PickerProps {
  data: PickerItem[];
  value: ValueType;
  onChange: (value: ValueType) => void;
  placeholder: string;
  search?: boolean;
  searchPlaceholder?: string;
  disable?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  containerTextStyle?: StyleProp<TextStyle>;
  inputSearchStyle?: StyleProp<TextStyle>;
  renderArrow?: (pickerShown: boolean) => ReactNode;
  closeIcon?: () => ReactNode;
  renderItem?: (props: RenderItemProps) => ReactElement;
  multiple?: boolean;
}
