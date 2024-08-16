import { Databases, Query, ID } from "react-native-appwrite";
import client, { config } from "./client";
import { getCurrentUser } from "./account";
import { Friendship, User, Quest } from "../constants/types";
import {
  Difficulty,
  QuestIcon,
  RecurrenceValue,
  Status,
} from "../constants/enums";
import {
  documentToFriendship,
  documentToQuest,
  documentToQuestBit,
  documentToUser,
} from "@/utils/mapping";
import { QuestBit } from "../constants/types";
import { getEnumFromStatus } from "@/utils/utils";

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
  adventurerIds: string[];
  deadline: Date | null;
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
        adventurers: attributes.adventurerIds, // only send adventurer ids
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
 * Adds a quest to the database
 * @param attributes the quest attributes
 * @returns the response of adding the document
 */
export async function updateQuest(attributes: {
  admin: string;
  id: string;
  title: string;
  icon: QuestIcon;
  questInfo: string;
  adventurerIds: string[];
  deadline: Date | null;
  questbits: string[];
}) {
  try {
    const response = await databases.updateDocument(
      config.databaseId,
      config.questCollectionId,
      attributes.id,
      {
        owner: attributes.admin,
        title: attributes.title,
        progress: 0.0,
        icon: attributes.icon,
        questInfo: attributes.questInfo,
        deadline: attributes.deadline,
        adventurers: attributes.adventurerIds,
        questbits: attributes.questbits,
      }
    );

    return response;
  } catch (error) {
    console.error("Error updating quest:", error);
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
      (quest.adventurers ?? []).some(
        (adventurer) => adventurer.$id === currentUser.$id
      )
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
 * Adds a questbit to the database
 * @param attributes the questbit attributes
 * @returns the response of adding the document
 */
export async function addQuestBit(attributes: {
  title: string;
  deadline: Date | null;
  quest: Quest;
  isRecurring: boolean;
  recurrenceOption: string;
  description: string;
  status: Status;
  difficulty: Difficulty;
  adventurerIds: string[];
}) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error("No current user found");

    const response = await databases.createDocument(
      config.databaseId,
      config.questbitCollectionId,
      ID.unique(),
      {
        title: attributes.title,
        deadline: attributes.deadline,
        quest: attributes.quest,
        isRecurring: attributes.isRecurring,
        recurrenceOption: attributes.recurrenceOption,
        description: attributes.description,
        status: attributes.status,
        difficulty: attributes.difficulty,
        adventurers: attributes.adventurerIds, // only send adventurer ids
      }
    );

    return response;
  } catch (error) {
    console.error("Error adding questbit:", error);
    throw new Error((error as Error).message);
  }
}

/**
 * Update a questbit from the database
 * @param attributes the questbit attributes
 * @returns the response of updating the document
 */
export async function updateQuestBit(attributes: {
  id: string;
  title: string;
  dueDates: Date[];
  difficulty: string;
  description: string;
  status: Status;
  quests: Quest;
  assignees: string[];
}) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error("No current user found");

    const response = await databases.updateDocument(
      config.databaseId,
      config.questbitCollectionId,
      attributes.id,
      {
        title: attributes.title,
        status: attributes.status,
        description: attributes.description,
        assignees: attributes.assignees,
        dueDates: attributes.dueDates,
        quests: attributes.quests,
        difficulty: attributes.difficulty,
      }
    );
    return response;
  } catch (error) {
    console.error("Error updating questbit:", error);
    throw new Error((error as Error).message);
  }
}

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

  const questBits = response.documents.map(documentToQuestBit);

  return questBits;
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
  const status = getEnumFromStatus(newStatus);
  try {
    await databases.updateDocument(
      config.databaseId,
      config.questbitCollectionId,
      id,
      { status: status }
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

    const adventurers = users.documents.map(documentToUser);
    return adventurers;
  } catch (error) {
    console.error("Error fetching adventurers:", error);
    throw new Error((error as Error).message);
  }
}

export async function getAccountFromId(id: string): Promise<User> {
  try {
    const account = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("$id", id)]
    );

    return documentToUser(account.documents[0]);
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error((error as Error).message);
  }
}

export async function fetchFriends(): Promise<User[]> {
  try {
    // Get current user details
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error("No current user found");
    const currentUserId = currentUser.$id;

    // Fetch all friendship documents involving the current user with 'Friends' status
    const response = await databases.listDocuments(
      config.databaseId,
      config.friendshipId,
      [
        Query.or([
          Query.equal("userID-1", currentUserId),
          Query.equal("userID-2", currentUserId),
        ]),
        Query.equal("status", "Friends"),
      ]
    );

    // Convert response documents to Friendship type
    const friendships = response.documents.map(documentToFriendship);

    // Fetch user details for each friendship
    const users = await Promise.all(
      friendships.map(async (friendship) => {
        if (friendship.user1 === currentUserId) {
          return await getAccountFromId(friendship.user2);
        } else {
          return await getAccountFromId(friendship.user1);
        }
      })
    );

    // Add the current user to the list of users
    users.push(currentUser);

    return users;
  } catch (error) {
    console.error("Error fetching friends:", error);
    throw new Error((error as Error).message);
  }
}

