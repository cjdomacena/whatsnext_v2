export interface QueryResult<T> {
  page: number;
  results: T[];
  total_pages?: number;
  total_results?: number;
}

export interface Review {
  user_id: string | undefined;
  review: string;
  rating: number;
  movie_id: number;
}

export interface ReviewThread {
  id: number;
  user_id: string;
  movie_id: number | string;
  review: string;
  profiles: { full_name: string; is_subscribed: boolean };
  rating: number;
  created_at: string;
  is_featured: boolean;
}

export interface BelongsToCollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: null | string;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface Cast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: null | string;
  cast_id?: number;
  character?: string;
  credit_id: string;
  order?: number;
  department?: string;
  job?: string;
}
