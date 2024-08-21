import React, { useState } from "react";
import { View, Text, Image, ScrollView, Alert } from "react-native";
import PixelButton from "@/components/PixelButton";
import { getUserIcon } from "../../utils/icon";
import { useGlobalContext } from "../../context/GlobalProvider";
import FormField from "@/components/FormField";
import { DrawerParamList, User } from "@/constants/types";
import { saveProfileSettings } from "@/lib/account";
import { DrawerNavigationProp } from "@react-navigation/drawer";

interface EditProfileFields {
  username: string;
  email: string;
  password: string;
}

interface EditProfileProps {
  navigation: DrawerNavigationProp<DrawerParamList, 'EditProfile'>
}

const EditProfile: React.FC<EditProfileProps> = ({ navigation }) => {
  const { user } = useGlobalContext();
  const loggedInUser = user as User;

  const [username, setUsername] = useState(loggedInUser.username);
  const [email, setEmail] = useState(loggedInUser.email);
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSaveSettings = async () => {
    try {
      const updatedFields: EditProfileFields = {
        username: username,
        email: email,
        password: password,
      };

      await saveProfileSettings(updatedFields);
      Alert.alert("User settings saved successfully!");
    } catch (error) {
      Alert.alert("Error saving profile settings:", (error as Error).message);
    }
  };

  return (
    <ScrollView className="bg-blue-50">
      <View className="justify-center items-center mt-10">
        <Text className="font-press text-3xl mb-5 text-navy">
          {loggedInUser.username}
        </Text>
        <Image
          className="mb-3"
          source={getUserIcon(loggedInUser.icon)}
          style={{ width: 100, height: 100 }}
        />
        <View className="font-zcool mt-10">
          <View className="mb-5">
            <FormField
              title="Username"
              value={username}
              handleChangeText={setUsername}
              inputStyle="bg-lightgray border-transparent"
              textStyle="text-navy"
              color="#2E3A59"
            />
          </View>
          <View className="mb-5">
            <FormField
              title="Email"
              value={email}
              handleChangeText={setEmail}
              inputStyle="bg-lightgray border-transparent"
              textStyle="text-navy"
              color="#2E3A59"
            />
          </View>
          <View className="mb-5">
            <FormField
              title="Password"
              value={password}
              handleChangeText={setPassword}
              inputStyle="bg-lightgray border-transparent"
              textStyle="text-navy"
              color="#2E3A59"
              iconColor="#2E3A59"
            />
          </View>
        </View>

        <View className="flex-row mt-10">
          <PixelButton text="SAVE!" onPress={handleSaveSettings} />
        </View>
      </View>
    </ScrollView>
  );
};

export default EditProfile;
