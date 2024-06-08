import { View, Text, TouchableOpacity } from "react-native";
import FormField from "./FormField";
import PixelButton from "./PixelButton";
import { Link } from "expo-router";

const Form = ({ form, setForm, formFields, linkText, link, buttonText, buttonPress, isLoading }) => {
  const handleChangeText = (name, value) => {
    setForm({ ...form, [name]: value });
  };
  return (
    <View className="bottom-[3%] bg-brown-100 py-3 px-4 rounded-2xl">
      {formFields.map((field, index) => (
        <FormField
          key={index}
          title={field.title}
          value={form[field.name]}
          handleChangeText={(value) => handleChangeText(field.name, value)}
        />
      ))}
      <View className="flex-row justify-between items-center">
        <Link href={link} className="text-justify px-2 text-base text-white font-zcool underline">
          {linkText}
        </Link>
        <PixelButton text={buttonText} onPress={buttonPress} isLoading={isLoading} />
      </View>
    </View>
  );
};

export default Form;
