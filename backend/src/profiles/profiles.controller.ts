import { Body, Controller, Get, Put, UseGuards } from "@nestjs/common";
import type { User } from "@supabase/supabase-js";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { SupabaseAuthGuard } from "../auth/supabase-auth.guard";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { ProfilesService } from "./profiles.service";

@Controller("profiles")
@UseGuards(SupabaseAuthGuard)
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Get("me")
  getMe(@CurrentUser() user: User) {
    return this.profilesService.getByUserId(user.id, user.email ?? null);
  }

  @Put("me")
  putMe(@CurrentUser() user: User, @Body() dto: UpdateProfileDto) {
    return this.profilesService.upsert(user.id, user.email ?? "", dto);
  }
}
