import { View, Text, TouchableOpacity, Image, ImageBackground } from "react-native";
import FormField from "./FormField";
import PixelButton from "./PixelButton";
import { Link } from "expo-router";

const Form = ({ form, setForm, formFields, linkText, link, buttonText, buttonPress, isLoading }) => {
  const handleChangeText = (name, value) => {
    setForm({ ...form, [name]: value });
  };
  return (
    <ImageBackground
      source={require("../assets/HD/scroll.png")}
      style={{ width: 400, height: 400, justifyContent: 'center', alignItems: 'center' }}
    >
      <View className="pl-6 pt-6">
        {formFields.map((field, index) => (
          <FormField
            key={index}
            title={field.title}
            value={form[field.name]}
            handleChangeText={(value) => handleChangeText(field.name, value)}
          />
        ))}
        <View className="flex-row justify-between items-center">
          <Link href={link} className="text-justify px-2 text-base text-brown-100 font-zcool underline">
            {linkText}
          </Link>
          <View className="pt-2">
            <PixelButton text={buttonText} onPress={buttonPress} isLoading={isLoading} />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Form;
