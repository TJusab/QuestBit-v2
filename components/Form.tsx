import React from "react";
import { View, ImageBackground, Text } from "react-native";
import FormField from "./FormField";
import PixelButton from "./PixelButton";
import { Link } from "expo-router";
import SelectUserIcon from "../components/SelectUserIcon"
import { UserIcon } from "@/constants/enums";

interface FormProps {
  form: Record<string, string>;
  setForm: (form: Record<string, string>) => void;
  formFields: FormFieldProps[];
  linkText: string;
  link: string;
  buttonText: string;
  buttonPress: () => void;
  isLoading: boolean;
  longScroll: boolean;
  icon: UserIcon | null; // Add icon as a prop
  setIcon: (icon: UserIcon) => void; // Add setIcon as a prop
}

interface FormFieldProps {
  title: string;
  name: string;
  keyboardType?:
    | "default"
    | "email-address"
    | "numeric"
    | "phone-pad"
    | "number-pad";
}

const Form: React.FC<FormProps> = ({
  form,
  setForm,
  formFields,
  linkText,
  link,
  buttonText,
  buttonPress,
  isLoading,
  longScroll = false,
  icon,
  setIcon
}) => {
  const handleChangeText = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  return (
    <ImageBackground
      source={
        longScroll
          ? require("../assets/HD/scrolls/scroll_long.png")
          : require("../assets/HD/scrolls/scroll.png")
      }
      style={{
        width: 400,
        height: longScroll ? 600 : 400,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {longScroll && (
        <View className="w-[70vw] px-2">
          <Text className="px-2 pb-2 text-base text-brown-100 selection:text-brown-100 font-zcool">Choose your user icon: </Text>
          <SelectUserIcon selectedIcon={icon} onSelectIcon={setIcon} />
        </View>
      )}
      <View className="pl-6 pt-2">
        {formFields.map((field, index) => (
          <FormField
            key={index}
            title={field.title}
            value={form[field.name]}
            handleChangeText={(value: string) =>
              handleChangeText(field.name, value)
            }
          />
        ))}
        <View className="flex-row items-center">
          <Link
            href={link}
            className="text-justify px-2 text-base text-brown-100 font-zcool underline"
          >
            {linkText}
          </Link>
          <View className="pt-2 pl-5">
            <PixelButton
              text={buttonText}
              onPress={buttonPress}
              isLoading={isLoading}
              color="green"
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Form;
