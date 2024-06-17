import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import PixelButton from "../../components/PixelButton";
import { logout, getCurrentUser } from '../../lib/account';
import { router } from 'expo-router';
import { getUserIcon } from '../../lib/icon.js';

const Profile = () => {
  const [nickname, setNickname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [icon, setIcon] = useState('');
  const [notifications, setNotifications] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const result = await getCurrentUser();
        setUsername(result.username);
        setEmail(result.email);
        setIcon(getUserIcon("Default"));
      } catch (error) {
        Alert.alert("Error", "Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  const submit = async () => {
    setIsSubmitting(true);
    try {
      await logout();
      router.replace("/log-in");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color="#6E7591" size="large" />
        </View>
      ) : (
        <>
          <Text style={styles.header}>My Profile!</Text>
          <Image source={icon} style={styles.avatar} />

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
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <View style={styles.notificationContainer}>
            <Text style={styles.label}>Notifications</Text>
            {/* Add CheckBox or other components here */}
          </View>

          <View style={styles.buttonContainer}>
            <PixelButton 
              text="SAVE!" 
              onPress={submit} 
              isLoading={isSubmitting}
              color="green"
            />
            <PixelButton 
              text="LOGOUT!" 
              onPress={submit} 
              isLoading={isSubmitting}
              color="red"
            />
          </View>
        </>
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    alignItems: 'center',
    padding: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'PressStart2P', 
  },
  avatar: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  label: {
    alignSelf: 'flex-start',
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 5,
    fontFamily: 'ZCOOL', 
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 7,
    marginBottom: 10,
    backgroundColor: 'lightgray'
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 30,
  },
  saveButton: {
    backgroundColor: '#ffcc00', // Example color
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#ff6600', // Example color
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default Profile;
