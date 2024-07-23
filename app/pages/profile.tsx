import React, { useState } from "react";
import { View, Text, TextInput, Image, StyleSheet, Alert } from "react-native";
import PixelButton from "@/components/PixelButton";
import { logout } from "../../lib/account";
import { router } from "expo-router";
import { getUserIcon } from "../../lib/icon";
import { useGlobalContext } from "../../context/GlobalProvider";
import { globalStyles } from "../global_styles";
import FormField from "@/components/FormField";

const Profile = () => {
  const { user } = useGlobalContext();

  const [nickname, setNickname] = useState("");
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitLogout = async () => {
    setIsSubmitting(true);
    try {
      await logout();
      router.replace("/log-in");
    } catch (error) {
      Alert.alert("Error", (error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="justify-center items-center mt-10">
      <Text className="font-press text-2xl">{user.username}</Text>
      <Image
        source={getUserIcon(user.icon)}
        style={{ width: 100, height: 100 }}
      />
      <View className="font-zcool">
        <FormField title="Nickname" value={nickname} handleChangeText={setNickname} />
        <FormField title="Username" value={username} handleChangeText={setUsername} />
        <FormField title="Email" value={email} handleChangeText={setEmail} />
        <FormField title="Password" value={password} handleChangeText={setPassword} />
      </View>

      <View className="flex-row mt-10">
        <PixelButton
          text="SAVE!"
          onPress={() => console.log("Save button pressed")}
          isLoading={isSubmitting}
          color="green"
        />
        <PixelButton
          text="LOGOUT!"
          onPress={submitLogout}
          isLoading={isSubmitting}
          color="red"
        />
      </View>
    </View>
  );
};

export default Profile;
