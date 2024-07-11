import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const Dropdown = ({ initialValue, onChangeValue, items }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (initialValue) {
      setValue(initialValue);
    }
  }, [initialValue]);

  const handleChangeValue = (newValue) => {
    setValue(newValue);
    onChangeValue(newValue);
  };

  return (
    <View className="">
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={handleChangeValue}
        placeholder="Select an item"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdown}
        textStyle={styles.labelStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: "#e3d2c2",
    borderColor: "#b58d74",
    borderWidth: 2
  },
  labelStyle: {
    color: "#7F4D2E",
    fontFamily: 'ZCOOL',
    fontSize: 16
  }
});

export default Dropdown;
