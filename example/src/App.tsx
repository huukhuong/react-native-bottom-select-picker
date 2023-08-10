import * as React from 'react';

import { StatusBar, StyleSheet, View } from 'react-native';
import { Picker, type PickerItem } from 'react-native-bottom-select-picker';
import { useState } from 'react';

const data: PickerItem[] = [
  {
    label: 'Apple',
    value: 'Apple',
  },
  {
    label: 'Orange',
    value: 'Orange',
  },
  {
    label: 'Banana',
    value: 'Banana',
  },
];
export default function App() {
  const [value, setValue] = useState<string>('');

  return (
    <View style={styles.container}>
      <StatusBar />
      <Picker
        placeholder={'Select your favorite color'}
        data={data}
        value={value}
        onChange={setValue}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
