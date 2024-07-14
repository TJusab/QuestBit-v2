import React, { useState } from "react";
import { View, Text, TextInput, Image, StyleSheet, Alert } from "react-native";
import PixelButton from "../../components/PixelButton.js";
import { logout } from "../../lib/account.js";
import { router } from "expo-router";
import { getUserIcon } from "../../lib/icon.js";
import { useGlobalContext } from "../../context/GlobalProvider.js";

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
    <View style={styles.container}>
      <Text style={styles.header}>My Profile!</Text>
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

      <View style={styles.notificationContainer}>
        <Text style={styles.label}>Notifications</Text>
      </View>

      <View style={styles.buttonContainer}>
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

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    alignItems: "center",
    padding: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    fontFamily: "PressStart2P",
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
  notificationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 30,
  },
  saveButton: {
    backgroundColor: "#ffcc00", // Example color
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    alignItems: "center",
  },
  logoutButton: {
    backgroundColor: "#ff6600", // Example color
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default Profile;
