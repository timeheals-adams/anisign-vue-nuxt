import { useQuery } from "@tanstack/vue-query";
import { fetchAnimeById, type Anime } from "~/lib/api/anime";

/**
 * Composable для получения аниме по ID
 */
export function useAnimeById(animeId: Ref<string> | string) {
  const id = isRef(animeId) ? animeId : ref(animeId);

  return useQuery<Anime>({
    queryKey: ["anime", id],
    queryFn: () => fetchAnimeById(id.value),
    enabled: computed(() => !!id.value),
    staleTime: 1000 * 60 * 10, // 10 минут
  });
}
