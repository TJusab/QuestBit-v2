import React, { useState } from "react";
import { View, Text, TextInput, Image, StyleSheet, Alert, ScrollView } from "react-native";
import PixelButton from "@/components/PixelButton";
import { logout } from "../../lib/account";
import { router } from "expo-router";
import { getUserIcon } from "../../utils/icon";
import { useGlobalContext } from "../../context/GlobalProvider";
import FormField from "@/components/FormField";
import { User } from "@/constants/types";

const EditProfile = () => {
  const { user } = useGlobalContext();
  const loggedInUser  = user as User;

  const [nickname, setNickname] = useState("");
  const [username, setUsername] = useState(loggedInUser.username);
  const [email, setEmail] = useState(loggedInUser.email);
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <ScrollView>
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
          <PixelButton
            text="SAVE!"
            onPress={() => console.log("Save button pressed")}
            isLoading={isSubmitting}
            color="green"
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default EditProfile;
