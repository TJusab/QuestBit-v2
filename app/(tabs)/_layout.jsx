import { View, Text, Image } from 'react-native'
import { Tabs, Redirect } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const TabIcon = ({ icon, color, name, focused }) => {
    return (
        <View className="items-center justify-center">
            <MaterialIcons
                name={icon}
                color={color}
                size={30}
            />
        </View>
    )
}

const TabsLayout = () => {
    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: '#7F4D2E',
                    tabBarInactiveTintColor: '#FFFFFF',
                    tabBarStyle: {
                        backgroundColor: '#5C944A'
                    },
                }}
            >
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon="home"
                            color={color}
                            focused={focused}
                        />
                    )
                }}
            />

            <Tabs.Screen
                name="quest"
                options={{
                    title: 'Quest',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon="home"
                            color={color}
                            focused={focused}
                        />
                    )
                }}
            />


            <Tabs.Screen
                name="questbitdetails"
                options={{
                    title: 'QuestBitDetails',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon="archive"
                            color={color}
                            focused={focused}
                        />
                    )
                }}
            />

            <Tabs.Screen
                name="calendar"
                options={{
                    title: 'Calendar',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon="calendar-month"
                            color={color}
                            focused={focused}
                        />
                    )
                }}
            />

            <Tabs.Screen
                name="create"
                options={{
                    title: 'Create',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon="create"
                            color={color}
                            focused={focused}
                        />
                    )
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon="person"
                            color={color}
                            focused={focused}
                        />
                    )
                }}
            />
        </Tabs >
        </>
    )
}

export default TabsLayout;