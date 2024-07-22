import React from "react";
import {
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import { getIconButtonImage } from "@/utils/utils";

interface IconButtonProps {
  onPress: () => void;
  isLoading?: boolean;
  icon?: "accept" | "reject";
}

const IconButton: React.FC<IconButtonProps> = ({
  onPress,
  isLoading = false,
  icon = "accept",
}) => {

  return (
    <View>
      <TouchableOpacity
        className="items-center justify-center"
        onPress={onPress}
      >
        <Image
          source={getIconButtonImage(icon)}
          className={`w-12 h-12`}
        />
        {isLoading && (
          <ActivityIndicator
            animating={isLoading}
            color="#fff"
            size="small"
            className="absolute"
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default IconButton;