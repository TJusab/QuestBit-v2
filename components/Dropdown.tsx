import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import DropDownPicker, { ItemType } from "react-native-dropdown-picker";
import { Status } from "../constants/enums";

interface DropdownProps {
  initialValue: Status;
  items: ItemType<string>[];
  onChangeValue: (value: Status) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  initialValue,
  items,
  onChangeValue,
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<Status>(initialValue);

  return (
    <View>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={(val) => {
          setValue(val as unknown as Status);
          onChangeValue(val as unknown as Status);
        }}
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
    borderWidth: 2,
  },
  labelStyle: {
    color: "#7F4D2E",
    fontFamily: "ZCOOL",
    fontSize: 16,
  },
});

export default Dropdown;
