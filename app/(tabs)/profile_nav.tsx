import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import "react-native-gesture-handler";
import EditProfile from "../pages/edit_profile";
import AddFriends from "../pages/add_friends";
import FriendList from "../pages/friend_list";
import Settings from "../pages/settings";
import MyProfile from "../pages/my_profile";

const Drawer = createDrawerNavigator();

const ProfileWithDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Profile"
      screenOptions={{
        drawerLabelStyle: {
          color: "black",
          fontFamily: "ZCOOL",
          fontSize: 20,
        },
        drawerStyle: {
          width: 200,
        },
      }}
    >
      <Drawer.Screen
        name="My Profile"
        component={MyProfile}
        options={{
          headerTitle: "My Profile",
          headerTitleStyle: {
            fontFamily: "PressStart2P",
          },
        }}
      ></Drawer.Screen>
      <Drawer.Screen
        name="Edit Profile"
        component={EditProfile}
        options={{
          headerTitle: "Edit Profile",
          headerTitleStyle: { fontFamily: "PressStart2P" },
        }}
      ></Drawer.Screen>
      <Drawer.Screen
        name="Add Friends"
        component={AddFriends}
        options={{
          headerTitle: "Add Friends",
          headerTitleStyle: { fontFamily: "PressStart2P" },
        }}
      ></Drawer.Screen>
      <Drawer.Screen
        name="Friends List"
        component={FriendList}
        options={{
          headerTitle: "Friends List",
          headerTitleStyle: { fontFamily: "PressStart2P" },
        }}
      ></Drawer.Screen>
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          headerTitle: "Settings",
          headerTitleStyle: { fontFamily: "PressStart2P" },
        }}
      ></Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default ProfileWithDrawer;
