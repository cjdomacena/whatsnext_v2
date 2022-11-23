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
  profiles: { full_name: string; is_verified: boolean };
  rating: number;
  created_at: string;
  is_featured: boolean;
}
