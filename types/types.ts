// types.ts

export interface User {
  id?: string;
  full_name: string;
  username: string;
  password_hash: string;
  email: string;
  avatar?: string;
  createdAt?: string;
}

export interface Post {
  id?: string;
  owner: string; // User ID
  title: string;
  details: string;
  hashtags?: string[];
  pictures?: string[];
  createdAt?: string;
}

export interface Skill {
  id?: string;
  name: string;
}

export interface UserSkill {
  id?: string;
  userId: string;
  skillId: string;
}

export interface Hashtag {
  id?: string;
  name: string;
}

export interface Chat {
  id?: string;
  firstUser: string; // User ID
  secondUser: string; // User ID
  lastMessage?: string;
  createdAt?: string;
}

export interface ChatMessage {
  id?: string;
  chatId: string;
  senderId: string; // User ID
  message: string;
  createdAt?: string;
}

export interface FileData {
  id?: string;
  fileId: string;
  url: string;
  createdAt?: string;
}
