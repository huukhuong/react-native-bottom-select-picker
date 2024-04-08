import { View, Text } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import type { PickerItem, PickerProps, ValueType } from './model';
import { TouchableOpacity } from 'react-native';
import { useWindowDimensions } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { Image } from 'react-native';
import { IMAGES } from '../../assets';
import compareSearchText from '../../helpers/compareSearchText';
import { TextInput } from 'react-native';
import { Keyboard } from 'react-native';
import { StyleSheet } from 'react-native';
import { FlatList } from 'react-native';

const itemHeight = 45;
const borderRadius = 7;
const colors = {
  white: '#ffffff',
  border: '#D2D2D2',
  pressed: '#f2f2f2',
  disable: '#ededed',
  text: '#333333',
};

const Picker = (props: PickerProps) => {
  const { width, height } = useWindowDimensions();
  const {
    data,
    value,
    onChange,
    placeholder,
    search,
    searchPlaceholder = 'Enter keyword',
    disable,
    containerStyle,
    inputSearchStyle,
    closeIcon,
    renderItem,
    multiple,
    renderArrow,
  } = props;

  const [showPicker, setShowPicker] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [keyboardShown, setKeyboardShown] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardShown(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardShown(false)
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    setKeyword('');
  }, [showPicker]);

  const dataFiltered = useMemo(
    () => [
      ...data.filter((e) => compareSearchText(e.label, keyword)),
      { label: '', value: '' },
    ],
    [data, keyword]
  );

  const selectedItem = useMemo(
    () => data.find((e) => e.value === value),
    [value, data]
  );

  const handleClickItem = (itemValue: ValueType) => {
    if (multiple) {
      if (value.includes(itemValue)) {
        onChange(value.filter((e: ValueType) => e !== itemValue));
      } else {
        onChange([...value, itemValue]);
      }
    } else {
      onChange(itemValue);
      setShowPicker(false);
    }
  };

  const _renderArrow = () => {
    if (renderArrow) {
      return renderArrow(showPicker);
    } else {
      return (
        <Image
          source={showPicker ? IMAGES.IC_UP : IMAGES.IC_DOWN}
          style={{ width: 11, height: 11 }}
        />
      );
    }
  };

  const _renderItem = useCallback(
    ({ item }: { item: PickerItem }) => {
      const isSelected =
        item.value === ''
          ? false
          : Array.isArray(value)
          ? value.includes(item.value)
          : value === item.value;

      return (
        <View
          style={{
            backgroundColor: colors.pressed,
          }}
        >
          <TouchableOpacity
            onPress={() => handleClickItem(item.value)}
            disabled={item.value === ''}
            activeOpacity={0.5}
          >
            {renderItem ? (
              renderItem({ item, isSelected })
            ) : (
              <Text
                style={[
                  styles.item,
                  {
                    backgroundColor: isSelected ? colors.pressed : colors.white,
                  },
                ]}
              >
                {item.label}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      );
    },
    [multiple, onChange, value]
  );

  return (
    <>
      <View style={[styles.container, containerStyle]}>
        <TouchableOpacity
          onPress={() => (disable ? null : setShowPicker(!showPicker))}
          activeOpacity={disable ? 1 : 0.5}
          style={[
            styles.containerButton,
            {
              backgroundColor: disable ? colors.disable : colors.white,
            },
          ]}
        >
          <Text numberOfLines={1}>{selectedItem?.label || placeholder}</Text>

          {_renderArrow()}
        </TouchableOpacity>
      </View>

      {Array.isArray(value) && (
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 2,
            marginBottom: 8,
            marginTop: 6,
          }}
        >
          {value.map((item) => {
            const itemFound = data.find((e) => e.value === item);
            if (!itemFound) {
              return null;
            }

            return (
              <TouchableOpacity
                key={item}
                onPress={() => handleClickItem(item)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: colors.pressed,
                  paddingVertical: 3,
                  paddingHorizontal: 10,
                  borderRadius: 100,
                }}
              >
                <Text
                  style={{ fontSize: 11, color: colors.text, paddingEnd: 3 }}
                >
                  {itemFound.label}
                </Text>
                <Image
                  source={IMAGES.IC_CLOSE}
                  style={{ width: 8, height: 8 }}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      <ReactNativeModal
        deviceWidth={width}
        deviceHeight={height}
        isVisible={showPicker}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        statusBarTranslucent
        backdropOpacity={0.3}
        style={{
          margin: 0,
          padding: 0,
        }}
      >
        <View style={styles.modalWrapper}>
          <View
            style={{
              backgroundColor: colors.white,
              maxHeight: height / 1.2,
              height: keyboardShown ? height : itemHeight * (data.length + 5),
            }}
          >
            <View style={styles.modalHeader}>
              <View style={styles.modalTitleWrapper}>
                <Text style={styles.modalTitle} numberOfLines={1}>
                  {placeholder}
                </Text>

                <View style={styles.modalCloseIconWrapper}>
                  <TouchableOpacity
                    onPress={() => setShowPicker(false)}
                    style={styles.modalCloseIcon}
                  >
                    {closeIcon ? (
                      closeIcon()
                    ) : (
                      <Image
                        source={IMAGES.IC_CLOSE}
                        style={{ width: 13, height: 13 }}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </View>

              {search && (
                <TextInput
                  cursorColor={colors.text}
                  style={[styles.inputSearch, inputSearchStyle]}
                  value={keyword}
                  onChangeText={setKeyword}
                  placeholder={searchPlaceholder}
                />
              )}
            </View>

            <View style={styles.listWrapper}>
              <FlatList
                bounces={false}
                data={dataFiltered}
                extraData={value}
                renderItem={_renderItem}
                ItemSeparatorComponent={() => (
                  <View style={styles.itemSeparator} />
                )}
              />
            </View>
          </View>
        </View>
      </ReactNativeModal>
    </>
  );
};

export default Picker;
const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius,
    backgroundColor: colors.pressed,
    overflow: 'hidden',
    height: itemHeight,
  },
  containerButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  modalWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalHeader: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    overflow: 'hidden',
  },
  modalTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalTitle: {
    color: colors.text,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    height: itemHeight,
    textAlignVertical: 'center',
  },
  modalCloseIconWrapper: {
    backgroundColor: colors.pressed,
  },
  modalCloseIcon: {
    width: itemHeight,
    height: itemHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  inputSearch: {
    height: itemHeight,
    borderWidth: 1,
    borderColor: colors.border,
    marginHorizontal: 16,
    marginTop: 0,
    marginBottom: 12,
    borderRadius: borderRadius,
    paddingHorizontal: 10,
  },
  listWrapper: {
    flex: 1,
    minHeight: 10,
  },
  item: {
    color: colors.text,
    paddingHorizontal: 10,
    height: itemHeight,
    justifyContent: 'center',
    textAlignVertical: 'center',
  },
  itemSeparator: {
    height: 1,
    backgroundColor: colors.border,
  },
});
