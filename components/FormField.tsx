import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";

interface FormFieldProps {
  title: string;
  value: string;
  handleChangeText: (value: string) => void;
  inputStyle?: string;
  textStyle?: string;
  color?: string;
  iconColor?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  title,
  value,
  handleChangeText,
  inputStyle = "bg-lightbrown-100 border-lightbrown-200 focus:border-brown-200",
  textStyle = "text-brown-100 selection:text-brown-100",
  color = "#7F4D2E",
  iconColor = "#945835"
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className="w-[70vw]">
      <Text className={`px-2 text-base ${textStyle} text-justify font-zcool`}>
        {title}
      </Text>

      <View className={`${inputStyle} w-full h-14 rounded-2xl border-2 px-4 py-2 flex-row items-center justify-center`}>
        <TextInput
          className={`${textStyle} flex-1 font-zcool text-base h-full`}
          value={value}
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          selectionColor={`${color}`}
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Entypo
              name={showPassword ? "eye" : "eye-with-line"}
              size={16}
              color={`${iconColor}`}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
