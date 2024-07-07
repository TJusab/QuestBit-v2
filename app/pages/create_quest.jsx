import { router } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Icon from "react-native-vector-icons/FontAwesome5";
import PixelButton from "../../components/PixelButton";
import { useEffect, useState } from "react";
import AddPeopleModal from "../../components/AddPeoplePopUp";
import { fetchAdventurers } from "../../lib/database";
import { getUserIcon } from "../../lib/icon";

const CreateQuest = () => {
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("Birthday Party Planning");
  const [synopsis, setSynopsis] = useState(
    "Plan a successful surprise birthday party for Bob."
  );
  const [visible, setVisible] = useState("false");
  const [selectedAdventurers, setSelectedAdventurers] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAddAdventurers = (adventurers) => {
    setSelectedAdventurers(adventurers);
  };

  const handleDeleteAdventurer = (adventurerId) => {
    setSelectedAdventurers((prevAdventurers) =>
      prevAdventurers.filter((adventurer) => adventurer.$id !== adventurerId)
    );

    setRefreshKey((prevKey) => prevKey + 1)
  };

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
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => setVisible(true)}
                >
                  <Image
                    source={require("../../assets/HD/add_circle_button.png")}
                    style={{ width: 40, height: 40 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View className="flex-row mx-3 items-center mb-10 mt-8">
            {selectedAdventurers.length > 0 &&
              selectedAdventurers.map((adventurer) => (
                <View className="items-center mx-5" key={adventurer.$id}>
                  <Image
                    source={getUserIcon(adventurer.icon)}
                    style={{ width: 80, height: 80 }}
                    resizeMode="stretch"
                  />
                  <Text className="font-zcool text-lg">
                    {adventurer.username}
                  </Text>
                  <TouchableOpacity className="absolute bottom-[15%] right-0" onPress={() => handleDeleteAdventurer(adventurer.$id)}>
                    <MaterialIcons name="remove-circle" size={24} color="red" />
                  </TouchableOpacity>
                </View>
              ))}
          </View>
        </View>
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
          <Image
            source={require("../../assets/HD/chest.png")}
            style={{ width: 48, height: 48 }}
          />
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
          <View className="flex-row items-center mt-2">
            <Icon name="clock" size={20} color="#FFF" />
            <Text className="font-zcool text-white text-xl px-2">
              January 4, 2024
            </Text>
          </View>
        </View>
        <PixelButton text="LAUNCH!" color="blue" />
      </View>
      <AddPeopleModal
        visible={visible}
        onClose={() => setVisible(false)}
        onUpdate={handleAddAdventurers}
        selectedAdventurers={selectedAdventurers}
        refreshKey={refreshKey}
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
