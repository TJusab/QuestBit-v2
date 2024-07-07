import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  ImageBackground,
  Image,
  Alert,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import PixelButton from "./PixelButton";
import { fetchAdventurers } from "../lib/database";
import { getUserIcon } from "../lib/icon";
import { addAdventurersToQuest } from "../lib/database";

const AddPeoplePopUp = ({ visible, onClose, value, questbitId, onUpdate }) => {
  const [selectedAdventurers, setSelectedAdventurers] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAdventurers = async () => {
    try {
      const response = await fetchAdventurers();
      setItems(response);
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAdventurers();
  }, []);

  const handleAdventurerPress = (adventurerId) => {
    const index = selectedAdventurers.indexOf(adventurerId);
    if (index === -1) {
      setSelectedAdventurers([...selectedAdventurers, adventurerId]);
    } else {
      const updatedSelection = [...selectedAdventurers];
      updatedSelection.splice(index, 1);
      setSelectedAdventurers(updatedSelection);
    }
  }

  const isSelected = (adventurerId) => {
    return selectedAdventurers.includes(adventurerId);
  }

  const addAdventurers = () => {
    onUpdate(selectedAdventurers);
    onClose();
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 items-center justify-center">
        <View className="w-4/5 h-4/5 items-center justify-center">
          <ImageBackground
            source={require("../assets/HD/paper.png")}
            className="w-full h-full items-center justify-center"
            resizeMode="contain"
          >
            <View>
              <Text className="font-zcool text-xl text-brown-200 text-center px-10 pt-5">
                Recruit adventurers for this Quest
              </Text>
              <View className="flex-row mx-3 justify-center items-center my-10">
                {items.length > 0 &&
                  items.map((adventurer) => (
                    <View
                      className="items-center justify-between mx-5"
                      key={adventurer.$id}
                    >
                      <TouchableOpacity onPress={() => handleAdventurerPress(adventurer)}
                        className={`${isSelected(adventurer) ? "border-navy border-2" : "border-2 border-transparent"}`}>
                        <Image
                          source={getUserIcon(adventurer.icon)}
                          style={{ width: 40, height: 40 }}
                          resizeMode="stretch"
                        />
                        <Text className="font-zcool text-brown-200">
                          {adventurer.username}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ))}
              </View>
              <View className="flex-row items-center justify-center ml-10">
                <PixelButton
                  text="Cancel"
                  textStyle="text-sm"
                  color="red"
                  onPress={onClose}
                />
                <PixelButton text="Add" textStyle="text-sm" onPress={addAdventurers} />
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  selectedItem: {
    borderWidth: 1,
    borderColor: 'green', // Green border when selected
  },
})

export default AddPeoplePopUp;
