import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Entypo } from "@expo/vector-icons";

const FormField = ({ title, value, handleChangeText }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="w-[80vw]">
      <Text className="px-2 text-base text-white text-justify font-zcool">
        {title}
      </Text>

      <View
        className="w-full h-14 bg-brown-200 rounded-2xl border-2 border-brown-100
        focus:border-blue-300 px-4 py-2 flex-row items-center justify-center"
      >
        <TextInput
          className="flex-1 text-white font-zcool text-base h-full"
          value={value}
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Entypo
              name={showPassword ? "eye" : "eye-with-line"}
              size={16}
              color="white"
              
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
