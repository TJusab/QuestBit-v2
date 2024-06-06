import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Entypo } from "@expo/vector-icons";

const FormField = ({ title, value, handleChangeText, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="w-[80vw] pb-3">
      <Text className="px-2 text-base text-white text-justify font-zcool">
        {title}
      </Text>

      <View
        className="w-full h-14 bg-brown-200 rounded-2xl border-2
        border-brown-100 px-4 flex-row items-center"
      >
        <TextInput
          className="flex-1 text-white font-zcool text-base"
          value={value}
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Entypo
              name={showPassword ? "eye" : "eye-with-line"}
              size={20}
              color="white"
              
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
