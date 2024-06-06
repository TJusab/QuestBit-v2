import { View, ScrollView, ImageBackground } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Form from "../../components/Form";

const LogIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const formFields = [
    { title: "Email", name: "email", keyboardType: "email-address" },
    { title: "Password", name: "password" },
  ];

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
            />
          </ImageBackground>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LogIn;
