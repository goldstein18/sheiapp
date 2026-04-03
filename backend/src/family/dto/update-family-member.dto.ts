import { IsOptional, IsString, IsUUID, MaxLength } from "class-validator";

export class UpdateFamilyMemberDto {
  @IsOptional()
  @IsString()
  @MaxLength(120)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(80)
  relation?: string;

  @IsOptional()
  @IsString()
  @MaxLength(40)
  generation_label?: string;

  @IsOptional()
  @IsUUID()
  parent_id?: string | null;
}
