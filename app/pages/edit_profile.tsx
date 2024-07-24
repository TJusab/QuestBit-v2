import React, { useState } from "react";
import { View, Text, TextInput, Image, StyleSheet, Alert } from "react-native";
import PixelButton from "@/components/PixelButton";
import { logout } from "../../lib/account";
import { router } from "expo-router";
import { getUserIcon } from "../../utils/icon";
import { useGlobalContext } from "../../context/GlobalProvider";
import FormField from "@/components/FormField";

const Profile = () => {
  const { user } = useGlobalContext();

  const [nickname, setNickname] = useState("");
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <View className="justify-center items-center mt-10">
      <Text className="font-press text-2xl">{user.username}</Text>
      <Image
        source={getUserIcon(user.icon)}
        style={{ width: 100, height: 100 }}
      />
      <View className="font-zcool">
        <FormField title="Nickname" value={nickname} handleChangeText={setNickname} inputStyle="bg-lightgray border-gray" textStyle="text-navy" color="#2E3A59" />
        <FormField title="Username" value={username} handleChangeText={setUsername} inputStyle="bg-lightgray border-gray" textStyle="text-navy" color="#2E3A59"/>
        <FormField title="Email" value={email} handleChangeText={setEmail} inputStyle="bg-lightgray border-gray" textStyle="text-navy" color="#2E3A59"/>
        <FormField title="Password" value={password} handleChangeText={setPassword} inputStyle="bg-lightgray border-gray" textStyle="text-navy" color="#2E3A59" iconColor="#2E3A59"/>
      </View>

      <View className="flex-row mt-10">
        <PixelButton
          text="SAVE!"
          onPress={() => console.log("Save button pressed")}
          isLoading={isSubmitting}
          color="green"
        />
      </View>
    </View>
  );
};

export default Profile;
