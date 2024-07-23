import { View, ScrollView, ImageBackground, Alert, Text } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Form from "@/components/Form";
import { register } from "../../lib/account";
import { useGlobalContext } from "../../context/GlobalProvider";
import { router } from "expo-router";
import { globalStyles } from "../global_styles";

const SignUp = () => {
  const { setUser, setIsLogged } = useGlobalContext();

  const [form, setForm] = useState<Record<string, string>>({
    username: "",
    email: "",
    password: "",
  });

  const formFields = [
    { title: "Username", name: "username" },
    { title: "Email", name: "email", keyboardType: "email-address" as const },
    { title: "Password", name: "password" },
  ];

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setIsSubmitting(true);
    try {
      const result = await register(form.email, form.password, form.username);
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
    <SafeAreaView className="bg-blue-300 h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="flex-1 w-full h-full">
          <ImageBackground
            source={require("../../assets/HD/background1.png")}
            className="flex-1 items-center justify-center"
            resizeMode="cover"
          >
            <Text className="font-press text-3xl" style={globalStyles.title}>SIGN UP</Text>
            <Form
              form={form}
              setForm={setForm}
              formFields={formFields}
              linkText="Have an account already?"
              link="/log-in"
              buttonText="Sign Up"
              buttonPress={submit}
              isLoading={isSubmitting}
            />
          </ImageBackground>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;