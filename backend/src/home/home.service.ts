import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { SupabaseService } from "../supabase/supabase.service";

const SEGMENTS = ["Todos", "Negocios", "Tecnología", "Creatividad"];

@Injectable()
export class HomeService {
  constructor(private readonly supabase: SupabaseService) {}

  async getDashboard(userId: string, emailFallback: string | null) {
    const client = this.supabase.getClient();

    const { data: profile, error: pErr } = await client
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle();
    if (pErr) {
      throw new InternalServerErrorException(pErr.message);
    }

    const { data: questionnaire, error: qErr } = await client
      .from("questionnaire_responses")
      .select("*")
      .eq("user_id", userId)
      .eq("version", "1")
      .maybeSingle();
    if (qErr) {
      throw new InternalServerErrorException(qErr.message);
    }

    const { data: promos, error: promoErr } = await client
      .from("promo_cards")
      .select("*")
      .eq("active", true)
      .order("sort_order", { ascending: true });
    if (promoErr) {
      throw new InternalServerErrorException(promoErr.message);
    }

    const { data: courses, error: cErr } = await client
      .from("courses")
      .select("*")
      .order("sort_order", { ascending: true })
      .limit(8);
    if (cErr) {
      throw new InternalServerErrorException(cErr.message);
    }

    const displayName =
      profile?.full_name ||
      [profile?.first_name, profile?.last_name_paternal]
        .filter(Boolean)
        .join(" ")
        .trim() ||
      profile?.email ||
      emailFallback ||
      "Usuario";

    const goalProfile = !!(
      profile?.phone &&
      profile?.birthdate &&
      profile?.gender
    );
    const goalQuiz = !!(
      questionnaire?.text_section && questionnaire?.color_section
    );
    const goalPlan = !!profile?.onboarding_completed;

    const goals = [
      {
        id: "profile",
        title: "Perfil inicial completo",
        completed: goalProfile,
      },
      {
        id: "quiz",
        title: "Cuestionario AS-27",
        completed: goalQuiz,
      },
      {
        id: "plan",
        title: "Define tu plan de acción",
        completed: goalPlan,
      },
    ];

    const done = goals.filter((g) => g.completed).length;
    const progressPercent = Math.round((done / goals.length) * 100);

    return {
      hero: {
        title: `Hola, ${displayName.split(" ")[0] ?? "bienvenido"}`,
        subtitle:
          "Continúa construyendo tu perfil y desbloquea nuevas oportunidades.",
      },
      progress_percent: progressPercent,
      goals,
      course_segments: SEGMENTS,
      promo_cards: promos ?? [],
      featured_courses: courses ?? [],
    };
  }
}
