import { Databases, Query, ID } from "react-native-appwrite";
import client, { config } from "./client";
import { getCurrentUser } from "./account";
import { User } from "../constants/types";
import { QuestIcon } from "../constants/enums";
import { documentToQuest } from "@/utils/mapping";
import { QuestBit } from "../constants/types";

const databases = new Databases(client);

/** ------------------ CRUD QUEST FUNCTIONS ------------------ */

/**
 * Adds a quest to the database
 * @param attributes the quest attributes
 * @returns the response of adding the document
 */
export async function addQuest(attributes: {
  title: string;
  icon: QuestIcon;
  questInfo: string;
  adventurers: User[];
  deadline: Date;
}) {
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
    throw new Error((error as Error).message);
  }
}

/**
 * Gets all the quests that a user is a part of (as owner or as adventurer)
 * @returns all of the user's quests
 */
export async function getQuests() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error("No current user found");

    const response = await databases.listDocuments(
      config.databaseId,
      config.questCollectionId,
      []
    );

    const quests = response.documents.map(documentToQuest);

    // Filter quests where the current user is the owner
    const ownedQuests = quests.filter((quest) => {
      return quest.owner.$id === currentUser.$id;
    });

    // Filter quests where the current user is an adventurer
    const adventurersQuests = quests.filter((quest) =>
      (quest.adventurers ?? []).some((adventurer) => adventurer.$id === currentUser.$id)
    );

    // Combine and remove duplicates
    const userQuests = [
      ...ownedQuests,
      ...adventurersQuests.filter(
        (quest) =>
          !ownedQuests.some((ownedQuest) => ownedQuest.$id === quest.$id)
      ),
    ];

    return quests;
  } catch (error) {
    console.error("Error fetching quests:", error);
    throw new Error((error as Error).message);
  }
}

/**
 * Deletes a quest in the database
 * @param id of the quest to delete
 */
export async function deleteQuest(id: string) {
  try {
    const response = await databases.listDocuments(
      config.databaseId,
      config.questCollectionId,
      [Query.equal("$id", id)]
    );

    const quest = documentToQuest(response.documents[0]);

    // First delete all related questbits
    const questbits = quest.questbits ?? [];
    questbits.forEach(async (questbit) => {
      await deleteQuestBit(questbit.$id);
    });

    await databases.deleteDocument(
      config.databaseId,
      config.questCollectionId,
      id
    );
  } catch (error) {
    console.error("Error deleting quest:", error);
    throw new Error((error as Error).message);
  }
}

/** ------------------ CRUD QUESTBITS FUNCTIONS ------------------ */

/**
 * Fetches all questbits
 * @returns the list of all questbits
 */
export async function getQuestBits(): Promise<QuestBit[]> {
  const currentUser = await getCurrentUser();
  if (!currentUser) throw new Error("No current user found");

  const response = await databases.listDocuments(
    config.databaseId,
    config.questbitCollectionId,
    []
  );
  return response.documents as unknown as QuestBit[];
}

/**
 * Gets all the questbits specific to the current user
 * @returns the list of questbits
 */
export async function getQuestBitsForUser(): Promise<QuestBit[]> {
  try {
    const userQuests = await getQuests();
    const questIds = userQuests.map((quest) => quest.$id);

    const allQuestBits = await getQuestBits();
    const userQuestBits = allQuestBits.filter((questbit) => {
      const include = questIds.includes(questbit.quests.$id);
      return include;
    });
    return userQuestBits;
  } catch (error) {
    console.error("Error fetching user questbits:", error);
    throw new Error((error as Error).message);
  }
}

/**
 * Updates the status of a questbit
 * @param id of the questbit
 * @param newStatus the value of the new status
 */
export async function updateQuestBitStatus(id: string, newStatus: string) {
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

/**
 * Deletes a questbit from the database
 * @param id of the questbit to delete
 */
export async function deleteQuestBit(id: string) {
  try {
    await databases.updateDocument(
      config.databaseId,
      config.questbitCollectionId,
      String(id),
      { quests: null, assignees: [] }
    );

    await databases.deleteDocument(
      config.databaseId,
      config.questbitCollectionId,
      String(id)
    );
  } catch (error) {
    console.error("Error deleting questbit:", error);
    throw new Error((error as Error).message);
  }
}

/**
 * This function fetches all users in the database (except the current one)
 * TODO: Fetch only the friends of the current user
 * @returns the list of possible adventurers to choose form for a quest
 */
export async function fetchAdventurers() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      throw new Error("No current user found.");
    }

    const currentUserId = currentUser.$id;

    const users = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.notEqual("$id", currentUserId)]
    );

    return users.documents;  // TODO print this to check (I want to use the User object)
  } catch (error) {
    console.error("Error fetching adventurers:", error);
    throw new Error((error as Error).message);
  }
}