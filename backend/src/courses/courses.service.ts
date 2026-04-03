import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { SupabaseService } from "../supabase/supabase.service";

@Injectable()
export class CoursesService {
  constructor(private readonly supabase: SupabaseService) {}

  async list(category?: string) {
    let q = this.supabase
      .getClient()
      .from("courses")
      .select("*")
      .order("sort_order", { ascending: true });
    if (category && category !== "Todos") {
      q = q.eq("category", category);
    }
    const { data, error } = await q;
    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    return data ?? [];
  }

  async getProgress(userId: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from("user_course_progress")
      .select("*")
      .eq("user_id", userId);
    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    return data ?? [];
  }
}
