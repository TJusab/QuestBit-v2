import { Databases, Query } from 'react-native-appwrite';
import client, { config } from './client';

const databases = new Databases(client);

export async function getQuests() {
  try {
    const response = await databases.listDocuments(
      config.databaseId, // Using the databaseId from the config
      config.questCollectionId, // Using the collectionId from the config
      [
        Query.equal('title', 'Quest1')
      ]
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error('Error fetching quests:', error);
    throw new Error(error.message);
  }
}
