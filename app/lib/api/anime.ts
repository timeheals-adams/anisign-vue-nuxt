// API для работы с аниме

// Используем /api/ роут для проксирования запросов на сервере
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
  related_anime_texts?: string[];
  character_ids: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AnimeListResponse {
  total_count: number;
  anime_list: Anime[];
}

// Типы для фильтров
export type AnimeKind = "cm" | "movie" | "ona" | "ova" | "pv" | "special" | "tv" | "tv_special";
export type AnimeStatus = "anons" | "ongoing" | "released"; 
export type AnimeRating = "g" | "none" | "pg" | "pg_13" | "r" | "r_plus";
export type SortOrder = "asc" | "desc";
export type SortBy = "score" | "aired_on" | "russian";

export interface AnimeFilters {
  genre_id?: string[];
  kind?: AnimeKind;
  rating?: AnimeRating;
  status?: AnimeStatus;
  start_year?: number;
  end_year?: number;
  page?: number;
  limit?: number;
  sort_by?: SortBy;
  sort_order?: SortOrder;
  filter_by_score?: boolean;
  filter_by_date?: boolean;
  filter_by_name?: boolean;
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
 * Получение списка типов аниме (kinds)
 */
export async function fetchAnimeKinds(): Promise<AnimeKind[]> {
  const response = await fetch(
    `${API_BASE}/anime/kinds`,
    {
      headers: {
        accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch anime kinds: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Получение списка статусов аниме
 */
export async function fetchAnimeStatuses(): Promise<AnimeStatus[]> {
  const response = await fetch(
    `${API_BASE}/anime/statuses`,
    {
      headers: {
        accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch anime statuses: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Получение списка возрастных рейтингов
 */
export async function fetchAnimeRatings(): Promise<AnimeRating[]> {
  const response = await fetch(
    `${API_BASE}/anime/ratings`,
    {
      headers: {
        accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch anime ratings: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Получение отфильтрованного списка аниме
 */
export async function fetchAnimeListFiltered(
  filters: AnimeFilters
): Promise<AnimeListResponse> {
  const params = new URLSearchParams();
  
  // Добавляем genre_id как массив
  if (filters.genre_id?.length) {
    filters.genre_id.forEach(id => params.append('genre_id', id));
  }
  
  if (filters.kind) params.set('kind', filters.kind);
  if (filters.rating) params.set('rating', filters.rating);
  if (filters.status) params.set('status', filters.status);
  if (filters.start_year) params.set('start_year', String(filters.start_year));
  if (filters.end_year) params.set('end_year', String(filters.end_year));
  if (filters.page) params.set('page', String(filters.page));
  if (filters.limit) params.set('limit', String(filters.limit));
  if (filters.sort_by) params.set('sort_by', filters.sort_by);
  if (filters.sort_order) params.set('sort_order', filters.sort_order);
  if (filters.filter_by_score !== undefined) params.set('filter_by_score', String(filters.filter_by_score));
  if (filters.filter_by_date !== undefined) params.set('filter_by_date', String(filters.filter_by_date));
  if (filters.filter_by_name !== undefined) params.set('filter_by_name', String(filters.filter_by_name));

  const response = await fetch(
    `${API_BASE}/anime/get-anime-list-filtered?${params.toString()}`,
    {
      headers: {
        accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch filtered anime list: ${response.statusText}`);
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
export function getKindLabel(kind: string): string {
  const labels: Record<string, string> = {
    tv: "ТВ-Сериал",
    tv_special: "ТВ-Спешл",
    movie: "Фильм",
    ova: "OVA",
    ona: "ONA",
    special: "Спешл",
    music: "Клип",
    cm: "Реклама",
    pv: "Промо",
  };
  return labels[kind] || kind;
}

/**
 * Маппинг рейтинга на русский с описанием
 */
export function getRatingLabelFull(rating: AnimeRating): string {
  const labels: Record<AnimeRating, string> = {
    g: "G (0+) — Для всех",
    pg: "PG (6+) — Детям",
    pg_13: "PG-13 (13+) — Подросткам",
    r: "R (16+) — 16+",
    r_plus: "R+ (18+) — Взрослым",
    none: "Без рейтинга",
  };
  return labels[rating] || rating;
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
