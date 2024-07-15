import { router } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TextArea,
  StyleSheet,
  Image,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Icon from "react-native-vector-icons/FontAwesome5";
import PixelButton from "../../components/PixelButton";
import { useState, useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import CheckBox from "expo-checkbox";
import DropDownPicker from "react-native-dropdown-picker";
import { Divider } from "@rneui/themed";

const Create = () => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurrenceOption, setRecurrenceOption] = useState("Daily");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(false);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const recurrenceOptions = [
    { label: "Daily", value: "Daily" },
    { label: "Weekly", value: "Weekly" },
    { label: "Biweekly", value: "Biweekly" },
    { label: "Monthly", value: "Monthly" },
    { label: "Anually", value: "Anually" },
  ];

  const handleChangeValue = (newValue) => {
    setValue(newValue);
    setRecurrenceOption(newValue);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dueDate;
    setShowDatePicker(false);
    setDueDate(currentDate);
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log({
      title,
      dueDate,
      isRecurring,
      recurrenceOption,
      description,
      status,
    });
  };

  const setToggleCheckBox = (newValue) => {
    // toggle recurring checkbox
    //setIsRecurring(newValue);
  };

  return (
    <View className="flex-1">
      <View className="z-0 bg-blue-200 z-10 mb-3">
        <View className="w-full mt-5 mb-5">
          <View className="flex-row items-center justify-between mt-10 mx-7">
            <TouchableOpacity onPress={() => router.back()}>
              <MaterialIcons
                name="keyboard-backspace"
                size={30}
                color="white"
              />
            </TouchableOpacity>
            <View className="flex-1 items-center">
              <Text className="font-zcool text-white text-3xl">
                Create a QuestBit
              </Text>
            </View>
          </View>
          <View className="mx-7 mt-5 mb-10">
            <Text className="text-white font-zcool text-lg">
              Title<Text className="text-red font-zcool text-lg">*</Text>
            </Text>
            <TextInput
              style={styles.textInput}
              value={title}
              onChangeText={setTitle}
              placeholderTextColor="white"
              className="text-xl mb-5"
            />
            <Text className="text-white font-zcool text-lg">Due Date</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <Text style={styles.textInput}>
                {dueDate ? dueDate.toDateString() : ""}
              </Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={dueDate || new Date()}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
          </View>
        </View>
      </View>
      <View className="z-10 shadow-xl flex-1 bg-white rounded-t-2xl -mt-10">
        <View className="mx-7 mb-10 mt-7">
          <View className="flex-row justify-between items-center mb-5">
            <View className="flex flex-col space-y-2">
              <Text className="text-black font-zcool text-lg">
                Recurring QuestBit?
              </Text>
              <CheckBox
                disabled={false}
                value={isRecurring}
                onValueChange={(newValue) => setIsRecurring(newValue)}
                style={[styles.checkbox, isRecurring && styles.checkboxChecked]}
              />
            </View>
            <View className="flex flex-col space-y-2">
              <DropDownPicker
                open={open}
                value={value}
                items={recurrenceOptions}
                setOpen={setOpen}
                setValue={handleChangeValue}
                placeholder="Select recurrence option"
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdown}
                textStyle={styles.labelStyle}
              />
            </View>
          </View>
          <Divider color="black" />
          <Text className="text-black font-zcool text-lg mt-3">
            Description
            <Text className="text-red font-zcool text-lg">*</Text>
          </Text>
          <TextInput
            editable
            multiline
            numberOfLines={4}
            maxLength={100}
            style={styles.textInput2}
            value={description}
            onChangeText={setDescription}
            placeholderTextColor="black"
            className="text-xl mb-5"
          />
          <Text className="text-black font-zcool text-lg">Status</Text>
          <Image
            source={require("../../assets/images/small-pixel-btn.png")}
            style={{ width: 48, height: 48 }}
          />
          <View flex-row>
            <Text className="text-black font-zcool text-lg mt-5">
              Assignees
            </Text>
          </View>
          <Image
            source={require("../../assets/images/small-pixel-btn.png")}
            style={{ width: 48, height: 48 }}
          />
        </View>

        <View>
          <TouchableOpacity
            className="items-center justify-center"
            onPress={null}
          >
            <Image
              source={require("../../assets/images/pixelButton.png")}
              className={`w-[86vw] h-14`}
            />
            <Text className={`text-white font-zcool absolute text-xl pb-1`}>
              CREATE QUESTBIT
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "white",
    color: "white",
    width: "100%",
    fontFamily: "ZCOOL",
    padding: 5,
  },
  textInput2: {
    height: 40,
    borderBottomWidth: 0.5,
    borderBottomColor: "black",
    color: "black",
    width: "100%",
    fontFamily: "ZCOOL",
    padding: 5,
  },
  dropdown: {
    backgroundColor: "#e3d2c2",
    borderColor: "#b58d74",
    borderWidth: 2,
    width: 200,
  },
  labelStyle: {
    color: "#7F4D2E",
    fontFamily: "ZCOOL",
    fontSize: 16,
  },
  checkbox: {
    borderRadius: 5,
  },
  checkboxChecked: {
    backgroundColor: "coral",
  },
});

export default Create;
