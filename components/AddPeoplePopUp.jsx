import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  ImageBackground,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import PixelButton from "./PixelButton";
import { fetchAdventurers } from "../lib/database";
import { getUserIcon } from "../lib/icon";

const AddPeoplePopUp = ({
  visible,
  onClose,
  onUpdate,
  selectedAdventurers: parentSelectedAdventurers,
  refreshKey,
}) => {
  const [selectedAdventurers, setSelectedAdventurers] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSelectedAdventurers(parentSelectedAdventurers);
  }, [parentSelectedAdventurers, refreshKey]);

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
  };

  const isSelected = (adventurerId) => {
    return selectedAdventurers.includes(adventurerId);
  };

  const addAdventurers = () => {
    onUpdate(selectedAdventurers);
    onClose();
  };

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
              <View className="flex-row mx-3 justify-center items-center mt-5 mb-10">
                {items.length > 0 &&
                  items.map((adventurer) => (
                    <View
                      className="items-center justify-between mx-3"
                      key={adventurer.$id}
                    >
                      <TouchableOpacity
                        onPress={() => handleAdventurerPress(adventurer)}
                        className={`${
                          isSelected(adventurer)
                            ? "border-navy border-2 items-center"
                            : "border-2 border-transparent items-center"
                        }`}
                      >
                        <Image
                          source={getUserIcon(adventurer.icon)}
                          style={{ width: 60, height: 60 }}
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
                <PixelButton
                  text="Add"
                  textStyle="text-sm"
                  onPress={addAdventurers}
                />
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>
    </Modal>
  );
};

export default AddPeoplePopUp;
