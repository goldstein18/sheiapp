import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import type { User } from "@supabase/supabase-js";
import { SupabaseAuthGuard } from "./supabase-auth.guard";

@Controller("auth")
export class AuthController {
  @Get("me")
  @UseGuards(SupabaseAuthGuard)
  me(@Req() req: { user: User }) {
    const u = req.user;
    return {
      id: u.id,
      email: u.email,
      appMetadata: u.app_metadata,
      userMetadata: u.user_metadata,
    };
  }
}
