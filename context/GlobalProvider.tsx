import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { GlobalContextType, User, QuestBit, Quest } from "../constants/types";
import { getCurrentUser } from "../lib/account";
import { getQuests, getQuestBitsForUser } from "@/lib/database";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const res = await getCurrentUser();
        if (res) {
          setIsLogged(true);
          setUser(res);
        } else {
          setIsLogged(false);
          setUser(null);
        }

        const [freshQuests, freshQuestBits] = await Promise.all([
          getQuests(),
          getQuestBitsForUser()
        ]);

        // Load cached quests from AsyncStorage
        const cachedQuests = await AsyncStorage.getItem("quests");
        if (cachedQuests) {
          setQuests(JSON.parse(cachedQuests));
        }

        setQuests(freshQuests);

        // Update AsyncStorage with fresh quests
        await AsyncStorage.setItem("quests", JSON.stringify(freshQuests));

        // Load cached quests from AsyncStorage
        const cachedQuestBits = await AsyncStorage.getItem("questbits");
        if (cachedQuestBits) {
          setQuestBits(JSON.parse(cachedQuestBits));
        }

        setQuestBits(freshQuestBits);

        // Update AsyncStorage with fresh quests
        await AsyncStorage.setItem("questbits", JSON.stringify(freshQuestBits));
      } catch (error) {
        console.error("Error initializing app:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeApp();
  }, []);

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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
