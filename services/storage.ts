import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject,
  listAll,
  StorageReference
} from 'firebase/storage';
import { storage } from '../config/firebase';

export const storageService = {
  // Upload a file to Firebase Storage
  async uploadFile(file: File | Blob, path: string): Promise<string> {
    try {
      const storageRef = ref(storage, path);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      throw error;
    }
  },

  // Get download URL for a file
  async getDownloadURL(path: string): Promise<string> {
    try {
      const storageRef = ref(storage, path);
      return await getDownloadURL(storageRef);
    } catch (error) {
      throw error;
    }
  },

  // Delete a file from Firebase Storage
  async deleteFile(path: string): Promise<void> {
    try {
      const storageRef = ref(storage, path);
      await deleteObject(storageRef);
    } catch (error) {
      throw error;
    }
  },

  // List all files in a directory
  async listFiles(path: string): Promise<StorageReference[]> {
    try {
      const storageRef = ref(storage, path);
      const result = await listAll(storageRef);
      return result.items;
    } catch (error) {
      throw error;
    }
  },

  // Upload user profile image
  async uploadProfileImage(userId: string, imageFile: File | Blob): Promise<string> {
    const path = `users/${userId}/profile.jpg`;
    return await this.uploadFile(imageFile, path);
  },

  // Upload app data
  async uploadAppData(userId: string, data: any, filename: string): Promise<string> {
    const jsonString = JSON.stringify(data);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const path = `users/${userId}/data/${filename}.json`;
    return await this.uploadFile(blob, path);
  }
}; 