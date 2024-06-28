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
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../context/GlobalProvider";
import { globalStyles } from './global_css';

export default function App() {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/calendar" />

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
    <SafeAreaView className="bg-sky h-full">
      <ScrollView contentContainerStyle={{ height:"100%"  }}>
        <View className="flex-1 w-full h-full">
          <ImageBackground
            source={require("../assets/HD/background_no_scroll.png")}
            className="flex-1 items-center justify-center"
            resizeMode="stretch"
          >
              <Text className="font-press text-3xl mb-20" style={globalStyles.title}>QuestBit</Text>
             <View className="flex-row justify-center items-center mb-40">
              {heartsVisible.map((visible, index) => (
                visible && (
                  <Animated.Image
                    key={index}
                    source={require("../assets/HD/heart_small.png")}
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
                className="absolute justify-center items-center w-[60%] h-[30%]"
                onPress={() => router.push('/log-in')}
              >
                <Image
                  source={require("../assets/HD/button_green.png")}
                  className="w-full h-full"
                  resizeMode="contain"
                />
                <Text
                  className="bottom-[60%] font-zcool text-4xl text-white"
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
