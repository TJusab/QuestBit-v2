import React from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

interface SearchInputProps {
  placeholder: string;
  value: string;
  handleChangeText: (text: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder,
  value,
  handleChangeText,
}) => {
  return (
    <View className="h-10 bg-white rounded-2xl border border-navy px-4 items-center flex-row">
      <TouchableOpacity>
        <Icon name="search" size={20} color="#2E3A59" />
      </TouchableOpacity>
      <TextInput
        className="flex-1 text-gray font-zcool text-lg h-full mx-2 items-center mt-1"
        placeholder={placeholder}
        value={value}
        onChangeText={handleChangeText}
      />
    </View>
  );
};

export default SearchInput;