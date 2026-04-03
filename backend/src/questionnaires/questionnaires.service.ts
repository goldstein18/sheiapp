import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { SupabaseService } from "../supabase/supabase.service";
import { UpdateQuestionnaireDto } from "./dto/update-questionnaire.dto";

const VERSION = "1";

@Injectable()
export class QuestionnairesService {
  constructor(private readonly supabase: SupabaseService) {}

  async getMe(userId: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from("questionnaire_responses")
      .select("*")
      .eq("user_id", userId)
      .eq("version", VERSION)
      .maybeSingle();
    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    return (
      data ?? {
        user_id: userId,
        version: VERSION,
        text_section: null,
        color_section: null,
        updated_at: null,
      }
    );
  }

  async upsert(userId: string, dto: UpdateQuestionnaireDto) {
    const client = this.supabase.getClient();
    const { data: existing, error: readErr } = await client
      .from("questionnaire_responses")
      .select("*")
      .eq("user_id", userId)
      .eq("version", VERSION)
      .maybeSingle();
    if (readErr) {
      throw new InternalServerErrorException(readErr.message);
    }
    const text_section =
      dto.text_section ?? existing?.text_section ?? undefined;
    const color_section =
      dto.color_section ?? existing?.color_section ?? undefined;
    const now = new Date().toISOString();
    const row = {
      user_id: userId,
      version: VERSION,
      text_section: text_section ?? null,
      color_section: color_section ?? null,
      updated_at: now,
    };
    const { data, error } = await client
      .from("questionnaire_responses")
      .upsert(row, { onConflict: "user_id,version" })
      .select("*")
      .single();
    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    if (dto.mark_onboarding_complete) {
      const now = new Date().toISOString();
      const { error: profileErr } = await this.supabase
        .getClient()
        .from("profiles")
        .upsert(
          {
            id: userId,
            onboarding_completed: true,
            updated_at: now,
          },
          { onConflict: "id" },
        );
      if (profileErr) {
        throw new InternalServerErrorException(profileErr.message);
      }
    }
    return data;
  }
}
