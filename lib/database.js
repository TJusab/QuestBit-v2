import { Databases, Query, ID } from "react-native-appwrite";
import client, { config } from "./client";
import { getCurrentUser } from "./account";

const databases = new Databases(client);

export async function getQuests() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error("No current user found");

    // Fetch all quests
    const response = await databases.listDocuments(
      config.databaseId,
      config.questCollectionId,
      []
    );

    // Filter quests where the current user is the owner
    const ownedQuests = response.documents.filter((quest) => {
      // Check if quest.owner is an object and if its $id matches currentUser.$id
      if (
        typeof quest.owner === "object" &&
        quest.owner.$id === currentUser.$id
      ) {
        return true;
      }
      // Check if quest.owner is a string and matches currentUser.$id
      if (typeof quest.owner === "string" && quest.owner === currentUser.$id) {
        return true;
      }
      return false;
    });

    // Filter quests where the current user is an adventurer
    const adventurersQuests = response.documents.filter((quest) => {
      // Check if any of the adventurers' $id matches currentUser.$id
      return quest.adventurers.some(
        (adventurers) => adventurers.$id === currentUser.$id
      );
    });

    // Combine and remove duplicates
    const quests = [
      ...ownedQuests,
      ...adventurersQuests.filter(
        (quest) =>
          !ownedQuests.some((ownedQuest) => ownedQuest.$id === quest.$id)
      ),
    ];

    return quests;
  } catch (error) {
    console.error("Error fetching quests:", error);
    throw new Error(error.message);
  }
}

export async function addQuest(attributes) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error("No current user found");

    const response = await databases.createDocument(
      config.databaseId,
      config.questCollectionId,
      ID.unique(),
      {
        owner: currentUser.$id,
        title: attributes.title,
        progress: 0.0,
        icon: attributes.icon,
        questInfo: attributes.questInfo,
        deadline: attributes.deadline,
        adventurers: attributes.adventurers,
        questbits: [],
      }
    );

    return response;
  } catch (error) {
    console.error("Error adding quest:", error);
    throw new Error(error.message);
  }
}

/**
 * This function fetches all questbits.
 * @returns
 */
export async function getQuestBits() {
  const currentUser = await getCurrentUser();
  if (!currentUser) throw new Error("No current user found");

  // Fetch all questbits
  const response = await databases.listDocuments(
    config.databaseId,
    config.questbitCollectionId,
    []
  );
  return response.documents; // Assuming the documents are within this property
}

export async function getQuestBitsForUser() {
  try {
    const userQuests = await getQuests();
    const questIds = userQuests.map((quest) => quest.$id);

    const allQuestBits = await getQuestBits();
    const userQuestBits = allQuestBits.filter((questbit) => {
      questIds.includes(questbit.quests.$id);
    });
    return userQuestBits;
  } catch (error) {
    console.error("Error fetching user questbits:", error);
    throw new Error(error.message);
  }
}

export async function updateQuestBitStatus(id, newStatus) {
  try {
    await databases.updateDocument(
      config.databaseId,
      config.questbitCollectionId,
      id,
      { status: newStatus }
    );
  } catch (error) {
    console.error("Error updating questbit status:", error);
  }
}

export async function deleteQuestBit(id) {
  try {
    await databases.updateDocument(
      config.databaseId,
      config.questbitCollectionId,
      id,
      { quests: null, assignees: [] }
    );

    await databases.deleteDocument(
      config.databaseId,
      config.questbitCollectionId,
      id
    );
  } catch (error) {
    console.error("Error deleting questbit:", error);
    throw new Error(error.message);
  }
}

/**
 * This function fetches all users in the database (except the current one)
 * TODO: Fetch only the friends of the current user
 */
export async function fetchAdventurers() {
  try {
    const currentUser = await getCurrentUser();
    const currentUserId = currentUser.$id;

    const users = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.notEqual("$id", currentUserId)]
    );

    return users.documents;
  } catch (error) {
    console.error("Error fetching adventurers:", error);
    throw new Error(error.message);
  }
}

export async function getAccountFromId(id) {
  try {
    const account = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("$id", id)]
    );

    return account.documents[0];
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error(error.message);
  }
}
