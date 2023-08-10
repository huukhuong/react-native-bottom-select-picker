import { Dimensions, StyleSheet } from 'react-native';

export const itemHeight = 50;
export const { width, height } = Dimensions.get('screen');
export const colors = {
  selected: '#ececec',
  separator: '#cccccc',
  text: '#333333',
  white: '#ffffff',
};

const styles = StyleSheet.create({
  textBase: {
    color: colors.text,
    fontSize: 14,
  },
  container: {
    width: '100%',
    height: itemHeight,
    justifyContent: 'center',
    borderColor: colors.separator,
    borderWidth: 1,
    borderRadius: 5,
  },
  btnDropdown: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  iconDropdown: {
    width: 14,
    height: 14,
  },
  modalWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    width: width,
    height: height,
  },
  modalContainer: {
    width: width,
    backgroundColor: colors.white,
    overflow: 'hidden',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  modalHeaderWithSearch: {
    borderColor: colors.separator,
    borderBottomWidth: 1,
  },
  modalHeaderWrapper: {
    height: itemHeight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    color: colors.text,
  },
  modalHeaderClose: {
    width: itemHeight,
    height: itemHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    height: itemHeight,
    justifyContent: 'center',
    paddingHorizontal: 16,
    textAlignVertical: 'center',
    borderBottomWidth: 1,
    borderColor: colors.separator,
  },
  selectedTextStyle: {
    fontWeight: 'bold',
  },
  inputSearchStyle: {
    padding: 12,
    height: itemHeight,
    borderWidth: 1,
    borderColor: colors.separator,
    borderRadius: 5,
    marginBottom: 10,
    marginHorizontal: 16,
  },
});

export default styles;
