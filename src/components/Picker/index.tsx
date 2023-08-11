import type { PickerItem, PickerProps } from './model';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Image,
  Keyboard,
  Pressable,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import { FlashList } from '@shopify/flash-list';
import { IMAGES } from '../../assets';
import styles, { colors, height, itemHeight, width } from './styles';

const PickerComponent = ({
  data,
  value,
  placeholder,
  search,
  searchPlaceholder,
  disable,
  onChange,
  containerStyle,
  containerDisableStyle,
  textStyle,
  placeholderStyle,
  inputSearchStyle,
}: PickerProps) => {
  const [keyword, setKeyword] = useState<string>('');
  const [dataFiltered, setDataFiltered] = useState<PickerItem[]>([]);
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);

  const itemSelected = useMemo(() => {
    return data.find((e) => e.value === value);
  }, [data, value]);

  useEffect(() => {
    const keyboardOpened = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardHeight(e.endCoordinates.height);
    });

    const keyboardHidden = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    });

    return () => {
      keyboardOpened.remove();
      keyboardHidden.remove();
    };
  }, []);

  useEffect(() => {
    handleSearch();
  }, [keyword]);

  const handleOpenPicker = () => {
    if (!disable) {
      setIsOpened(true);
    }
  };

  const handleSelectItem = (item: PickerItem) => {
    if (!disable) {
      onChange(item.value);
      setIsOpened(false);
    }
  };

  const handleSearch = () => {
    const dataFiltered = data.filter((item) => {
      const labelValue = item.label.toLowerCase().trim();
      return labelValue.includes(keyword.toLowerCase().trim());
    });

    setDataFiltered(dataFiltered);
  };

  const _renderItem = useCallback(
    ({ item }: { item: PickerItem }) => {
      const isSelected = item.value === value;
      return (
        <>
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor={colors.selected}
            onPress={() => handleSelectItem(item)}
          >
            <Text
              style={[
                styles.textBase,
                styles.itemContainer,
                isSelected && styles.selectedTextStyle,
              ]}
            >
              {item.label}
            </Text>
          </TouchableHighlight>
        </>
      );
    },
    [value, dataFiltered]
  );

  const _renderModal = useCallback(
    () => (
      <Modal
        isVisible={isOpened}
        animationIn={'fadeInUp'}
        style={{ margin: 0, padding: 0 }}
        statusBarTranslucent
        onModalHide={() => setIsOpened(false)}
        deviceWidth={width}
        deviceHeight={height}
      >
        <View style={styles.modalWrapper}>
          <View
            style={[
              styles.modalContainer,
              {
                height: (data.length + 3) * itemHeight + keyboardHeight,
              },
            ]}
          >
            <View style={styles.modalHeaderWithSearch}>
              <View style={styles.modalHeaderWrapper}>
                <Text style={styles.modalHeaderText}>{placeholder}</Text>

                <TouchableOpacity
                  onPress={() => setIsOpened(false)}
                  style={styles.modalHeaderClose}
                >
                  <Image
                    source={IMAGES.IC_CLOSE}
                    style={{ width: 20, height: 20 }}
                  />
                </TouchableOpacity>
              </View>

              {search && (
                <TextInput
                  style={[styles.inputSearchStyle, inputSearchStyle]}
                  placeholder={searchPlaceholder || 'Enter keyword...'}
                  onChangeText={setKeyword}
                />
              )}
            </View>

            <FlashList
              estimatedItemSize={100}
              data={dataFiltered}
              renderItem={_renderItem}
            />
          </View>
        </View>
      </Modal>
    ),
    [
      value,
      isOpened,
      dataFiltered,
      placeholder,
      searchPlaceholder,
      keyboardHeight,
    ]
  );

  return (
    <>
      <View
        style={[
          styles.container,
          containerStyle,
          disable && {
            backgroundColor: colors.selected,
          },
          disable && containerDisableStyle,
        ]}
      >
        <Pressable style={styles.btnDropdown} onPress={handleOpenPicker}>
          {itemSelected && itemSelected.label ? (
            <Text numberOfLines={1} style={[styles.textBase, textStyle]}>
              {itemSelected.label}
            </Text>
          ) : (
            <Text numberOfLines={1} style={[styles.textBase, placeholderStyle]}>
              {placeholder}
            </Text>
          )}

          <Image
            source={isOpened ? IMAGES.IC_UP : IMAGES.IC_DOWN}
            style={styles.iconDropdown}
          />
        </Pressable>
      </View>

      {_renderModal()}
    </>
  );
};

export default React.memo(PickerComponent);
