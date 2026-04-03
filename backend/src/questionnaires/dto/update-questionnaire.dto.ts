import { IsBoolean, IsObject, IsOptional } from "class-validator";

export class UpdateQuestionnaireDto {
  @IsOptional()
  @IsObject()
  text_section?: Record<string, unknown>;

  @IsOptional()
  @IsObject()
  color_section?: Record<string, unknown>;

  @IsOptional()
  @IsBoolean()
  mark_onboarding_complete?: boolean;
}
