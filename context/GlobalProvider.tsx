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
        const [user, cachedQuests, cachedQuestBits] = await Promise.all([
          getCurrentUser(),
          AsyncStorage.getItem("quests"),
          AsyncStorage.getItem("questbits"),
        ]);

        if (user) {
          setIsLogged(true);
          setUser(user);
          if (cachedQuests) setQuests(JSON.parse(cachedQuests));
          if (cachedQuestBits) setQuestBits(JSON.parse(cachedQuestBits));
          fetchAndSetData();
        } else {
          console.log("No user found, setting isLogged to false");
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

  useEffect(() => {
    if (isLogged && user && !loading) {
      registerForPushNotifications();
    }
  }, [isLogged, user, loading]);

  const fetchAndSetData = async () => {
    try {
      const [freshQuests, freshQuestBits] = await Promise.all([
        getQuests(),
        getQuestBitsForUser(),
      ]);

      setQuests(freshQuests);
      setQuestBits(freshQuestBits);

      // Update AsyncStorage in the background
      AsyncStorage.setItem("quests", JSON.stringify(freshQuests));
      AsyncStorage.setItem("questbits", JSON.stringify(freshQuestBits));
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
    if (!Device.isDevice) {
      console.log("Push notifications are only supported on physical devices");
      return;
    }

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      console.log("Failed to get push token for push notification!");
      return;
    }

    const token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas?.projectId,
      })
    ).data;

    setExpoPushToken(token);

    // Save token to user in the background
    getCurrentUser().then((user) => {
      if (user) {
        saveTokenToUser(user.$id, token);
      }
    });

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
