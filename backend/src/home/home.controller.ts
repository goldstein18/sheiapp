import { Controller, Get, UseGuards } from "@nestjs/common";
import type { User } from "@supabase/supabase-js";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { SupabaseAuthGuard } from "../auth/supabase-auth.guard";
import { HomeService } from "./home.service";

@Controller("home")
@UseGuards(SupabaseAuthGuard)
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get("dashboard")
  dashboard(@CurrentUser() user: User) {
    return this.homeService.getDashboard(user.id, user.email ?? null);
  }
}
