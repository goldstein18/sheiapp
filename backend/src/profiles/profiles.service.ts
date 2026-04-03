import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { SupabaseService } from "../supabase/supabase.service";
import { UpdateProfileDto } from "./dto/update-profile.dto";

@Injectable()
export class ProfilesService {
  constructor(private readonly supabase: SupabaseService) {}

  async getByUserId(userId: string, fallbackEmail: string | null) {
    const { data, error } = await this.supabase
      .getClient()
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle();
    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    if (!data) {
      return {
        id: userId,
        email: fallbackEmail,
        phone: null,
        full_name: null,
        first_name: null,
        last_name_paternal: null,
        last_name_maternal: null,
        birthdate: null,
        gender: null,
        onboarding_completed: false,
      };
    }
    return data;
  }

  async upsert(userId: string, emailFromAuth: string, dto: UpdateProfileDto) {
    const now = new Date().toISOString();
    const row = {
      id: userId,
      email: dto.email ?? emailFromAuth,
      phone: dto.phone,
      full_name: dto.full_name,
      first_name: dto.first_name,
      last_name_paternal: dto.last_name_paternal,
      last_name_maternal: dto.last_name_maternal,
      birthdate: dto.birthdate ?? null,
      gender: dto.gender,
      onboarding_completed: dto.onboarding_completed,
      updated_at: now,
    };
    const cleaned = Object.fromEntries(
      Object.entries(row).filter(([, v]) => v !== undefined),
    );
    const { data, error } = await this.supabase
      .getClient()
      .from("profiles")
      .upsert(cleaned, { onConflict: "id" })
      .select("*")
      .single();
    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    return data;
  }
}
