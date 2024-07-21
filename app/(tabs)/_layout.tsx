import React from "react";
import { View, Image, ImageSourcePropType } from "react-native";
import { Tabs } from "expo-router";

interface TabIconProps {
  source: ImageSourcePropType;
  color: string;
  name: string;
  focused: boolean;
}

const TabIcon: React.FC<TabIconProps> = ({ source, color, name, focused }) => {
  return (
    <View className="items-center justify-center">
      <Image
        source={source}
        style={{
          width: 30,
          height: 30,
          tintColor: color,
        }}
      />
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#FFFFFF",
          tabBarInactiveTintColor: "#6ABE30",
          tabBarStyle: {
            backgroundColor: "#195e1f",
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
                source={require("../../assets/HD/icons/home.png")}
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
