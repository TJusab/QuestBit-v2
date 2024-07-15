import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import Profile from '../pages/profile';
import Friends from '../pages/friends';
import HeaderDrawer from '../../components/HeaderDrawer';

const Drawer = createDrawerNavigator();

const ProfileWithDrawer = () => {
  return (
    <Drawer.Navigator initialRouteName="Profile"
    screenOptions={{
        drawerLabelStyle: {
            color: "black",
            fontFamily: "ZCOOL",
            fontSize: 20
        },
        drawerStyle: {
          width: 140,
        },
    }}>
      <Drawer.Screen name="Profile" component={Profile}
       options={{ headerTitle: 'Profile', headerTitleStyle: { fontFamily: 'PressStart2P' } }} />
      <Drawer.Screen name="Friends" component={Friends}
       options={{ headerTitle: 'Friends', headerTitleStyle: { fontFamily: 'PressStart2P' } }} />
    </Drawer.Navigator>
  );
};

export default ProfileWithDrawer;
