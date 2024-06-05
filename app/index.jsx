import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View, Image, ImageBackground } from 'react-native';
import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton'

export default function App() {
  return (
    <SafeAreaView className="bg-blue-300 h-full">
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="flex-1 w-full h-full">
          <ImageBackground 
            source={require('../assets/images/title-bg.png')}  
            className="flex-1 items-center justify-center"
            resizeMode="cover">
              <Image
                source={require('../assets/images/cloud.png')}
                className="absolute top-[5%] -right-[5%] w-[30%]"
                resizeMode="contain"
              />
              <Image
                source={require('../assets/images/cloud.png')}
                className="absolute top-[50%] right-[10%] w-[30%]"
                resizeMode="contain"
              />
              <Image
                source={require('../assets/images/cloud.png')}
                className="absolute top-[27%] left-0 w-[30%]"
                resizeMode="contain"
              />
              <Text
                className="absolute top-[20%] font-press text-4xl text-white"
                style={{
                  textShadowColor: '#1E3445',
                  textShadowOffset: { width: -5, height: -5 },
                  textShadowRadius: 1,
                }}
              >
                QUESTBIT
              </Text>
              <Image
                source={require('../assets/images/pixelButton.png')}
                className="absolute justify-center items-center w-[70%] top-[40%]"
                resizeMode="contain"
              />
              <Text
                className="absolute top-[43%] justify-center items-center font-zcool text-4xl text-white"
                style={{
                  textShadowColor: '#1E3445',
                  textShadowOffset: { width: -1, height: -1 },
                  textShadowRadius: 1,
                }}  
              >
                CONTINUE
              </Text>
              <Image 
                source={require('../assets/images/bush.png')}
                className="absolute left-[2%] bottom-[13%] w-[25%]"
                resizeMode="contain"
              />
              <Image 
                source={require('../assets/images/bush.png')}
                className="absolute right-[2%] bottom-[13%] w-[25%]"
                resizeMode="contain"
              />
              <Image 
                source={require('../assets/images/bush.png')}
                className="absolute justify-center bottom-[13%] w-[25%]"
                resizeMode="contain"
              />
              <Image 
                source={require('../assets/images/grass.png')}
                className="absolute -bottom-[5%] w-full"
                resizeMode="cover"
              />
          </ImageBackground>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
