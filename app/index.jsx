import React, { useState, useEffect, useRef } from "react";
import {
  ScrollView,
  Text,
  View,
  Animated,
  ImageBackground,
  TouchableOpacity,
  Image
} from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../context/GlobalProvider";

export default function App() {
  const {isLoading, isLoggedIn} = useGlobalContext();

  if (!isLoading && isLoggedIn) return <Redirect href="/home" />

  const [heartsVisible, setHeartsVisible] = useState([false, false, false, false, false]);
  const [continueVisible, setContinueVisible] = useState(false);
  const fadeAnim = useRef(heartsVisible.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    heartsVisible.forEach((_, index) => {
      setTimeout(() => {
        setHeartsVisible((prev) => {
          const newHearts = [...prev];
          newHearts[index] = true;
          return newHearts;
        });
        Animated.timing(fadeAnim[index], {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }).start();
      }, index * 550);
    });

    setTimeout(() => {
      setContinueVisible(true);
      setHeartsVisible([false, false, false, false, false]);
    }, heartsVisible.length * 580);
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
                  <Animated.Image
                    key={index}
                    source={require("../assets/images/heart.png")}
                    style={{
                      width: 65,
                      height: 65,
                      margin: 2,
                      opacity: fadeAnim[index],
                    }}
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
