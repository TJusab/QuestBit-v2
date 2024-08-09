import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { GlobalContextType, User, QuestBit, Quest } from "../constants/types";
import { getCurrentUser } from "../lib/account";
import {
  getQuests,
  getQuestBitsForUser,
  saveTokenToUser,
} from "@/lib/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import Constants from "expo-constants";

// Create default values for the context
const defaultContextValue: GlobalContextType = {
  isLogged: false,
  setIsLogged: () => {},
  user: null,
  setUser: () => {},
  loading: true,
  questbits: [],
  setQuestBits: () => {},
  quests: [],
  setQuests: () => {},
  expoPushToken: "",
  setExpoPushToken: () => {},
};

const GlobalContext = createContext<GlobalContextType>(defaultContextValue);
export const useGlobalContext = () => useContext(GlobalContext);

interface GlobalProviderProps {
  children: ReactNode;
}

const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [questbits, setQuestBits] = useState<QuestBit[]>([]);
  const [quests, setQuests] = useState<Quest[]>([]);
  const [expoPushToken, setExpoPushToken] = useState<string>("");

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const res = await getCurrentUser();
        if (res) {
          setIsLogged(true);
          setUser(res);
          await fetchAndSetData(); // Fetch data after user is set
          await registerForPushNotifications(); // Register for push notifications
        } else {
          setIsLogged(false);
          setUser(null);
        }
      } catch (error) {
        console.error("Error initializing app:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeApp();
  }, []);

  useEffect(() => {
    if (isLogged && user) {
      fetchAndSetData();
    } else {
      // Clear data when user logs out
      setQuests([]);
      setQuestBits([]);
      AsyncStorage.removeItem("quests");
      AsyncStorage.removeItem("questbits");
    }
  }, [isLogged, user]);

  const fetchAndSetData = async () => {
    try {
      const [freshQuests, freshQuestBits] = await Promise.all([
        getQuests(),
        getQuestBitsForUser(),
      ]);

      // Load cached quests from AsyncStorage
      const cachedQuests = await AsyncStorage.getItem("quests");
      if (cachedQuests) {
        setQuests(JSON.parse(cachedQuests));
      }

      setQuests(freshQuests);

      // Update AsyncStorage with fresh quests
      await AsyncStorage.setItem("quests", JSON.stringify(freshQuests));

      // Load cached questbits from AsyncStorage
      const cachedQuestBits = await AsyncStorage.getItem("questbits");
      if (cachedQuestBits) {
        setQuestBits(JSON.parse(cachedQuestBits));
      }

      setQuestBits(freshQuestBits);

      // Update AsyncStorage with fresh questbits
      await AsyncStorage.setItem("questbits", JSON.stringify(freshQuestBits));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // Save questbits to AsyncStorage whenever they change
    const saveQuestBits = async () => {
      try {
        await AsyncStorage.setItem("questbits", JSON.stringify(questbits));
      } catch (error) {
        console.error("Failed to save questbits to storage", error);
      }
    };

    saveQuestBits();
  }, [questbits]);

  useEffect(() => {
    // Save quests to AsyncStorage whenever they change
    const saveQuests = async () => {
      try {
        await AsyncStorage.setItem("quests", JSON.stringify(quests));
      } catch (error) {
        console.error("Failed to save quests to storage", error);
      }
    };

    saveQuests();
  }, [quests]);

  async function registerForPushNotifications() {
    let token;
    if (Device.isDevice) {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== "granted") {
          alert("Failed to get push token for push notification!");
          return;
        }
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: Constants.expoConfig?.extra?.eas?.projectId,
        })
      ).data;
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (token) {
      setExpoPushToken(token);
      // Here you would typically send this token to your backend
      // For example: await sendTokenToBackend(token);
      const user = await getCurrentUser();
      if (user == null) {
        console.error("USER NULL WHILE SETTING NOTIFS");
        return;
      }
      await saveTokenToUser(user.$id, token);
    }

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        loading,
        questbits,
        setQuestBits,
        quests,
        setQuests,
        expoPushToken,
        setExpoPushToken,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
