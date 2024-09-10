import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  ImageBackground,
  Image,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import PixelButton from "./PixelButton";
import { fetchAdventurers } from "../lib/database";
import { getUserIcon } from "../utils/icon";
import { User } from "../constants/types";

interface AddPeoplePopUpProps {
  visible: boolean;
  onClose: () => void;
  onUpdate: (selectedAdventurers: User[]) => void;
  selectedAdventurers: User[];
  refreshKey: number;
  text: string;
  except?: User[]; 
}

const AddPeoplePopUp: React.FC<AddPeoplePopUpProps> = ({
  visible,
  onClose,
  onUpdate,
  selectedAdventurers: parentSelectedAdventurers,
  refreshKey,
  text,
  except,
}) => {
  const [selectedAdventurers, setSelectedAdventurers] = useState<User[]>([]);
  const [items, setItems] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSelectedAdventurers(parentSelectedAdventurers);
  }, [parentSelectedAdventurers, refreshKey]);

  const getAdventurers = async () => {
    try {
      const response = await fetchAdventurers();
      const filteredResponse = except 
        ? response.filter(adventurer => !except.some(user => user.$id === adventurer.$id))
        : response;
      setItems(filteredResponse);
    } catch (error) {
      Alert.alert("Error", (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAdventurers();
  }, [except]);

  const handleAdventurerPress = (adventurer: User) => {
    const index = selectedAdventurers.indexOf(adventurer);
    if (index === -1) {
      setSelectedAdventurers([...selectedAdventurers, adventurer]);
    } else {
      const updatedSelection = [...selectedAdventurers];
      updatedSelection.splice(index, 1);
      setSelectedAdventurers(updatedSelection);
    }
  };

  const isSelected = (adventurer: User) => {
    return selectedAdventurers.includes(adventurer);
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
            source={require("../assets/HD/scrolls/paper.png")}
            className="w-full h-full items-center justify-center"
            resizeMode="contain"
          >
            <View className="absolute">
              <Text className="font-zcool text-xl text-brown-200 text-center px-10 pt-5">
                {text}
              </Text>
              <ScrollView
                contentContainerStyle={{ alignItems: "center" }}
                showsVerticalScrollIndicator={true}
                style={{ maxHeight: 140, maxWidth: 250, marginLeft: 10}}
              >
                <View className="flex-wrap flex-row justify-center">
                  {items.length > 0 &&
                    items.map((adventurer) => (
                      <View
                        className="justify-between m-2"
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
              </ScrollView>
              <View className="flex-row items-center justify-center ml-6 mt-2">
                <PixelButton
                  text="Cancel"
                  textStyle="text-sm"
                  color="red"
                  onPress={onClose}
                />
                <View className="m-2">
                  <PixelButton
                    text="Add"
                    textStyle="text-sm"
                    onPress={addAdventurers}
                  />
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>
    </Modal>
  );
};

export default AddPeoplePopUp;
