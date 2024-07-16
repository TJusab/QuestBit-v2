import React from "react";
import { View, ImageBackground } from "react-native";
import FormField from "./FormField";
import PixelButton from "./PixelButton";
import { Link } from "expo-router";

interface FormProps {
  form: Record<string, string>;
  setForm: (form: Record<string, string>) => void;
  formFields: FormFieldProps[];
  linkText: string;
  link: string;
  buttonText: string;
  buttonPress: () => void;
  isLoading: boolean;
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
}) => {
  const handleChangeText = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  return (
    <ImageBackground
      source={require("../assets/HD/scroll.png")}
      style={{
        width: 400,
        height: 400,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View className="pl-6 pt-6">
        {formFields.map((field, index) => (
          <FormField
            key={index}
            title={field.title}
            value={form[field.name]}
            handleChangeText={(value: string) =>
              handleChangeText(field.name, value)
            }
            keyboardType={field.keyboardType}
          />
        ))}
        <View className="flex-row items-center">
          <Link
            href={link}
            className="text-justify px-2 text-base text-brown-100 font-zcool underline"
          >
            {linkText}
          </Link>
          <View className="pt-2">
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