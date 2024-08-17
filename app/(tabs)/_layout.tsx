import React from "react";
import { useGlobalContext } from "../../context/GlobalProvider";
import { Image } from "react-native";
import { Tabs } from "expo-router";
import TabIcon from "@/components/TabIcon";
import { getUserIcon } from "@/utils/icon";

const TabsLayout = () => {
  const { user } = useGlobalContext();
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
          name="create"
          options={{
            title: "Create",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                name="create"
                source={require("../../assets/HD/icons/quest.png")}
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
              <Image
                source={getUserIcon(user.icon)}
                style={{width: 40, height: 40}}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
