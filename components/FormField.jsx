import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Entypo } from "@expo/vector-icons";

const FormField = ({ title, value, handleChangeText }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="w-[70vw]">
      <Text className="px-2 text-base text-brown-100 text-justify font-zcool">
        {title}
      </Text>

      <View
        className="w-full h-14 bg-lightbrown-100 rounded-2xl border-2 border-lightbrown-200
        focus:border-brown-200 px-4 py-2 flex-row items-center justify-center"
      >
        <TextInput
          className="flex-1 text-brown-100 font-zcool text-base h-full selection:text-brown-100"
          value={value}
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          selectionColor="#7F4D2E"
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Entypo
              name={showPassword ? "eye" : "eye-with-line"}
              size={16}
              color="#945835"
              
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
