import { useQuery } from "@tanstack/vue-query";
import { 
  fetchAnimeListFiltered, 
  fetchAnimeKinds,
  fetchAnimeStatuses,
  fetchAnimeRatings,
  type AnimeFilters, 
  type AnimeListResponse,
  type AnimeKind,
  type AnimeStatus,
  type AnimeRating
} from "~/lib/api/anime";

/**
 * Composable для получения отфильтрованного списка аниме
 */
export function useAnimeFiltered(filters: Ref<AnimeFilters>) {
  return useQuery<AnimeListResponse>({
    queryKey: computed(() => ["anime-filtered", JSON.stringify(filters.value)]),
    queryFn: () => fetchAnimeListFiltered(filters.value),
    staleTime: 1000 * 60 * 5, // 5 минут
  });
}

/**
 * Composable для получения списка типов аниме
 */
export function useAnimeKinds() {
  return useQuery<AnimeKind[]>({
    queryKey: ["anime-kinds"],
    queryFn: fetchAnimeKinds,
    staleTime: 1000 * 60 * 60, // 1 час (редко меняется)
  });
}

/**
 * Composable для получения списка статусов
 */
export function useAnimeStatuses() {
  return useQuery<AnimeStatus[]>({
    queryKey: ["anime-statuses"],
    queryFn: fetchAnimeStatuses,
    staleTime: 1000 * 60 * 60,
  });
}

/**
 * Composable для получения списка рейтингов
 */
export function useAnimeRatings() {
  return useQuery<AnimeRating[]>({
    queryKey: ["anime-ratings"],
    queryFn: fetchAnimeRatings,
    staleTime: 1000 * 60 * 60,
  });
}

// Маппинг типов на русский
export const kindLabels: Record<AnimeKind, string> = {
  tv: "ТВ-Сериал",
  tv_special: "ТВ-Спешл",
  movie: "Фильм",
  ova: "OVA",
  ona: "ONA",
  special: "Спешл",
  cm: "Реклама",
  pv: "Промо",
};

// Маппинг статусов на русский
export const statusLabels: Record<AnimeStatus, string> = {
  anons: "Анонс",
  ongoing: "Онгоинг",
  released: "Завершено",
};

// Маппинг рейтингов на русский
export const ratingLabels: Record<AnimeRating, string> = {
  g: "G (0+)",
  pg: "PG (6+)",
  pg_13: "PG-13 (13+)",
  r: "R (16+)",
  r_plus: "R+ (18+)",
  none: "Без рейтинга",
};

// Маппинг сортировки
export const sortByLabels: Record<string, string> = {
  score: "Рейтингу",
  aired_on: "Дате выхода",
  russian: "Названию",
};
