import { router } from "expo-router";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import CheckBox from "expo-checkbox";
import DropDownPicker, {
  ItemType,
  ValueType,
} from "react-native-dropdown-picker";
import { Divider } from "@rneui/themed";
import { Difficulty, RecurrenceValue } from "@/constants/enums";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/FontAwesome5";
import CalendarModal from "../../components/CalendarPopUp";
import { addQuestBit, getQuests } from "../../lib/database";
import { Status } from "../../constants/enums";
import AntDesign from "react-native-vector-icons/AntDesign";

import { User, Quest } from "@/constants/types";

import AddPeopleModal from "../../components/AddPeoplePopUp";
import StatusButton from "../../components/StatusButton";
import DifficultyButton from "../../components/DifficultyButton";
import {
  getColorFromStatus,
  getColorFromDifficulty,
  getPointsFromDifficulty,
} from "@/utils/utils";
import { getUserBodyIcon } from "@/utils/icon";

interface CreateQuestBitAttributes {
  title: string;
  deadline: Date | null;
  quest: Quest;
  isRecurring: boolean;
  recurrenceOption: string;
  description: string;
  status: Status;
  difficulty: Difficulty;
  adventurerIds: string[];
}

const Create = () => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurrenceOption, setRecurrenceOption] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(Status.Unassigned);
  const [difficulty, setDifficulty] = useState(Difficulty.EasyPeasy);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [formattedDate, setFormattedDate] = useState("");

  const [questOpen, setQuestOpen] = useState(false);
  const [quest, setQuest] = useState(null);

  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedAdventurers, setSelectedAdventurers] = useState<User[]>([]);

  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  const [questsOptions, setQuestsOptions] = useState<Quest[]>([]);

  const fetchQuests = async () => {
    try {
      const response: Quest[] = await getQuests();
      setQuestsOptions(response);
    } catch (error) {
      Alert.alert("Error", (error as Error).message);
    }
  };

  fetchQuests();

  const questDropdown: ItemType<ValueType>[] = [];

  for (const key of questsOptions) {
    let currQuest: ItemType<ValueType> = {
      label: key.title,
      value: key.toString(),
    };
    questDropdown.push(currQuest);
  }

  const recurrenceOptions = [
    { label: "Daily", value: "Daily" },
    { label: "Weekly", value: "Weekly" },
    { label: "Biweekly", value: "Biweekly" },
    { label: "Monthly", value: "Monthly" },
    { label: "Anually", value: "Anually" },
  ];

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    const currentDate = selectedDate ? selectedDate : null;
    setShowDatePicker(false);
    setDueDate(currentDate);
  };

  const handleDateUpdate = (dateString: string) => {
    setSelectedDate(dateString);
    const date = new Date(dateString);
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    }).format(date);
    setFormattedDate(formattedDate);
  };

  const handleAddAdventurers = (adventurers: User[]) => {
    setSelectedAdventurers(adventurers);
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

  const handleAddQuestBit = async () => {
    if (!title || !description || !quest) {
      Alert.alert("Please fill in all the required fields.");
      return;
    }
    try {
      const attributes: CreateQuestBitAttributes = {
        title: title,
        deadline: dueDate ? new Date(dueDate) : null,
        quest: quest,
        isRecurring: isRecurring,
        recurrenceOption: isRecurring ? recurrenceOption : "",
        description: description,
        status: status,
        difficulty: difficulty,
        adventurerIds:
          selectedAdventurers.length > 0
            ? selectedAdventurers.map((adventurer) => adventurer.$id)
            : [],
      };

      await addQuestBit(attributes);
      Alert.alert("Quest added successfully!");
      router.replace("/quest-page?refresh=true");
    } catch (error) {
      Alert.alert("Error adding questbit:", (error as Error).message);
    }
  };

  return (
    <ScrollView className="flex-1">
      <View className="z-0 bg-blue-200 z-10 mb-3">
        <View className="w-full mt-5 mb-5">
          <View className="flex-row items-center justify-between px-4 mt-10">
            <TouchableOpacity onPress={() => router.back()}>
              <MaterialIcons
                name="keyboard-backspace"
                size={30}
                color="white"
              />
            </TouchableOpacity>
            <View className="flex-1 items-center">
              <View className="flex-row items-center">
                <Text className="font-zcool text-3xl mr-5 text-white">
                  Create a QuestBit
                </Text>
              </View>
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
            <Text className="text-white font-zcool text-lg mt-5">Due Date</Text>
            <View>
              <TouchableOpacity
                onPress={() => setIsCalendarVisible(true)}
                className="flex-row items-center mt-2"
              >
                <Icon name="clock" size={20} color="#FFF" />
                <Text className="font-zcool text-white text-xl px-2">
                  {formattedDate}
                </Text>
              </TouchableOpacity>
              {/* <TouchableOpacity onPress={() => setShowDatePicker(true)}>
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
              )} */}
            </View>
          </View>
        </View>
      </View>
      <View className="z-10 shadow-xl flex-1 bg-white rounded-t-2xl -mt-10">
        <View className="mx-7 mb-10 mt-7">
          <Text className="text-gray font-zcool text-lg">
            Quest
            <Text className="text-red font-zcool text-lg">*</Text>
          </Text>
          <View className="mt-3 mb-5">
            <DropDownPicker
              open={questOpen}
              value={quest}
              items={questDropdown}
              setOpen={setQuestOpen}
              setValue={(newQuest) => setQuest(newQuest)}
              placeholder="Select quest"
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdown}
              textStyle={styles.labelStyle}
            />
          </View>
          <Divider color="black" />
          <View className="flex-row justify-between items-center mt-5 mb-5">
            <View className="flex flex-col space-y-2">
              <Text className="text-black font-zcool text-lg text-gray">
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
                value={recurrenceOption}
                items={recurrenceOptions}
                setOpen={setOpen}
                setValue={(newValue) => setRecurrenceOption(newValue)}
                placeholder="Select recurrence option"
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdown}
                textStyle={styles.labelStyle}
              />
            </View>
          </View>
          <Divider color="black" />
          <Text className="text-gray font-zcool text-lg mt-3">
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
          <View className="flex-row">
            <View className="flex-col mr-7">
              <Text className="text-gray font-zcool text-lg">Status</Text>
              <View className="items-start">
                <StatusButton
                  color={getColorFromStatus(status)}
                  text={status}
                  textStyle="text-sm"
                />
              </View>
            </View>

            <View className="flex-col">
              <Text className="text-gray font-zcool text-lg">Difficulty</Text>
              <View className="items-start">
                <DifficultyButton
                  color={getColorFromDifficulty(difficulty)}
                  text={
                    difficulty +
                    "  |  " +
                    getPointsFromDifficulty(difficulty) +
                    " XP"
                  }
                  textStyle="text-sm"
                />
              </View>
            </View>
          </View>
          <View className="flex-row mt-5">
            <Text className="text-gray font-zcool text-lg">Assignees </Text>
            <TouchableOpacity onPress={() => setVisible(true)}>
              <AntDesign name="pluscircle" size={25} color="green" />
            </TouchableOpacity>
            <AddPeopleModal
              visible={visible}
              onClose={() => setVisible(false)}
              onUpdate={handleAddAdventurers}
              selectedAdventurers={selectedAdventurers}
              refreshKey={refreshKey}
              text="Assign adventurers to this QuestBit"
            />
          </View>

          <View className="items-start grid grid-col-3 gap-4">
            {selectedAdventurers &&
              selectedAdventurers.map((assignee) => (
                <View
                  key={assignee.$id}
                  style={{ alignItems: "center", marginRight: 10 }}
                >
                  <Image
                    source={getUserBodyIcon(assignee.icon)}
                    style={styles.assigneeNames}
                  />
                  <TouchableOpacity style={styles.remove_assignee}>
                    <AntDesign name="minuscircle" size={25} color="red" />
                  </TouchableOpacity>
                  <Text>{assignee.username}</Text>
                </View>
              ))}
          </View>
        </View>

        <View className="mb-5">
          <TouchableOpacity
            className="items-center justify-center"
            onPress={handleAddQuestBit}
          >
            <Image
              source={require("../../assets/images/pixelButton.png")}
              className={`w-[86vw] h-14`}
            />
            <Text className={`text-white font-zcool absolute text-xl pb-1`}>
              CREATE QUESTBIT !
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <CalendarModal
        visible={isCalendarVisible}
        onClose={() => setIsCalendarVisible(false)}
        onUpdate={handleDateUpdate}
      />
    </ScrollView>
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
    borderBottomColor: "",
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
  assigneeNames: {
    width: 90,
    height: 90,
    marginBottom: 10,
  },
  remove_assignee: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Create;
