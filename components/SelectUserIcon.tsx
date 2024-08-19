import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import { getUserIcon } from "@/utils/icon";
import { UserIcon } from "@/constants/enums";

interface SelectUserIconProps {
  selectedIcon: UserIcon | null; // Icon selected from parent component
  onSelectIcon: (icon: UserIcon) => void; // Function to notify parent component of icon selection
}

const SelectUserIcon: React.FC<SelectUserIconProps> = ({ selectedIcon, onSelectIcon }) => {
  // Initialize state with selectedIcon, handle the case where selectedIcon might be null
  const [currentSelectedIcon, setCurrentSelectedIcon] = useState<UserIcon | null>(selectedIcon);

  // Update internal state when selectedIcon prop changes
  useEffect(() => {
    setCurrentSelectedIcon(selectedIcon);
  }, [selectedIcon]);

  const handleIconPress = (icon: UserIcon) => {
    setCurrentSelectedIcon(icon);
    onSelectIcon(icon); // Notify parent component of the selection
  };

  return (
    <View className="flex-row flex-wrap">
      {Object.values(UserIcon).map((icon, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleIconPress(icon)}
          style={{
            borderWidth: 2, // Always have a border of 2
            borderColor: currentSelectedIcon === icon ? "white" : "transparent", // White if selected, transparent if not
            padding: 2, // Optional: Add padding to ensure the border doesn't overlap the image
          }}
          className="mx-1"
        >
          <Image
            source={getUserIcon(icon)}
            style={{ width: 60, height: 60 }}
            resizeMode="stretch"
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default SelectUserIcon;
