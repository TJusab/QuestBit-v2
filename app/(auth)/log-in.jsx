import { View, ScrollView, ImageBackground, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Form from "../../components/Form";
import { getCurrentUser, login } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { router } from "expo-router";

const LogIn = () => {
  const { setUser, setIsLogged } = useGlobalContext();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const formFields = [
    { title: "Email", name: "email", keyboardType: "email-address" },
    { title: "Password", name: "password" },
  ];

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setIsSubmitting(true);
    try {
      await login(form.email, form.password);
      const result = await getCurrentUser();
      setUser(result);
      setIsLogged(true);

      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-blue-300 h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="flex-1 w-full h-full">
          <ImageBackground
            source={require("../../assets/images/log-in.png")}
            className="flex-1 items-center justify-center"
            resizeMode="cover"
          >
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
