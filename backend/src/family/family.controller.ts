import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import type { User } from "@supabase/supabase-js";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { SupabaseAuthGuard } from "../auth/supabase-auth.guard";
import { CreateFamilyMemberDto } from "./dto/create-family-member.dto";
import { UpdateFamilyMemberDto } from "./dto/update-family-member.dto";
import { FamilyService } from "./family.service";

@Controller("family")
@UseGuards(SupabaseAuthGuard)
export class FamilyController {
  constructor(private readonly familyService: FamilyService) {}

  @Get("members")
  list(@CurrentUser() user: User) {
    return this.familyService.list(user.id);
  }

  @Post("members")
  create(@CurrentUser() user: User, @Body() dto: CreateFamilyMemberDto) {
    return this.familyService.create(user.id, dto);
  }

  @Patch("members/:id")
  update(
    @CurrentUser() user: User,
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: UpdateFamilyMemberDto,
  ) {
    return this.familyService.update(user.id, id, dto);
  }

  @Delete("members/:id")
  remove(
    @CurrentUser() user: User,
    @Param("id", ParseUUIDPipe) id: string,
  ) {
    return this.familyService.remove(user.id, id);
  }
}
