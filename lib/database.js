import { Databases, Query } from 'react-native-appwrite';
import client, { config } from './client';
import { getCurrentUser } from "./account";

const databases = new Databases(client);

export async function getAllQuests() {
  try {
    const response = await databases.listDocuments(
      config.databaseId,
      config.questCollectionId,
      []
    );

    return response.documents;
  } catch (error) {
    console.error('Error fetching quests: ', error);
    throw new Error(error.message);
  }
}

export async function getQuests() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error('No current user found');

    // Fetch all quests
    const response = await databases.listDocuments(
      config.databaseId,
      config.questCollectionId,
      []
    );

    // Filter quests where the current user is the owner
    const ownedQuests = response.documents.filter(quest => {
      // Check if quest.owner is an object and if its $id matches currentUser.$id
      if (typeof quest.owner === 'object' && quest.owner.$id === currentUser.$id) {
        return true;
      }
      // Check if quest.owner is a string and matches currentUser.$id
      if (typeof quest.owner === 'string' && quest.owner === currentUser.$id) {
        return true;
      }
      return false;
    });

    // Filter quests where the current user is an adventurer
    const adventurersQuests = response.documents.filter(quest => {
      // Check if any of the adventurers' $id matches currentUser.$id
      return quest.adventurers.some(adventurers => adventurers.$id === currentUser.$id);
    });

    // Combine and remove duplicates
    const quests = [...ownedQuests, ...adventurersQuests.filter(quest => !ownedQuests.some(ownedQuest => ownedQuest.$id === quest.$id))];

    return quests;
  } catch (error) {
    console.error('Error fetching quests:', error);
    throw new Error(error.message);
  }
}

export async function getQuestBits() {
  const currentUser = await getCurrentUser();
  if (!currentUser) throw new Error('No current user found');

  // Fetch all questbits
  const response = await databases.listDocuments(
    config.databaseId,
    config.questbitCollectionId,
    []
  );
  return response.documents; // Assuming the documents are within this property
}

