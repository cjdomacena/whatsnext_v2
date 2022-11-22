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
