import { View, ScrollView, ImageBackground } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Form from "../../components/Form";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const formFields = [
    { title: "Username", name: "username" },
    { title: "Email", name: "email", keyboardType: "email-address" },
    { title: "Password", name: "password" },
  ];

  return (
    <SafeAreaView className="bg-blue-300 h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="flex-1 w-full h-full">
          <ImageBackground
            source={require("../../assets/images/sign-up.png")}
            className="flex-1 items-center justify-center"
            resizeMode="cover"
          >
            <Form
              form={form}
              setForm={setForm}
              formFields={formFields}
              linkText="Have an account already?"
              link="/log-in"
              buttonText="Sign Up"
            />
          </ImageBackground>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
