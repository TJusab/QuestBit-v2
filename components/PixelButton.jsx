import { View, ActivityIndicator, TouchableOpacity, Text, Image } from "react-native";

const PixelButton = ({ text, onPress = null, isLoading = false, imageStyle = {}, textStyle = {}, color = "green", status = null }) => {

  const images = {
    blue: require('../assets/HD/button_blue.png'),
    green: require('../assets/HD/button_green.png'),
    pink: require('../assets/HD/button_pink.png'),
    red: require('../assets/HD/button_red.png'),
    yellow: require('../assets/HD/button_yellow.png')
  };

  const statusToColor = {
    Completed: 'green',
    OnGoing: 'blue',
    Assigned: 'pink',
    Unassigned: 'yellow'
  };

  const buttonColor = status ? statusToColor[status] : color;
  
  const imageFile = images[buttonColor];

  return (
    <TouchableOpacity className="items-center justify-center mr-5" onPress={onPress}>
      <Image
        source={imageFile}
        className={`w-[25vw] h-10 ${imageStyle}`}
      />
      <Text className={`text-white font-zcool absolute text-xl pb-1 ${textStyle}`}>{text}</Text>

      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          className="absolute"
        />
      )}
    </TouchableOpacity>
  );
};

export default PixelButton;
