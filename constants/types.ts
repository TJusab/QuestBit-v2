import { Dispatch, SetStateAction } from 'react';
import { UserIcon, QuestIcon, Status, FriendshipStatus, Difficulty } from './enums';

export interface GlobalContextType {
  isLogged: boolean;
  setIsLogged: Dispatch<SetStateAction<boolean>>;
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
  loading: boolean;
  questbits: QuestBit[];
  setQuestBits: Dispatch<SetStateAction<QuestBit[]>>;
  quests: Quest[];
  setQuests: Dispatch<SetStateAction<Quest[]>>;
  expoPushToken: string;
  setExpoPushToken: Dispatch<SetStateAction<string>>;
}

export interface User {
  $id: string;
  username: string;
  email: string;
  icon: UserIcon;
  level: number;
  experiencePoints: number;
  bio: string;
}

export interface Quest {
  $id: string;
  owner: User;
  title: string;
  progress: number;
  icon: QuestIcon;
  questInfo?: string;
  deadline: Date;
  adventurers?: User[];
  questbits?: QuestBit[];
}

export interface QuestBit {
  $id: string;
  title: string;
  tags?: string[];
  status: Status;
  difficulty: Difficulty,
  description: string;
  assignees?: User[];
  dueDates: Date[];
  quests: Quest;
}

export interface Friendship {
  $id: string
  user1: string;
  user2: string;
  startOfFriendship: Date;
  status: FriendshipStatus;
  user: User;
}

export type DrawerParamList = {
  Profile: undefined;
  'Edit Profile': undefined;
}