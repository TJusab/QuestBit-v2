import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { GlobalContextType, User, QuestBit, Quest } from "../constants/types";
import { getCurrentUser } from "../lib/account";
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
    getCurrentUser()
      .then((res) => {
        if (res) {
          setIsLogged(true);
          setUser(res);
        } else {
          setIsLogged(false);
          setUser(null);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });

    // Load cached questbits and quests from AsyncStorage
    const loadQuestBitsAndQuests = async () => {
      try {
        const cachedQuestBits = await AsyncStorage.getItem("questbits");
        if (cachedQuestBits) {
          setQuestBits(JSON.parse(cachedQuestBits));
        }

        const cachedQuests = await AsyncStorage.getItem("quests");
        if (cachedQuests) {
          setQuests(JSON.parse(cachedQuests));
        }
      } catch (error) {
        console.error("Failed to load questbits or quests from storage", error);
      }
    };

    loadQuestBitsAndQuests();
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
