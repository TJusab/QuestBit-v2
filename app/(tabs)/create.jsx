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
import { useState } from "react";

const Create = () => {
  const [title, setTitle] = useState("Birthday Party Planning");
  const [synopsis, setSynopsis] = useState(
    "Plan a successful surprise birthday party for Bob."
  );
  return (
    <View className="flex-1">
      <View className="z-0 h-[40%] bg-white z-10">
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
              <Text className="font-zcool text-3xl">Add Adventurers</Text>
            </View>
          </View>
        </View>
      </View>
      <View className="z-10 flex-1 bg-blue-200 rounded-t-3xl -mt-5">
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

export default Create;
