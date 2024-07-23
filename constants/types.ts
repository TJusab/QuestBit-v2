import { Dispatch, SetStateAction } from 'react';
import { UserIcon, QuestIcon, Status, FriendshipStatus } from './enums';

export interface GlobalContextType {
  isLogged: boolean;
  setIsLogged: Dispatch<SetStateAction<boolean>>;
  user: any;
  setUser: Dispatch<SetStateAction<any>>;
  loading: boolean;
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
  deadline?: Date;
  adventurers?: User[];
  questbits?: QuestBit[];
}

export interface QuestBit {
  $id: string;
  title: string;
  tags?: string[];
  status: Status;
  description: string;
  assignees?: User[];
  dueDates?: Date[];
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