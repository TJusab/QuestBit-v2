import { Account, Avatars, Databases, ID, Query } from "react-native-appwrite";
import client, { config } from './client';
import { documentToUser } from "@/utils/mapping";

const account = new Account(client);
const databases = new Databases(client);

/**
 * Creates a new account and adds it to the database
 * @param email of the new user
 * @param password of the new user
 * @param username of the new user
 * @returns the new user object
 */
export async function register(email: string, password: string, username: string) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username,
    );

    if (!newAccount) throw new Error("Account creation failed");

    await login(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        email: email,
        username: username,
        icon: "Witch",
        level: 1,
        experiencePoints: 0,
      }
    );

    return newUser;
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

/**
 * Logs in an existing user
 * @param email of the user to log in 
 * @param password of the user to log in
 * @returns the session response
 */
export async function login(email: string, password: string) {
  try {
    const session = await account.createEmailPasswordSession(email, password);

    return session;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

/**
 * Returns the current user that is logged in
 */
export async function getCurrentUser() {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw new Error('No account found');

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("email", currentAccount.email)]
    );

    if (!currentUser || currentUser.total === 0) throw new Error('No user found');

    return documentToUser(currentUser.documents[0]);
  } catch (error) {
    return null;
  }
}

/**
 * Logs out the current by deleting its current session
 * @returns the session response that was deleted
 */
export async function logout() {
  try {
    const session = await account.deleteSession("current");

    return session;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}

/**
 * Saves new profile settings
 */
export async function saveProfileSettings(fields: {
  username: string;
  email: string;
  password: string;
}) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("No user found");
    }

    // Check if username needs to be updated
    if (user.username !== fields.username) {
      await databases.updateDocument(
        config.databaseId,
        config.userCollectionId,
        user.$id,
        { username: fields.username }
      )
    }

    // Update email and password
    if (fields.password !== "") {
      await account.updateEmail(
        fields.email,
        fields.password,
      );
    }

  } catch (error) {
    throw new Error((error as Error).message);
  }
}