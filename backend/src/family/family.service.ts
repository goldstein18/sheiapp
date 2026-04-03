import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { SupabaseService } from "../supabase/supabase.service";
import { CreateFamilyMemberDto } from "./dto/create-family-member.dto";
import { UpdateFamilyMemberDto } from "./dto/update-family-member.dto";

@Injectable()
export class FamilyService {
  constructor(private readonly supabase: SupabaseService) {}

  async list(userId: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from("family_members")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: true });
    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    return data ?? [];
  }

  async create(userId: string, dto: CreateFamilyMemberDto) {
    const now = new Date().toISOString();
    const { data, error } = await this.supabase
      .getClient()
      .from("family_members")
      .insert({
        user_id: userId,
        name: dto.name,
        relation: dto.relation,
        generation_label: dto.generation_label ?? null,
        parent_id: dto.parent_id ?? null,
        updated_at: now,
      })
      .select("*")
      .single();
    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    return data;
  }

  async update(userId: string, id: string, dto: UpdateFamilyMemberDto) {
    await this.ensureOwner(userId, id);
    const now = new Date().toISOString();
    const patch: Record<string, unknown> = { updated_at: now };
    if (dto.name !== undefined) patch.name = dto.name;
    if (dto.relation !== undefined) patch.relation = dto.relation;
    if (dto.generation_label !== undefined) {
      patch.generation_label = dto.generation_label;
    }
    if (dto.parent_id !== undefined) patch.parent_id = dto.parent_id;
    const { data, error } = await this.supabase
      .getClient()
      .from("family_members")
      .update(patch)
      .eq("id", id)
      .eq("user_id", userId)
      .select("*")
      .single();
    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    return data;
  }

  async remove(userId: string, id: string) {
    await this.ensureOwner(userId, id);
    const { error } = await this.supabase
      .getClient()
      .from("family_members")
      .delete()
      .eq("id", id)
      .eq("user_id", userId);
    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    return { ok: true };
  }

  private async ensureOwner(userId: string, memberId: string) {
    const { data, error } = await this.supabase
      .getClient()
      .from("family_members")
      .select("id")
      .eq("id", memberId)
      .eq("user_id", userId)
      .maybeSingle();
    if (error) {
      throw new InternalServerErrorException(error.message);
    }
    if (!data) {
      throw new NotFoundException("Miembro no encontrado");
    }
  }
}
