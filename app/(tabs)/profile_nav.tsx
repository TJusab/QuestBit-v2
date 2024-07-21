import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';
import Profile from '../pages/profile';
import AddFriends from '../pages/add_friends';
import FriendList from '../pages/friend_list';
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
          width: 200,
        },
    }}>
      <Drawer.Screen name="Profile" component={Profile}
       options={{ headerTitle: 'Profile', headerTitleStyle: { fontFamily: 'PressStart2P' } }} >
      </Drawer.Screen>
      <Drawer.Screen name="Add Friends" component={AddFriends}
       options={{ headerTitle: 'Add Friends', headerTitleStyle: { fontFamily: 'PressStart2P' } }} >
      </Drawer.Screen>
      <Drawer.Screen name="Friends List" component={FriendList}
       options={{ headerTitle: 'Friends List', headerTitleStyle: { fontFamily: 'PressStart2P' } }} >
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default ProfileWithDrawer;
