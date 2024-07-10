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
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

const Create = () => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurrenceOption, setRecurrenceOption] = useState("Annually");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(false);

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
  return (
    <View className="flex-1">
      <View className="z-0 h-[40%] bg-blue-200 z-10">
        <View className="w-full">
          <View className="flex-row items-center justify-between px-4 mt-10">
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
          <View className="mx-5 mb-10">
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
      <View className="z-10 flex-1 bg-white rounded-t-3xl -mt-5">
        <View className="mx-5 mb-10">
          <Text className="text-black font-zcool text-lg">
            Recurring QuestBit?
          </Text>
          <Text className="text-black font-zcool text-lg">
            Description
            <Text className="text-red font-zcool text-lg">*</Text>
          </Text>
          <TextInput
            editable
            multiline
            numberOfLines={4}
            maxLength={40}
            style={styles.textInput2}
            value={description}
            onChangeText={setDescription}
            placeholderTextColor="black"
            className="text-xl mb-5"
          />
          <Text className="text-black font-zcool text-lg">
            Icon<Text className="text-red font-zcool text-lg">*</Text>
          </Text>
          <Image
            source={require("../../assets/HD/chest.png")}
            style={{ width: 48, height: 48 }}
          />
          <Text className="text-black font-zcool text-lg mt-5">
            Target Date
          </Text>
          <View className="flex-row items-center mt-2">
            <Icon name="clock" size={20} color="#FFF" />
            <Text className="font-zcool text-black text-xl px-2">
              January 4, 2024
            </Text>
          </View>
        </View>
        <PixelButton text="LAUNCH!" color="blue" />
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
    borderBottomWidth: 1,
    borderBottomColor: "black",
    color: "black",
    width: "100%",
    fontFamily: "ZCOOL",
    padding: 5,
  },
});

export default Create;
