import { useQuery } from "@tanstack/vue-query";
import { fetchGenreList, type Genre } from "~/lib/api/anime";

export function useGenreList() {
  return useQuery<Genre[]>({
    queryKey: ["genre-list"],
    queryFn: fetchGenreList,
    staleTime: 1000 * 60 * 60 * 12, // 12 часов
  });
}
