import { View, Image } from 'react-native';
import { Tabs } from 'expo-router';

const TabIcon = ({ source, color, name, focused }) => {
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
                    tabBarActiveTintColor: '#6ABE30',
                    tabBarInactiveTintColor: '#FFFFFF',
                    tabBarStyle: {
                        backgroundColor: '#7F4D2E',
                    },
                }}
            >
                <Tabs.Screen
                    name="home"
                    options={{
                        title: 'Home',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) =>  (
                            <TabIcon
                                source={require('../../assets/HD/icons/home.png')}
                                color={color}
                                focused={focused}
                            />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="quest"
                    options={{
                        title: 'Quest',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                source={require('../../assets/HD/icons/quest.png')}
                                color={color}
                                focused={focused}
                            />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="calendar"
                    options={{
                        title: 'Calendar',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                source={require('../../assets/HD/icons/calendar.png')}
                                color={color}
                                focused={focused}
                            />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="create"
                    options={{
                        title: 'Create',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                source={require('../../assets/HD/icons/quest.png')}
                                color={color}
                                focused={focused}
                            />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="profile"
                    options={{
                        title: 'Profile',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabIcon
                                source={require('../../assets/HD/icons/profile.png')}
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
