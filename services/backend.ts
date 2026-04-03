import { apiJson, getApiBaseUrl } from "./api";

export type ProfileRow = {
  id: string;
  email: string | null;
  phone: string | null;
  full_name: string | null;
  first_name: string | null;
  last_name_paternal: string | null;
  last_name_maternal: string | null;
  birthdate: string | null;
  gender: string | null;
  onboarding_completed: boolean;
};

export type HomeDashboard = {
  hero: { title: string; subtitle: string };
  progress_percent: number;
  goals: { id: string; title: string; completed: boolean }[];
  course_segments: string[];
  promo_cards: {
    id: string;
    title: string;
    description: string | null;
    card_type: string;
  }[];
  featured_courses: CourseRow[];
};

export type CourseRow = {
  id: string;
  title: string;
  description: string | null;
  category: string;
  image_url: string | null;
  sort_order: number;
};

export type FamilyMemberRow = {
  id: string;
  user_id: string;
  name: string;
  relation: string;
  generation_label: string | null;
  parent_id: string | null;
  created_at: string;
  updated_at: string;
};

export function isApiConfigured(): boolean {
  return getApiBaseUrl().length > 0;
}

export async function getProfile(): Promise<ProfileRow> {
  return apiJson<ProfileRow>("/api/profiles/me");
}

export async function putProfile(body: {
  phone?: string;
  email?: string;
  full_name?: string;
  first_name?: string;
  last_name_paternal?: string;
  last_name_maternal?: string;
  birthdate?: string;
  gender?: string;
  onboarding_completed?: boolean;
}): Promise<ProfileRow> {
  return apiJson<ProfileRow>("/api/profiles/me", {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

export async function putQuestionnaire(body: {
  text_section?: Record<string, unknown>;
  color_section?: Record<string, unknown>;
  mark_onboarding_complete?: boolean;
}): Promise<unknown> {
  return apiJson("/api/questionnaires/me", {
    method: "PUT",
    body: JSON.stringify({
      text_section: body.text_section,
      color_section: body.color_section,
      mark_onboarding_complete: body.mark_onboarding_complete,
    }),
  });
}

export async function getHomeDashboard(): Promise<HomeDashboard> {
  return apiJson<HomeDashboard>("/api/home/dashboard");
}

export async function getCourses(category?: string): Promise<CourseRow[]> {
  const q = category ? `?category=${encodeURIComponent(category)}` : "";
  return apiJson<CourseRow[]>(`/api/courses${q}`);
}

export async function listFamilyMembers(): Promise<FamilyMemberRow[]> {
  return apiJson<FamilyMemberRow[]>("/api/family/members");
}

export async function createFamilyMember(body: {
  name: string;
  relation: string;
  generation_label?: string;
  parent_id?: string;
}): Promise<FamilyMemberRow> {
  return apiJson<FamilyMemberRow>("/api/family/members", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function updateFamilyMember(
  id: string,
  body: {
    name?: string;
    relation?: string;
    generation_label?: string;
    parent_id?: string | null;
  },
): Promise<FamilyMemberRow> {
  return apiJson<FamilyMemberRow>(`/api/family/members/${id}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}

export async function deleteFamilyMember(id: string): Promise<void> {
  await apiJson(`/api/family/members/${id}`, { method: "DELETE" });
}
