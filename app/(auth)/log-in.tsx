import { View, Text, ScrollView, ImageBackground, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Form from "../../components/Form"
import { getCurrentUser, login } from "../../lib/account";
import { useGlobalContext } from "../../context/GlobalProvider";
import { router } from 'expo-router'
import { globalStyles } from "../global_styles";

const LogIn = () => {
  const { setUser, setIsLogged } = useGlobalContext();

  const [form, setForm] = useState<Record<string, string>>({
    email: "",
    password: "",
  });

  const formFields = [
    { title: "Email", name: "email", keyboardType: "email-address" as const },
    { title: "Password", name: "password" },
  ];

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      await login(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLogged(true);

      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", (error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-sky h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="flex-1 w-full h-full">
          <ImageBackground
            source={require("../../assets/HD/background_no_scroll.png")}
            className="flex-1 items-center justify-center"
            resizeMode="cover"
          >
            <Text className="font-press text-3xl" style={globalStyles.title}>LOG IN</Text>
            <Form
              form={form}
              setForm={setForm}
              formFields={formFields}
              linkText="Don't have an account?"
              link="/sign-up"
              buttonText="Log In"
              buttonPress={submit}
              isLoading={isSubmitting}
            />
          </ImageBackground>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LogIn;