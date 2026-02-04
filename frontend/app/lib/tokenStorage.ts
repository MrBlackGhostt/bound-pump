import { TokenData } from "../types/token";

const STORAGE_KEY = "created_tokens";

export const tokenStorage = {
  // Save a newly created token
  saveToken: (token: TokenData): void => {
    try {
      const tokens = tokenStorage.getAllTokens();
      
      // Check if token already exists (by mint address)
      const exists = tokens.find(t => t.mintAddress === token.mintAddress);
      if (exists) {
        console.log("Token already exists in storage:", token.mintAddress);
        return;
      }
      
      tokens.push(token);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens));
      console.log("Token saved to localStorage:", token.name);
    } catch (error) {
      console.error("Failed to save token:", error);
    }
  },

  // Get all tokens
  getAllTokens: (): TokenData[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Failed to load tokens:", error);
      return [];
    }
  },

  // Get tokens created by a specific wallet
  getTokensByCreator: (creator: string): TokenData[] => {
    const allTokens = tokenStorage.getAllTokens();
    return allTokens.filter((token) => token.creator === creator);
  },

  // Get a specific token by mint address
  getTokenByMint: (mintAddress: string): TokenData | null => {
    const allTokens = tokenStorage.getAllTokens();
    return allTokens.find((token) => token.mintAddress === mintAddress) || null;
  },

  // Check if a token with this name exists for a creator
  tokenNameExists: (creator: string, name: string): TokenData | null => {
    const creatorTokens = tokenStorage.getTokensByCreator(creator);
    return creatorTokens.find((token) => token.name === name) || null;
  },

  // Clear all tokens (for testing)
  clearAll: (): void => {
    localStorage.removeItem(STORAGE_KEY);
  },
};
