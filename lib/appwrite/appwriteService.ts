import { ID, Query } from "appwrite";
import { account, appwriteConfig } from "./appwrite";
import { databases, storage } from "./appwrite";
import {
  User,
  Post,
  Skill,
  UserSkill,
  Hashtag,
  Chat,
  ChatMessage,
} from "@/types/types";

// USERS COLLECTION
export const createUser = async (userData: User) => {
  return await databases.createDocument<User>(
    appwriteConfig.databaseId,
    appwriteConfig.usersCollectionId,
    ID.unique(),
    userData
  );
};

export const getUser = async (userId: string) => {
  return await databases.getDocument<User>(
    appwriteConfig.databaseId,
    appwriteConfig.usersCollectionId,
    userId
  );
};
export const loginUser = async (email: string, password: string) => {
  try {
    // Retrieve the user from the database by email
    const userDocs = await databases.listDocuments<User>(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal("email", email)]
    );

    if (userDocs.total === 0) {
      throw new Error("User not found.");
    }

    const user = userDocs.documents[0]; // Assuming email is unique and only one user will be returned

    // If user is found, verify the password (you need to have hashed passwords in the database)
    if (user?.password_hash !== password) {
      throw new Error("Invalid email or password.");
    }

    // Create session for the user

    return session;
  } catch (error) {
    console.error("Login failed: ", error);
    throw new Error(error.message || "Login failed.");
  }
};

// POSTS COLLECTION
export const createPost = async (postData: Post) => {
  return await databases.createDocument<Post>(
    appwriteConfig.databaseId,
    appwriteConfig.postsCollectionId,
    ID.unique(),
    postData
  );
};

export const getPosts = async () => {
  return await databases.listDocuments<Post>(
    appwriteConfig.databaseId,
    appwriteConfig.postsCollectionId,
    [Query.orderDesc("createdAt")]
  );
};

// SKILLS COLLECTION
export const createSkill = async (skillData: Skill) => {
  return await databases.createDocument<Skill>(
    appwriteConfig.databaseId,
    appwriteConfig.skillsCollectionId,
    ID.unique(),
    skillData
  );
};

export const getSkills = async () => {
  return await databases.listDocuments<Skill>(
    appwriteConfig.databaseId,
    appwriteConfig.skillsCollectionId
  );
};

// USER_SKILLS COLLECTION
export const addUserSkill = async (userSkillData: UserSkill) => {
  return await databases.createDocument<UserSkill>(
    appwriteConfig.databaseId,
    appwriteConfig.userSkillsCollectionId,
    ID.unique(),
    userSkillData
  );
};

export const getUserSkills = async (userId: string) => {
  return await databases.listDocuments<UserSkill>(
    appwriteConfig.databaseId,
    appwriteConfig.userSkillsCollectionId,
    [Query.equal("userId", userId)]
  );
};

// HASHTAGS COLLECTION
export const createHashtag = async (hashtagData: Hashtag) => {
  return await databases.createDocument<Hashtag>(
    appwriteConfig.databaseId,
    appwriteConfig.hashtagsCollectionId,
    ID.unique(),
    hashtagData
  );
};

export const getHashtags = async () => {
  return await databases.listDocuments<Hashtag>(
    appwriteConfig.databaseId,
    appwriteConfig.hashtagsCollectionId
  );
};

// CHATS COLLECTION
export const createChat = async (chatData: Chat) => {
  return await databases.createDocument<Chat>(
    appwriteConfig.databaseId,
    appwriteConfig.chatsCollectionId,
    ID.unique(),
    chatData
  );
};

export const getUserChats = async (userId: string) => {
  return await databases.listDocuments<Chat>(
    appwriteConfig.databaseId,
    appwriteConfig.chatsCollectionId,
    [
      Query.or([
        Query.equal("firstUser", userId),
        Query.equal("secondUser", userId),
      ]),
    ]
  );
};

// CHAT MESSAGES COLLECTION
export const sendMessage = async (messageData: ChatMessage) => {
  return await databases.createDocument<ChatMessage>(
    appwriteConfig.databaseId,
    appwriteConfig.chatMessagesCollectionId,
    ID.unique(),
    messageData
  );
};

export const getChatMessages = async (chatId: string) => {
  return await databases.listDocuments<ChatMessage>(
    appwriteConfig.databaseId,
    appwriteConfig.chatMessagesCollectionId,
    [Query.equal("chatId", chatId), Query.orderAsc("createdAt")]
  );
};

// FILE STORAGE
export const uploadFile = async (file: File) => {
  const response = await storage.createFile(
    appwriteConfig.storageId,
    ID.unique(),
    file
  );
  return response;
};

export const getFileUrl = (fileId: string) => {
  return storage.getFileView(appwriteConfig.storageId, fileId).href;
};

export const deleteFile = async (fileId: string) => {
  return await storage.deleteFile(appwriteConfig.storageId, fileId);
};
