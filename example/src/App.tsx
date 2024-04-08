import * as React from 'react';
import { useState } from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { Picker, type PickerItem } from 'react-native-bottom-select-picker';

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
  {
    label: 'Mango',
    value: 'Mango',
  },
  {
    label: 'Watermelon',
    value: 'Watermelon',
  },
  {
    label: 'Pineapple',
    value: 'Pineapple',
  },
  {
    label: 'Strawberry',
    value: 'Strawberry',
  },
];

export default function App() {
  const [value, setValue] = useState<string>('');
  const [multipleValue, setMultipleValue] = useState<string[]>([]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>Simple Picker</Text>
        <Picker
          placeholder={'Select your favorite fruit'}
          data={data}
          value={value}
          onChange={setValue}
        />
      </View>

      <View>
        <Text style={styles.label}>Picker with search</Text>
        <Picker
          placeholder={'Select your favorite fruit'}
          data={data}
          value={value}
          onChange={setValue}
          search
        />
      </View>

      <View>
        <Text style={styles.label}>Picker disabled</Text>
        <Picker
          placeholder={'Select your favorite fruit'}
          data={data}
          value={value}
          onChange={setValue}
          disable
        />
      </View>

      <View>
        <Text style={styles.label}>Picker with multiple item choices</Text>
        <Picker
          placeholder={'Select your favorite fruits'}
          data={data}
          value={multipleValue}
          onChange={setMultipleValue}
          multiple
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 40,
    gap: 25,
  },
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
    color: '#333333',
  },
});
