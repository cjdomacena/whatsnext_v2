export interface IProfile {
  id: string;
  full_name: string;
  username: string;
  stripe_id: string;
  is_subscribed: boolean;
  is_private: boolean;
}

export interface IWatchlist {
  id: number;
  username: string;
  created_at: string;
  title_id: number;
  title: string;
  poster_path: string;
  media_type: "tv" | "movie";
}

export interface IReview {
  id: number;
  user_id: string;
  movie_id: number;
  review: string;
  rating: number;
  created_at: string;
  is_featured: boolean;
  profiles: { full_name: string; is_subscribed: boolean };
}
