import { useQuery } from "@tanstack/vue-query";
import { fetchAnimeList, searchAnime, type AnimeListResponse } from "~/lib/api/anime";

/**
 * Composable для получения списка аниме с пагинацией
 */
export function useAnimeList(page: Ref<number>, limit: number = 30) {
  return useQuery<AnimeListResponse>({
    queryKey: computed(() => ["anime-list", page.value, limit]),
    queryFn: () => fetchAnimeList(page.value, limit),
    staleTime: 1000 * 60 * 5, // 5 минут
    suspense: true,
  });
}

const MIN_SEARCH_LENGTH = 2;

/**
 * Composable для поиска аниме по названию
 * Запрос выполняется при минимум 2 символах
 */
export function useAnimeSearch(query: Ref<string>) {
  return useQuery<AnimeListResponse>({
    queryKey: computed(() => ["anime-search", query.value.trim()]),
    queryFn: () => searchAnime(query.value),
    enabled: computed(() => query.value.trim().length >= MIN_SEARCH_LENGTH),
    staleTime: 1000 * 60 * 5, // 5 минут
  });
}

export { MIN_SEARCH_LENGTH };
