import React from "react";
import { View, Image, ImageSourcePropType } from "react-native";
import { Tabs } from "expo-router";
import TabIcon from "@/components/TabIcon";

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#FFFFFF",
          tabBarInactiveTintColor: "#377D2C",
          tabBarStyle: {
            backgroundColor: "#A3C254",
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="home"
                source={require("../../assets/HD/icons/house.png")}
                color={color}
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="quest-page"
          options={{
            title: "Quest",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="quest"
                source={require("../../assets/HD/icons/quest.png")}
                color={color}
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="calendar"
          options={{
            title: "Calendar",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="calendar"
                source={require("../../assets/HD/icons/calendar.png")}
                color={color}
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="leaderboard"
          options={{
            title: "Leaderboard",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="leaderboard"
                source={require("../../assets/HD/icons/trophee.png")}
                color={color}
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="profile_nav"
          options={{
            title: "ProfileNavigator",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="profile_nav"
                source={require("../../assets/HD/icons/profile.png")}
                color={color}
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
