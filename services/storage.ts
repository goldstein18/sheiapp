import { supabase } from "../config/supabase";

const bucket =
  process.env.EXPO_PUBLIC_SUPABASE_STORAGE_BUCKET ?? "uploads";

export const storageService = {
  async uploadFile(
    file: File | Blob | ArrayBuffer,
    path: string,
  ): Promise<string> {
    const { error } = await supabase.storage
      .from(bucket)
      .upload(path, file, { upsert: true });
    if (error) throw error;
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  },

  getPublicUrl(path: string): string {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  },

  async deleteFile(path: string): Promise<void> {
    const { error } = await supabase.storage.from(bucket).remove([path]);
    if (error) throw error;
  },

  async listFiles(prefix: string): Promise<string[]> {
    const { data, error } = await supabase.storage
      .from(bucket)
      .list(prefix);
    if (error) throw error;
    return (data ?? []).map((f) => f.name);
  },

  async uploadProfileImage(
    userId: string,
    imageFile: File | Blob | ArrayBuffer,
  ): Promise<string> {
    const path = `users/${userId}/profile.jpg`;
    return this.uploadFile(imageFile, path);
  },

  async uploadAppData(
    userId: string,
    data: unknown,
    filename: string,
  ): Promise<string> {
    const jsonString = JSON.stringify(data);
    const bytes = new TextEncoder().encode(jsonString);
    const path = `users/${userId}/data/${filename}.json`;
    return this.uploadFile(bytes, path);
  },
};
