import { Body, Controller, Get, Put, UseGuards } from "@nestjs/common";
import type { User } from "@supabase/supabase-js";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { SupabaseAuthGuard } from "../auth/supabase-auth.guard";
import { UpdateQuestionnaireDto } from "./dto/update-questionnaire.dto";
import { QuestionnairesService } from "./questionnaires.service";

@Controller("questionnaires")
@UseGuards(SupabaseAuthGuard)
export class QuestionnairesController {
  constructor(private readonly questionnairesService: QuestionnairesService) {}

  @Get("me")
  getMe(@CurrentUser() user: User) {
    return this.questionnairesService.getMe(user.id);
  }

  @Put("me")
  putMe(@CurrentUser() user: User, @Body() dto: UpdateQuestionnaireDto) {
    return this.questionnairesService.upsert(user.id, dto);
  }
}
