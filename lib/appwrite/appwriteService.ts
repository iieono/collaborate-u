import { ID, Models, Query } from "appwrite";
import { appwriteConfig, databases, storage } from "./appwrite";
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
export const createUser = async (userData: User): Promise<Models.Document> => {
  try {
    const newUser = await databases.createDocument<Models.Document>(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      userData
    );

    if (typeof window !== "undefined") {
      window.localStorage.setItem("user", JSON.stringify(newUser));
    }

    return newUser;
  } catch (error) {
    console.error("User creation failed: ", error);
    throw new Error("User creation failed.");
  }
};

export const getUser = async (userId: string): Promise<Models.Document> => {
  return await databases.getDocument<Models.Document>(
    appwriteConfig.databaseId,
    appwriteConfig.usersCollectionId,
    userId
  );
};
export const loginUser = async (email: string, password: string) => {
  try {
    const userDocs = await databases.listDocuments<Models.Document>(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal("email", email)]
    );

    if (userDocs.total === 0) {
      throw new Error("User not found.");
    }

    const user = userDocs.documents[0]; // Assuming email is unique and only one user will be returned

    // You should use a secure method for password verification
    if (user?.password_hash !== password) {
      throw new Error("Invalid email or password.");
    }

    if (typeof window !== "undefined") {
      window.localStorage.setItem("user", JSON.stringify(user));
    }

    return user;
  } catch (error) {
    console.error("Login failed: ", error);
    throw new Error("Login failed.");
  }
};

// POSTS COLLECTION
export const createPost = async (postData: Post): Promise<Models.Document> => {
  return await databases.createDocument<Models.Document>(
    appwriteConfig.databaseId,
    appwriteConfig.postsCollectionId,
    ID.unique(),
    postData
  );
};

export const getPosts = async (): Promise<Models.Document[]> => {
  const response = await databases.listDocuments<Models.Document>(
    appwriteConfig.databaseId,
    appwriteConfig.postsCollectionId,
    [Query.orderDesc("createdAt")]
  );
  return response.documents;
};

// SKILLS COLLECTION
export const createSkill = async (
  skillData: Skill
): Promise<Models.Document> => {
  return await databases.createDocument<Models.Document>(
    appwriteConfig.databaseId,
    appwriteConfig.skillsCollectionId,
    ID.unique(),
    skillData
  );
};

export const getSkills = async (): Promise<Models.Document[]> => {
  const response = await databases.listDocuments<Models.Document>(
    appwriteConfig.databaseId,
    appwriteConfig.skillsCollectionId
  );
  return response.documents;
};

// USER_SKILLS COLLECTION
export const addUserSkill = async (
  userSkillData: UserSkill
): Promise<Models.Document> => {
  return await databases.createDocument<Models.Document>(
    appwriteConfig.databaseId,
    appwriteConfig.userSkillsCollectionId,
    ID.unique(),
    userSkillData
  );
};

export const getUserSkills = async (
  userId: string
): Promise<Models.Document[]> => {
  const response = await databases.listDocuments<Models.Document>(
    appwriteConfig.databaseId,
    appwriteConfig.userSkillsCollectionId,
    [Query.equal("userId", userId)]
  );
  return response.documents;
};

// HASHTAGS COLLECTION
export const createHashtag = async (
  hashtagData: Hashtag
): Promise<Models.Document> => {
  return await databases.createDocument<Models.Document>(
    appwriteConfig.databaseId,
    appwriteConfig.hashtagsCollectionId,
    ID.unique(),
    hashtagData
  );
};

export const getHashtags = async (): Promise<Models.Document[]> => {
  const response = await databases.listDocuments<Models.Document>(
    appwriteConfig.databaseId,
    appwriteConfig.hashtagsCollectionId
  );
  return response.documents;
};

// CHATS COLLECTION
export const createChat = async (chatData: Chat): Promise<Models.Document> => {
  return await databases.createDocument<Models.Document>(
    appwriteConfig.databaseId,
    appwriteConfig.chatsCollectionId,
    ID.unique(),
    chatData
  );
};

export const getUserChats = async (
  userId: string
): Promise<Models.Document[]> => {
  const response = await databases.listDocuments<Models.Document>(
    appwriteConfig.databaseId,
    appwriteConfig.chatsCollectionId,
    [
      Query.or([
        Query.equal("firstUser", userId),
        Query.equal("secondUser", userId),
      ]),
    ]
  );
  return response.documents;
};

// CHAT MESSAGES COLLECTION
export const sendMessage = async (
  messageData: ChatMessage
): Promise<Models.Document> => {
  return await databases.createDocument<Models.Document>(
    appwriteConfig.databaseId,
    appwriteConfig.chatMessagesCollectionId,
    ID.unique(),
    messageData
  );
};

export const getChatMessages = async (
  chatId: string
): Promise<Models.Document[]> => {
  const response = await databases.listDocuments<Models.Document>(
    appwriteConfig.databaseId,
    appwriteConfig.chatMessagesCollectionId,
    [Query.equal("chatId", chatId), Query.orderAsc("createdAt")]
  );
  return response.documents;
};

// FILE STORAGE
export const uploadFile = async (file: File): Promise<Models.File> => {
  return await storage.createFile(appwriteConfig.storageId, ID.unique(), file);
};

export const getFileUrl = (fileId: string): string => {
  return storage.getFileView(appwriteConfig.storageId, fileId);
};

export const deleteFile = async (fileId: string): Promise<void> => {
  await storage.deleteFile(appwriteConfig.storageId, fileId);
};
