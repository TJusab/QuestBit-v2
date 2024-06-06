import {
  ScrollView,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaView className="bg-blue-300 h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="flex-1 w-full h-full">
          <ImageBackground
            source={require("../assets/images/loading_page.png")}
            className="flex-1 items-center justify-center"
            resizeMode="cover"
          >
            <TouchableOpacity
              className="absolute justify-center items-center w-[70%] h-[30%]"
              onPress={() => router.push('/log-in')}
            >
              <Image
                source={require("../assets/images/pixelButton.png")}
                className="w-full h-full"
                resizeMode="contain"
              />
              <Text
                className="bottom-[58%] font-zcool text-4xl text-white"
                style={{
                  textShadowColor: "#1E3445",
                  textShadowOffset: { width: -1, height: -1 },
                  textShadowRadius: 1,
                }}
              >
                CONTINUE
              </Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
