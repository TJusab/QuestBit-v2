import React from "react";
import { Image } from "react-native";
import { createDrawerNavigator, DrawerToggleButton } from "@react-navigation/drawer";
import "react-native-gesture-handler";
import EditProfile from "../pages/edit_profile";
import AddFriends from "../pages/add_friends";
import FriendList from "../pages/friend_list";
import Settings from "../pages/settings";
import CustomDrawer from "@/components/CustomDrawer";
import FontAwesome from "react-native-vector-icons/FontAwesome6";

const Drawer = createDrawerNavigator();

const ProfileWithDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        drawerStyle: {
          width: 240,
        },
        drawerActiveBackgroundColor: "#8AD1F0",
        drawerActiveTintColor: "#FFF",
        drawerInactiveTintColor: "#2E3A59",
        drawerLabelStyle: {
          fontFamily: "ZCOOL",
          fontSize: 18,
          marginLeft: -20,
        },
        headerTintColor: "#FFF"
      }}
    >
      <Drawer.Screen
        name="Edit Profile"
        component={EditProfile}
        options={{
          headerTitle: "Edit Profile",
          headerTitleStyle: {
            fontFamily: "PressStart2P",
            textShadowColor: "#2E3A59",
            textShadowOffset: { width: 3, height: 3 },
            textShadowRadius: 0.1,
            color: "white",
          },
          headerStyle: {
            backgroundColor: "#8AD1F0",
          },
          drawerIcon: ({ color }) => (
            <FontAwesome name="user-pen" size={22} color={color} />
          ),
        }}
      ></Drawer.Screen>
      <Drawer.Screen
        name="Add Friends"
        component={AddFriends}
        options={{
          headerTitle: "Add Friends",
          headerTitleStyle: {
            fontFamily: "PressStart2P",
            textShadowColor: "#2E3A59",
            textShadowOffset: { width: 3, height: 3 },
            textShadowRadius: 0.1,
            color: "white",
          },
          headerStyle: {
            backgroundColor: "#8AD1F0",
          },
          drawerIcon: ({ color }) => (
            <FontAwesome name="user-plus" size={22} color={color} />
          ),
        }}
      ></Drawer.Screen>
      <Drawer.Screen
        name="Friends List"
        component={FriendList}
        options={{
          headerTitle: "Friends List",
          headerTitleStyle: {
            fontFamily: "PressStart2P",
            textShadowColor: "#2E3A59",
            textShadowOffset: { width: 3, height: 3 },
            textShadowRadius: 0.1,
            color: "white",
          },
          headerStyle: {
            backgroundColor: "#8AD1F0",
          },
          drawerIcon: ({ color }) => (
            <FontAwesome name="users" size={22} color={color} />
          ),
        }}
      ></Drawer.Screen>
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          headerTitle: "Settings",
          headerTitleStyle: {
            fontFamily: "PressStart2P",
            textShadowColor: "#2E3A59",
            textShadowOffset: { width: 3, height: 3 },
            textShadowRadius: 0.1,
            color: "white",
          },
          headerStyle: {
            backgroundColor: "#8AD1F0",
          },
          drawerIcon: ({ color }) => (
            <FontAwesome name="user-gear" size={22} color={color} />
          ),
        }}
      ></Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default ProfileWithDrawer;
