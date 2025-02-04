import { Account, Client, Databases, Storage } from "appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.iieo.collaborate-u",
  projectId: "679cce0e001db609cb07",
  databaseId: "679cd2de002682895c86",
  storageId: "67a25fca00365eb6128c",
  usersCollectionId: "67a25980000486c2ba6f",
  postsCollectionId: "67a25ccd000c44c8e948",
  skillsCollectionId: "67a25a940034e546ce94",
  userSkillsCollectionId: "67a25ccd000c44c8e948",
  hashtagsCollectionId: "67a25d87002b0537d0d2",
  chatsCollectionId: "67a25dab0036bff064d5",
  chatMessagesCollectionId: "67a25e520026e9b1f9e4",
};

// Initialize the Appwrite client
const client = new Client();
client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId);
// .setPlatform(appwriteConfig.platform);

// Initialize the Appwrite services
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
