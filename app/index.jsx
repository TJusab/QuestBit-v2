import React, { useState, useEffect } from "react";
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
  const [heartsVisible, setHeartsVisible] = useState([false, false, false, false, false]);
  const [continueVisible, setContinueVisible] = useState(false);

  useEffect(() => {
    heartsVisible.forEach((_, index) => {
      setTimeout(() => {
        setHeartsVisible(prev => {
          const newHearts = [...prev];
          newHearts[index] = true;
          return newHearts;
        });
      }, index * 550);
    });

    setTimeout(() => {
      setContinueVisible(true);
      setHeartsVisible([false,false,false,false,false]);
    }, heartsVisible.length * 570);
  }, []);

  return (
    <SafeAreaView className="bg-blue-300 h-full">
      <ScrollView contentContainerStyle={{ height:"100%"  }}>
        <View className="flex-1 w-full h-full">
          <ImageBackground
            source={require("../assets/images/loading_page.png")}
            className="flex-1 items-center justify-center"
            resizeMode="stretch"
          >
            <View className="flex-row justify-center items-center">
              {heartsVisible.map((visible, index) => (
                visible && (
                  <Image
                    key={index}
                    source={require("../assets/images/heart.png")}
                    style={{width: 65, height:65, margin:2}}
                  />
                )
              ))}
            </View>

            {continueVisible && (
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
            )}
          </ImageBackground>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
