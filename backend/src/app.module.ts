import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { CoursesModule } from "./courses/courses.module";
import { FamilyModule } from "./family/family.module";
import { HealthModule } from "./health/health.module";
import { HomeModule } from "./home/home.module";
import { ProfilesModule } from "./profiles/profiles.module";
import { QuestionnairesModule } from "./questionnaires/questionnaires.module";
import { SupabaseModule } from "./supabase/supabase.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SupabaseModule,
    HealthModule,
    AuthModule,
    ProfilesModule,
    QuestionnairesModule,
    CoursesModule,
    HomeModule,
    FamilyModule,
  ],
})
export class AppModule {}
