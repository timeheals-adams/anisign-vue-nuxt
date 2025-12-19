// API для работы с аниме
// Используем серверный прокси для избежания CORS и Mixed Content проблем
const API_BASE = "/api";

export interface Genre {
  id: string;
  russian: string;
  genre_id: string | number;
  name: string;
}

export interface Anime {
  anime_id: string;
  id: string;
  status: "released" | "ongoing" | "anons";
  episodes: number;
  episodesAired: number;
  nextEpisodeAt: string | null;
  english: string;
  russian: string;
  duration: number;
  isCensored: boolean;
  aired_on: string;
  released_on: string | null;
  screenshots: string[];
  kind: "tv" | "movie" | "ova" | "ona" | "special" | "music";
  description: string;
  rating: string;
  season: string;
  genre_ids: string[];
  score: number;
  poster_url: string;
  related_anime_ids: string[];
  character_ids: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AnimeListResponse {
  total_count: number;
  anime_list: Anime[];
}

/**
 * Получение списка жанров
 */
export async function fetchGenreList(): Promise<Genre[]> {
  const response = await fetch(
    `${API_BASE}/genre/get-list-genres`,
    {
      headers: {
        accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch genres: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Получение жанра по genre_id (например: 27)
 */
export async function fetchGenreByGenreId(genreId: string): Promise<Genre> {
  const response = await fetch(
    `${API_BASE}/genre/get-genre/${encodeURIComponent(genreId)}`,
    {
      headers: {
        accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch genre: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Получение списка аниме с пагинацией
 */
export async function fetchAnimeList(
  page: number = 1,
  limit: number = 30
): Promise<AnimeListResponse> {
  const response = await fetch(
    `${API_BASE}/anime/get-anime-list?page=${page}&limit=${limit}`,
    {
      headers: {
        accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch anime list: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Поиск аниме по названию
 */
export async function searchAnime(
  query: string
): Promise<AnimeListResponse> {
  const encodedQuery = encodeURIComponent(query.trim());
  const response = await fetch(
    `${API_BASE}/anime/name/${encodedQuery}`,
    {
      headers: {
        accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to search anime: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Маппинг типа аниме на русский
 */
export function getKindLabel(kind: Anime["kind"]): string {
  const labels: Record<Anime["kind"], string> = {
    tv: "ТВ-Сериал",
    movie: "Фильм",
    ova: "OVA",
    ona: "ONA",
    special: "Спешл",
    music: "Клип",
  };
  return labels[kind] || kind;
}

/**
 * Получение года из даты
 */
export function getYear(dateString: string | null): string {
  if (!dateString) return "—";
  return new Date(dateString).getFullYear().toString();
}

/**
 * Получение аниме по ID
 */
export async function fetchAnimeById(animeId: string): Promise<Anime> {
  const response = await fetch(
    `${API_BASE}/anime/id/${animeId}`,
    {
      headers: {
        accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch anime: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Маппинг статуса аниме на русский
 */
export function getStatusLabel(status: Anime["status"]): string {
  const labels: Record<Anime["status"], string> = {
    released: "Вышел",
    ongoing: "Онгоинг",
    anons: "Анонс",
  };
  return labels[status] || status;
}

/**
 * Маппинг рейтинга на русский
 */
export function getRatingLabel(rating: string): string {
  const labels: Record<string, string> = {
    g: "0+",
    pg: "6+",
    pg_13: "13+",
    r: "16+",
    r_plus: "18+",
    rx: "18+ (Хентай)",
  };
  return labels[rating] || rating;
}

/**
 * Форматирование даты на русский
 */
export function formatDate(dateString: string | null): string {
  if (!dateString) return "—";
  return new Date(dateString).toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Форматирование даты следующего эпизода
 */
export function formatNextEpisodeDate(dateString: string | null): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "short",
    year: "numeric",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}
