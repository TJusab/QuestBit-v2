import { Client } from 'react-native-appwrite';

export const config = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.tjusab.questbit",
    projectId: "666268f000053e772c08",
    databaseId: "66626a53000c1c0a2c58",
    userCollectionId: "66626a79000cec9332d5",
    questCollectionId: "6665fd98002aa635ea42",
    questbitCollectionId: "66626aa1003e6b35e05f",
    storageId: "6662739e0013771f4949",
    friendshipId: "6691c5a200232f4e45bc"
};

const client = new Client();

client
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setPlatform(config.platform);

export default client;