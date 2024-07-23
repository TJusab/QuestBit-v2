import { View, Text, ImageBackground, Image } from 'react-native'
import React from 'react'
import { DrawerNavigationState, ParamListBase } from '@react-navigation/native';
import { DrawerDescriptorMap, DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useGlobalContext } from '@/context/GlobalProvider';
import { getUserIcon } from '@/utils/icon';

interface CustomDrawerProps {
    state: DrawerNavigationState<ParamListBase>; 
    navigation: DrawerNavigationHelpers; 
    descriptors: DrawerDescriptorMap;
}

const CustomDrawer: React.FC<CustomDrawerProps> = ({ state, navigation, descriptors }) => {
    const { user } = useGlobalContext();

  return (
    <View className='flex-1'>
    <DrawerContentScrollView contentContainerStyle={{ backgroundColor: "#61C6ED" }}>
        <ImageBackground
            source={require("../assets/HD/blue_sky.png")}
            className="flex-1 items-center justify-center"
            resizeMode="cover"
        >
            <Image source={getUserIcon(user.icon)} style={{ width: 80, height: 80 }}/>
        </ImageBackground>
        <DrawerItemList state={state} navigation={navigation} descriptors={descriptors} />
    </DrawerContentScrollView>
    <View>
        <Text>
            Our Custom Text
        </Text>
    </View>
    </View>
  )
}

export default CustomDrawer