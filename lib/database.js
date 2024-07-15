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
    const userQuestBits = allQuestBits.filter((questbit) =>
      questIds.includes(questbit.quests.$id)
    );
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
      { quests: null }
    );

    await databases.updateDocument(
      config.databaseId,
      config.questbitCollectionId,
      id,
      { assignees: [] }
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
      [Query.notEqual('$id', currentUserId)]
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
      [Query.equal('$id', id)]
    );

    console.log(account.documents[0]);
    return account.documents[0];
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error(error.message);
  }
}

/**
 * Fetch all the users which who the current user
 * have a friendship with
 */
export async function fetchFriends() {
  try {
    const currentUser = await getCurrentUser();
    const currentUserId = currentUser.$id;

    const friendships = await databases.listDocuments(
      config.databaseId,
      config.friendshipId,
      [
        Query.or(
          [
            Query.equal("userID-1", currentUserId),
            Query.equal("userID-2", currentUserId)
          ]
        ),
        Query.equal('status', 'Friends')
      ]
    );

    // Map through friendships and fetch user details for each friend
    const friends = await Promise.all(friendships.map(async (friendship) => {
      if (friendship['userID-1'] === currentUserId) {
        return await getAccountFromId(friendship['userID-2']);
      } else {
        return await getAccountFromId(friendship['userID-1']);
      }
    }));

    return friends.documents;
  } catch (error) {
    console.error("Error fetching friends:", error);
    throw new Error(error.message);
  }
}

/**
 * Fetch all the users that are not friends already with the user
 */
export async function fetchFriendshipSuggestions() {
  try {
    const currentUser = await getCurrentUser();
    const currentUserId = currentUser.$id;

    const users = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.notEqual('$id', currentUserId)]
    );

    // Get all possible friendships which includes the current 
    // friendships and the friendship requests
    const possibleFriendships = await databases.listDocuments(
      config.databaseId,
      config.friendshipId,
      [
        Query.or(
          [
            Query.equal("userID-1", currentUserId),
            Query.equal("userID-2", currentUserId)
          ]
        )
      ]
    );

    // Map through friendships and fetch user details for each friend
    const alreadyFriendsIds = new Set();
    possibleFriendships.documents.forEach(friendship => {
      if (friendship['userID-1'] === currentUserId) {
        alreadyFriendsIds.add(friendship['userID-2']);
      } else {
        alreadyFriendsIds.add(friendship['userID-1']);
      }
    });

    // Filter out users who are already friends
    const suggestedUsers = users.documents.filter(user => {
      return !alreadyFriendsIds.has(user.$id);
    });

    return suggestedUsers;
  } catch (error) {
    console.error("Error fetching friendship suggestion:", error);
    throw new Error(error.message);
  }
}

/**
 * Fetch all the friendships that a user has received
 */
export async function fetchReceivedFriendshipInvitations() {
  try {
    const currentUser = await getCurrentUser();
    const currentUserId = currentUser.$id;

    const friendships = await databases.listDocuments(
      config.databaseId,
      config.friendshipId,
      [
        Query.equal('userID-2', currentUserId),
        Query.equal("status", ["InvitationSent"])
      ]
    );

    const friendshipRequests = await Promise.all(friendships.documents.map(async (friendship) => {
      const user = await getAccountFromId(friendship['userID-1']);
      return {
        ...friendship, // Include existing data from friendships if needed
        user: user // Attach user data fetched from getAccountFromId
      };
    }));

    return friendshipRequests;
  } catch (error) {
    console.error("Error fetching friendships:", error);
    throw new Error(error.message);
  }
}

/**
 * Create an friendship with the status InvitationSent from userID_invites to userID_invited
 */
export async function sendFriendshipInvite(userID_invited) {
  try {
    const currentUser = await getCurrentUser();
    const currentUserId = currentUser.$id;

    const result = await databases.createDocument(
      config.databaseId,
      config.friendshipId,
      ID.unique(),
      {
        'userID-1': currentUserId,
        'userID-2': userID_invited,
        'status': "InvitationSent",
        "startOfFriendship": (new Date()).toISOString()
      }
    );

    return result;
  } catch (error) {
    console.error('Error sending an invitation:', error);
    throw new Error(error.message);
  }
}

/**
 * Create an friendship with the status InvitationSent from userID_invites to userID_invited
 */
export async function acceptFriendshipInvite(friendshipID) {
  try {
    const result = await databases.updateDocument(
      config.databaseId,
      config.friendshipId,
      friendshipID,
      {
        'status': "Friends"
      }
    );

    return result;
  } catch (error) {
    console.error('Error accepting an invitation:', error);
    throw new Error(error.message);
  }
}

/**
 * Create an friendship with the status InvitationSent from userID_invites to userID_invited
 */
export async function deleteFriendship(friendshipID) {
  try {
    const result = await databases.deleteDocument(
      config.databaseId,
      config.friendshipId,
      friendshipID
    );

    return result;
  } catch (error) {
    console.error('Error deleting a friendship:', error);
    throw new Error(error.message);
  }
}