import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.sdk.aora_pro",
  projectId: "6754b8dc00315040206e",
  databaseId: "6754bc72003832f6253c",
  usersCollectionId: "6754bdfa0022c9f1c2e9",
  videosCollectionId: "6754be190033b5af0a3f",
  bucketId: "6754c08b0012347cce35",
};

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
  .setProject(appwriteConfig.projectId) // Your project ID
  .setPlatform(appwriteConfig.platform); // Your application ID or bundle ID.

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createAccount = async ({
  email,
  password,
  username,
}: {
  email: string;
  password: string;
  username: string;
}) => {
  // Register User
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw new Error("Account creation failed");
    const avatarUrl = avatars.getInitials(username);

    await SignInUser({ email, password });
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );
    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error as string);
  }
};

export const SignInUser = async ({
  email,
  password,
}: {
  email: string;
  password: string | undefined;
}) => {
  try {
    // Try to fetch existing sessions

    // Create a new session
    const session = await account.createEmailPasswordSession(
      email,
      password as string
    );
    console.log("Session created:", session);
    return session;
  } catch (error: any) {
    if (error.message?.includes("missing scope (account)")) {
      console.error("User is unauthenticated. Please log in.");
      throw new Error("User is unauthenticated. Please log in.");
    }
    console.error("Error during SignInUser:", error);
    throw new Error(error.message || "Login failed unexpectedly");
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
    if (!currentUser) throw Error;
    return currentUser.documents[0];
  } catch (error) {
    console.error("Error during SignInUser:", error);
    throw new Error(
      (error as { message?: string })?.message || "currentUser failed"
    );
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videosCollectionId
    );
    if (posts.documents.length === 0) {
      console.log("No videos found in the collection.");
    }

    return posts.documents;
  } catch (error) {
    (error as { message?: string })?.message || "Videos not available";
  }
};
export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videosCollectionId,
      [Query.orderDesc("$createdAt")]
    );
    if (posts.documents.length === 0) {
      console.log("No videos found in the collection.");
    }

    return posts.documents;
  } catch (error) {
    (error as { message?: string })?.message || "Videos not available";
  }
};

export const SearchPosts = async ({ query }: { query: string }) => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videosCollectionId,
      [Query.search("title", query)]
    );
    if (posts.documents.length === 0) {
      console.log("No videos found in the collection.");
    }

    return posts.documents;
  } catch (error) {
    (error as { message?: string })?.message || "Videos not available";
  }
};

export const getUserPosts = async (userId: any) => {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.videosCollectionId,
      [Query.equal("creator", userId)]
    );
    if (posts.documents.length === 0) {
      console.log("No videos found in the collection.");
    }

    return posts.documents;
  } catch (error) {
    (error as { message?: string })?.message || "Videos not available";
  }
};

export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    throw new Error(
      (error as { message?: string })?.message || " could not delete session"
    );
  }
};
