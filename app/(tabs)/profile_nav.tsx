import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import "react-native-gesture-handler";
import EditProfile from "../drawer_pages/edit_profile";
import AddFriends from "../drawer_pages/add_friends";
import FriendList from "../drawer_pages/friend_list";
import Settings from "../drawer_pages/settings";
import Profile from "../drawer_pages/profile";
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
        headerTintColor: "#FFF",
      }}
    >
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          headerTitle: "Profile",
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
            <FontAwesome name="user-large" size={22} color={color} />
          ),
        }}
      ></Drawer.Screen>
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
