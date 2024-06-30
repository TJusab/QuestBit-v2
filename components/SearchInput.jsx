import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";

const SearchInput = ({ value, handleChangeText }) => {
  return (
    <View className="h-10 bg-white rounded-2xl border-2 border-navy px-4 py-2 flex-row">
      <TouchableOpacity>
        <Icon name="search" size={20} color="#2E3A59" />
      </TouchableOpacity>
      <TextInput
        className="flex-1 text-gray font-zcool text-lg h-full mx-2 items-center mt-1"
        value={value}
        onChangeText={handleChangeText}
      />
    </View>
  );
};

export default SearchInput;
