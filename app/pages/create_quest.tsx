import { router } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { useEffect } from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Icon from "react-native-vector-icons/FontAwesome5";
import PixelButton from "@/components/PixelButton";
import { useState } from "react";
import AddPeopleModal from "../../components/AddPeoplePopUp";
import { getUserIcon } from "../../utils/icon";
import IconPickerModal from "@/components/IconPickerPopUp";
import { getQuestIcon } from "@/utils/icon";
import CalendarModal from "../../components/CalendarPopUp";
import { addQuest } from "../../lib/database";
import { Quest, User } from "@/constants/types";
import { QuestIcon } from "@/constants/enums";
import { useGlobalContext } from "@/context/GlobalProvider";
import * as Notifications from "expo-notifications";
import { getCurrentUser } from "@/lib/account";
import {
  documentToQuest,
  documentToUser,
} from "@/utils/mapping";

interface CreateQuestAttributes {
  title: string;
  icon: QuestIcon;
  questInfo: string;
  adventurerIds: string[];
  deadline: Date | null;
}

const CreateQuest = () => {
  const { quests, setQuests, expoPushToken } = useGlobalContext();
  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [visible, setVisible] = useState(false);
  const [iconModalVisible, setIconModalVisible] = useState(false);
  const [selectedAdventurers, setSelectedAdventurers] = useState<User[]>([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedIcon, setSelectedIcon] = useState<QuestIcon | null>(null);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [formattedDate, setFormattedDate] = useState("");

  const defaultImage = require("../../assets/HD/add_button.png");
  const selectedImage = selectedIcon
    ? getQuestIcon(selectedIcon)
    : defaultImage;

  const handleAddAdventurers = (adventurers: User[]) => {
    setSelectedAdventurers(adventurers);
  };

  const handleDeleteAdventurer = (adventurerId: string) => {
    setSelectedAdventurers((prevAdventurers) =>
      prevAdventurers.filter((adventurer) => adventurer.$id !== adventurerId)
    );

    setRefreshKey((prevKey) => prevKey + 1);
  };

  const handleIconUpdate = (icon: QuestIcon) => {
    setSelectedIcon(icon);
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

  const handleAddQuest = async () => {
    if (!title || !selectedIcon) {
      Alert.alert("Please fill in all the required fields.");
      return;
    }
    try {
      const attributes: CreateQuestAttributes = {
        title: title,
        icon: selectedIcon,
        questInfo: synopsis.length > 0 ? synopsis : "",
        adventurerIds:
          selectedAdventurers.length > 0
            ? selectedAdventurers.map((adventurer) => adventurer.$id)
            : [],
        deadline: selectedDate ? new Date(selectedDate) : null,
      };

      const newQuest: Quest = documentToQuest(await addQuest(attributes));
      setQuests((prevQuests) => [...prevQuests, newQuest]);

      if (expoPushToken) {
        await sendPushNotification(expoPushToken, newQuest.title);
      } else {
        console.log("No push token available");
      }

      Alert.alert("Quest added successfully!");
      router.replace("/quest-page?refresh=true");
    } catch (error) {
      Alert.alert("Error adding quest:", (error as Error).message);
    }
  };

  // Add this function to send the push notification
  async function sendPushNotification(
    expoPushToken: string,
    questTitle: string
  ) {
    const message = {
      to: expoPushToken,
      sound: "default",
      title: "New Quest Created!",
      body: `A new quest "${questTitle}" has been created.`,
      data: { someData: "goes here" },
    };

    const result = await Notifications.scheduleNotificationAsync({
      content: {
        title: message.title,
        body: message.body,
        data: message.data,
      },
      trigger: null, // null means send immediately
    });
  }

  const [currentUser, setCurrentUser] = useState<User | null>(null); // State accepts User or null

  useEffect(() => {
    async function fetchUser() {
      const user = await getCurrentUser();  // Returns User or null
      if (user) {
        setCurrentUser(user);  // If user is not null, convert it and set it
      } else {
        setCurrentUser(null);  // Set it to null if no user is found
      }
    }
    fetchUser();
  }, []);

  return (
    <View className="flex-1">
      <View className="h-[40%] bg-white rounded-b-3xl z-10">
        <View className="w-full">
          <View className="flex-row items-center justify-between px-4 mt-10">
            <TouchableOpacity onPress={() => router.back()}>
              <MaterialIcons
                name="keyboard-backspace"
                size={30}
                color="black"
              />
            </TouchableOpacity>
            <View className="flex-1 items-center">
              <View className="flex-row items-center">
                <Text className="font-zcool text-3xl mr-5">
                  Add Adventurers
                </Text>
              </View>
            </View>
          </View>
          <View className="flex-row mx-3 items-center mb-10 mt-8">
            {selectedAdventurers.length > 0 &&
              selectedAdventurers.map((adventurer) => (
                <View className="items-center mx-5" key={adventurer.$id}>
                  <Image
                    source={getUserIcon(adventurer.icon)}
                    style={{ width: 70, height: 70 }}
                    resizeMode="stretch"
                  />
                  <Text className="font-zcool text-lg">
                    {adventurer.username}
                  </Text>
                  <TouchableOpacity
                    className="absolute bottom-[15%] right-0"
                    onPress={() => handleDeleteAdventurer(adventurer.$id)}
                  >
                    <MaterialIcons name="remove-circle" size={24} color="red" />
                  </TouchableOpacity>
                </View>
              ))}
          </View>
        </View>
        <TouchableOpacity
          onPress={() => setVisible(true)}
          className="absolute bottom-0 right-0 mx-5 my-5"
        >
          <Image
            source={require("../../assets/HD/add_button.png")}
            style={{ width: 40, height: 40 }}
          />
        </TouchableOpacity>
      </View>
      <View className="flex-1 bg-blue-200 -mt-5">
        <Text className="text-3xl font-zcool text-white mt-10 text-center">
          Create a Quest
        </Text>
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
          <Text className="text-white font-zcool text-lg">
            Icon<Text className="text-red font-zcool text-lg">*</Text>
          </Text>
          <TouchableOpacity onPress={() => setIconModalVisible(true)}>
            <Image source={selectedImage} style={{ width: 40, height: 40 }} />
          </TouchableOpacity>
          <Text className="text-white font-zcool text-lg mt-5">Synopsis</Text>
          <TextInput
            style={styles.textInput}
            value={synopsis}
            onChangeText={setSynopsis}
            placeholderTextColor="white"
            className="text-xl"
          />
          <Text className="text-white font-zcool text-lg mt-5">
            Target Date
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
          </View>
        </View>
        <PixelButton text="LAUNCH!" color="blue" onPress={handleAddQuest} />
      </View>
      <AddPeopleModal
        visible={visible}
        onClose={() => setVisible(false)}
        onUpdate={handleAddAdventurers}
        selectedAdventurers={selectedAdventurers}
        refreshKey={refreshKey}
        text="Recruit adventurers to your quest!"
        except={currentUser || undefined} 
      />
      <IconPickerModal
        visible={iconModalVisible}
        onClose={() => setIconModalVisible(false)}
        onUpdate={handleIconUpdate}
      />
      <CalendarModal
        visible={isCalendarVisible}
        onClose={() => setIsCalendarVisible(false)}
        onUpdate={handleDateUpdate}
      />
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
});

export default CreateQuest;