/**
 * Fetch all the users which who the current user
 * have a friendship with
 */
export async function fetchFriendships(): Promise<Friendship[]> {
  try {
    // Get current user details
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error("No current user found");
    const currentUserId = currentUser.$id;

    // Fetch all friendship documents involving the current user with 'Friends' status
    const response = await databases.listDocuments(
      config.databaseId,
      config.friendshipId,
      [
        Query.or([
          Query.equal("userID-1", currentUserId),
          Query.equal("userID-2", currentUserId),
        ]),
        Query.equal("status", "Friends"),
      ]
    );

    // Convert response documents to Friendship type
    const friendships = response.documents.map(documentToFriendship);

    // Fetch user details for each friendship
    const friendshipWithUser = await Promise.all(
      friendships.map(async (friendship) => {
        let user: User;
        if (friendship.user1 === currentUserId) {
          user = await getAccountFromId(friendship.user2);
        } else {
          user = await getAccountFromId(friendship.user1);
        }
        return {
          ...friendship, // Include existing friendship data
          user: user, // Attach user data fetched from getAccountFromId
        };
      })
    );

    return friendshipWithUser;
  } catch (error) {
    console.error("Error fetching friends:", error);
    throw new Error((error as Error).message);
  }
}

/**
 * Fetch all the users that are not friends already with the user
 */
export async function fetchFriendshipSuggestions(): Promise<User[]> {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error("No current user found");
    const currentUserId = currentUser.$id;

    const users = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.notEqual("$id", currentUserId)]
    );

    // Get all possible friendships which includes the current
    // friendships and the friendship requests
    const possibleFriendships = await databases.listDocuments(
      config.databaseId,
      config.friendshipId,
      [
        Query.or([
          Query.equal("userID-1", currentUserId),
          Query.equal("userID-2", currentUserId),
        ]),
      ]
    );

    // Map through friendships and fetch user details for each friend
    const alreadyFriendsIds = new Set();
    possibleFriendships.documents.forEach((friendship) => {
      if (friendship["userID-1"] === currentUserId) {
        alreadyFriendsIds.add(friendship["userID-2"]);
      } else {
        alreadyFriendsIds.add(friendship["userID-1"]);
      }
    });

    // Filter out users who are already friends
    const suggestedUsers = users.documents.filter((user) => {
      return !alreadyFriendsIds.has(user.$id);
    });

    return suggestedUsers.map(documentToUser);
  } catch (error) {
    console.error("Error fetching friendship suggestion:", error);
    throw new Error((error as Error).message);
  }
}

/**
 * Fetch all the friendships that a user has received
 */
export async function fetchReceivedFriendshipInvitations(): Promise<
  Friendship[]
> {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error("No current user found");
    const currentUserId = currentUser.$id;

    const response = await databases.listDocuments(
      config.databaseId,
      config.friendshipId,
      [
        Query.equal("userID-2", currentUserId),
        Query.equal("status", ["InvitationSent"]),
      ]
    );

    const friendships = response.documents.map(documentToFriendship);

    const friendshipRequests = await Promise.all(
      friendships.map(async (friendship) => {
        const user = await getAccountFromId(friendship.user1);
        return {
          ...friendship, // Include existing data from friendships if needed
          user: user, // Attach user data fetched from getAccountFromId
        };
      })
    );

    return friendshipRequests;
  } catch (error) {
    console.error("Error fetching friendships:", error);
    throw new Error((error as Error).message);
  }
}

/**
 * Create an friendship with the status InvitationSent from userID_invites to userID_invited
 */
export async function sendFriendshipInvite(userID_invited: string) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) throw new Error("No current user found");
    const currentUserId = currentUser.$id;

    const result = await databases.createDocument(
      config.databaseId,
      config.friendshipId,
      ID.unique(),
      {
        "userID-1": currentUserId,
        "userID-2": userID_invited,
        status: "InvitationSent",
        startOfFriendship: new Date().toISOString(),
      }
    );

    return result;
  } catch (error) {
    console.error("Error sending an invitation:", error);
    throw new Error((error as Error).message);
  }
}

/**
 * Accept a friendship by changing the friendship status to Friends
 */
export async function acceptFriendshipInvite(friendshipID: string) {
  try {
    const result = await databases.updateDocument(
      config.databaseId,
      config.friendshipId,
      String(friendshipID),
      {
        status: "Friends",
      }
    );

    return result;
  } catch (error) {
    console.error("Error accepting an invitation:", error);
    throw new Error((error as Error).message);
  }
}

/**
 * Delete a friendship
 */
export async function deleteFriendship(friendshipID: string) {
  try {
    const result = await databases.deleteDocument(
      config.databaseId,
      config.friendshipId,
      friendshipID
    );

    return result;
  } catch (error) {
    console.error("Error deleting a friendship:", error);
    throw new Error((error as Error).message);
  }
}
