import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import type { User } from "@supabase/supabase-js";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { SupabaseAuthGuard } from "../auth/supabase-auth.guard";
import { CoursesService } from "./courses.service";

@Controller("courses")
@UseGuards(SupabaseAuthGuard)
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  list(@Query("category") category?: string) {
    return this.coursesService.list(category);
  }

  @Get("me/progress")
  myProgress(@CurrentUser() user: User) {
    return this.coursesService.getProgress(user.id);
  }
}
