import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  ScrollView, // Import ScrollView
} from "react-native";
import PixelButton from "../../components/PixelButton.jsx";
import { logout, saveProfileSettings } from "../../lib/account.js";
import { useNavigation } from "@react-navigation/native"; // Adjusted import
import { getUserIcon } from "../../lib/icon.js";
import { useGlobalContext } from "../../context/GlobalProvider.js";

const Profile = () => {
  const { user } = useGlobalContext();
  const navigation = useNavigation();

  const [nickname, setNickname] = useState("");
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitLogout = async () => {
    setIsSubmitting(true);
    try {
      await logout();
      navigation.replace("LogIn"); // Adjusted navigation
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const save = async () => {
    setIsSubmitting(true);
    try {
      await saveProfileSettings();
      Alert.alert("Success", "New settings saved successfully!");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View className="flex-1">
      <ScrollView className="pt-5 px-10" contentContainerStyle={styles.container}>
        <Image source={getUserIcon(user.icon)} style={styles.avatar} />

        <Text style={styles.label}>Nickname</Text>
        <TextInput
          style={styles.input}
          value={nickname}
          onChangeText={setNickname}
        />

        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />

        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <View style={styles.buttonContainer}>
          <PixelButton
            text="SAVE!"
            onPress={save}
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
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
    alignItems: "center"
  },
  avatar: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 5,
    fontFamily: "ZCOOL",
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 7,
    marginBottom: 10,
    backgroundColor: "lightgray",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 30,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default Profile;
