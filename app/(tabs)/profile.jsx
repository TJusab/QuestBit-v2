import { useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native'
import PixelButton from "../../components/PixelButton";
import { logout } from '../../lib/appwrite';
import { router } from 'expo-router';

const Profile = () => {

  const [isSubmitting, setIsSubmitting] = useState(false);

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
    <View className="flex-1 justify-center items-center">
      <PixelButton 
        text="Sign Out" 
        onPress={submit} 
        isLoading={isSubmitting}
      />
    </View>
  );
}

export default Profile;