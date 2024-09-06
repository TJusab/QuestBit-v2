import { router } from "expo-router";
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useState, useEffect, useCallback } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import CheckBox from "expo-checkbox";
import DropDownPicker, {
  ItemType,
  ValueType,
} from "react-native-dropdown-picker";
import { Divider } from "@rneui/themed";
import { Difficulty, Recurrence } from "@/constants/enums";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/FontAwesome5";
import CalendarModal from "../../components/CalendarPopUp";
import { addQuestBit, getQuests } from "../../lib/database";
import { Status } from "../../constants/enums";
import AntDesign from "react-native-vector-icons/AntDesign";
import PixelButton from "@/components/PixelButton";

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
  dueDates: Date[];
  quests: Quest;
  description: string;
  status: Status;
  difficulty: Difficulty;
  assignees: User[];
}

const Create = () => {
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState<Date | null>(null);
  const [dueDates, setDueDates] = useState<Date[]>([]);
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

  const [recurrOpen, setRecurrOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  const [questsOptions, setQuestsOptions] = useState<Quest[]>([]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const data = [{ key: '1' }]; // Dummy data for FlatList

  let newDueDates: Date[] = [];

  useEffect(() => {
    const fetchQuests = async () => {
      try {
        const response: Quest[] = await getQuests();
        setQuestsOptions(response);
      } catch (error) {
        Alert.alert("Error", (error as Error).message);
      }
    };

    fetchQuests();
  }, []); // Dependency array is empty, so this effect only runs once on mount

  // Convert quest options into dropdown items
  const questDropdown: ItemType<Quest>[] = questsOptions.map((key) => ({
    label: key.title,
    value: key,
  }));

  const recurrenceOptions = [
    { label: "Daily", value: "Daily" },
    { label: "Weekly", value: "Weekly" },
    { label: "Biweekly", value: "Biweekly" },
    { label: "Monthly", value: "Monthly" },
    { label: "Annually", value: "Annually" },
  ];

  /*
  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    const currentDate = selectedDate ? selectedDate : null;
    setShowDatePicker(false);
    setDueDate(currentDate);
  };
  */

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
  /*
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
  */

  useEffect(() => {
    if (recurrenceOption) {
      handleRecurrenceUpdate(recurrenceOption);
    }
  }, [recurrenceOption]);

  const handleRecurrenceUpdate = useCallback((newRecurrence: string) => {
    let newDueDates: Date[] = [];
    const deadline = new Date(selectedDate);
    setRecurrenceOption(newRecurrence);

    switch (recurrenceOption) {
      case Recurrence.NoRepeat:
        newDueDates = [new Date(selectedDate)];
        break;
      case Recurrence.Daily:
        newDueDates = calculateDailyDueDates(new Date(selectedDate), deadline);
        break;
      case Recurrence.Weekly:
        newDueDates = calculateWeeklyDueDates(new Date(selectedDate), deadline);
        break;
      case Recurrence.BiWeekly:
        newDueDates = calculateBiWeeklyDueDates(
          new Date(selectedDate),
          deadline
        );
        break;
      case Recurrence.Monthly:
        newDueDates = calculateMonthlyDueDates(
          new Date(selectedDate),
          deadline
        );
        break;
      case Recurrence.Annually:
        newDueDates = calculateAnnuallyDueDates(
          new Date(selectedDate),
          deadline
        );
        break;
      default:
        newDueDates = [new Date(selectedDate)];
        break;
    }
    setDueDates(newDueDates);
  }, []);

  const calculateDailyDueDates = (startDate: Date, deadline: Date): Date[] => {
    let dueDates: Date[] = [];
    let currentDate = new Date(startDate);

    const deadlineUTC = new Date(deadline);
    const currentDateUTC = new Date(currentDate.toISOString());

    while (currentDateUTC <= deadlineUTC) {
      dueDates.push(new Date(currentDateUTC));
      currentDateUTC.setDate(currentDateUTC.getDate() + 1);
    }

    return dueDates;
  };

  const calculateWeeklyDueDates = (startDate: Date, deadline: Date): Date[] => {
    let dueDates: Date[] = [];
    let currentDate = new Date(startDate);

    const deadlineUTC = new Date(deadline);
    const currentDateUTC = new Date(currentDate.toISOString());

    while (currentDateUTC <= deadlineUTC) {
      dueDates.push(new Date(currentDateUTC));
      currentDateUTC.setDate(currentDateUTC.getDate() + 7);
    }

    return dueDates;
  };

  const calculateBiWeeklyDueDates = (
    startDate: Date,
    deadline: Date
  ): Date[] => {
    let dueDates: Date[] = [];
    let currentDate = new Date(startDate);

    const deadlineUTC = new Date(deadline);
    const currentDateUTC = new Date(currentDate.toISOString());

    while (currentDateUTC <= deadlineUTC) {
      dueDates.push(new Date(currentDateUTC));
      currentDateUTC.setDate(currentDateUTC.getDate() + 14);
    }

    return dueDates;
  };

  const calculateMonthlyDueDates = (
    startDate: Date,
    deadline: Date
  ): Date[] => {
    let dueDates: Date[] = [];
    let currentDate = new Date(startDate);

    const deadlineUTC = new Date(deadline);
    const currentDateUTC = new Date(currentDate.toISOString());

    while (currentDateUTC <= deadlineUTC) {
      dueDates.push(new Date(currentDateUTC));
      currentDateUTC.setMonth(currentDateUTC.getMonth() + 1);
    }

    return dueDates;
  };

  const calculateAnnuallyDueDates = (
    startDate: Date,
    deadline: Date
  ): Date[] => {
    let dueDates: Date[] = [];
    let currentDate = new Date(startDate);

    const deadlineUTC = new Date(deadline);
    const currentDateUTC = new Date(currentDate.toISOString());

    while (currentDateUTC <= deadlineUTC) {
      dueDates.push(new Date(currentDateUTC));
      currentDateUTC.setFullYear(currentDateUTC.getFullYear() + 1);
    }

    return dueDates;
  };

  const handleAddQuestBit = async () => {
    if (!title || !selectedDate || !quest || !description) {
      Alert.alert("Please fill in all the required fields.");
      return;
    }
    try {
      const attributes: CreateQuestBitAttributes = {
        title: title,
        dueDates: isRecurring ? newDueDates : [new Date(selectedDate)],
        quests: quest,
        description: description,
        status: status,
        difficulty: difficulty,
        assignees: selectedAdventurers,
      };

      await addQuestBit(attributes);
      Alert.alert("Questbit added successfully!");
      router.replace("/home?refresh=true");
    } catch (error) {
      Alert.alert("Error adding questbit:", (error as Error).message);
    }
  };

  // Updated function to handle either a boolean or a functional update
  const handleQuestOpen = (open: boolean | ((prevOpen: boolean) => boolean)) => {
    const isOpen = typeof open === 'function' ? open(questOpen) : open;
    setQuestOpen(isOpen);
    setIsDropdownOpen(isOpen); // Sync scroll-enabled state
  };

  // Updated function to handle either a boolean or a functional update
  const handleRecurrOpen = (open: boolean | ((prevOpen: boolean) => boolean)) => {
    const isOpen = typeof open === 'function' ? open(recurrOpen) : open;
    setRecurrOpen(isOpen);
    setIsDropdownOpen(isOpen); // Sync scroll-enabled state
  };

  return (
    <FlatList
      data={data}
      renderItem={() => (
    
    <View className="flex-1">
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
            <Text className="text-white font-zcool text-lg mt-5">
              Due Date<Text className="text-red font-zcool text-lg">*</Text>
            </Text>
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
          <Text className="text-gray-100 font-zcool text-lg">
            Quest
            <Text className="text-red font-zcool text-lg">*</Text>
          </Text>
          <View className="mt-3 mb-5">
            <DropDownPicker
              open={questOpen}
              value={quest}
              items={questDropdown}
              setOpen={handleQuestOpen} // Call synchronized function
              setValue={setQuest}
              placeholder="Select quest"
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdown}
              textStyle={styles.labelStyle}
            />
          </View>
          <Divider color="black" />
          <View className="flex-row justify-between items-center mt-5 mb-5">
            <View className="flex flex-col space-y-2">
              <Text className="text-black font-zcool text-lg text-gray-100">
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
                open={recurrOpen}
                value={recurrenceOption}
                items={recurrenceOptions}
                setOpen={handleRecurrOpen}
                setValue={setRecurrenceOption}
                onChangeValue={(value) => {}}
                placeholder="Select recurrence option"
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdown}
                textStyle={styles.labelStyle}
              />
            </View>
          </View>
          <Divider color="black" />
          <Text className="text-gray-100 font-zcool text-lg mt-3">
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
              <Text className="text-gray-100 font-zcool text-lg">Status</Text>
              <View className="items-start">
                <StatusButton
                  color={getColorFromStatus(status)}
                  text={status}
                  textStyle="text-sm"
                />
              </View>
            </View>

            <View className="flex-col">
              <Text className="text-gray-100 font-zcool text-lg">
                Difficulty
              </Text>
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
            <Text className="text-gray-100 font-zcool text-lg">Assignees</Text>
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
          <PixelButton
            text="Create questBit!"
            textStyle="text-sm"
            onPress={handleAddQuestBit}
          />
        </View>
      </View>
      <CalendarModal
        visible={isCalendarVisible}
        onClose={() => setIsCalendarVisible(false)}
        onUpdate={handleDateUpdate}
      />
    </View>
    
  )}
  keyExtractor={(item) => item.key}
/>
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
