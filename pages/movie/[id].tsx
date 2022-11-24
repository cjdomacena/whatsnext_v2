import { ReviewThread } from "@lib/types/common";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import { PostgrestError } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import { Loader, ReviewContainer, ReviewForm } from "@components/common/review";
import { movieDetails } from "@lib/constants/testData";
import { Backdrop, DetailHeader, Poster } from "@components/ui/detail";
import { getReviews } from "@lib/api/getReviews";

// export const getServerSideProps = async () => {};

const MovieDetailsPage = () => {
  const supabase = createBrowserSupabaseClient();
  const user = useUser();
  const movie = movieDetails;
  const { data, status } = useQuery<ReviewThread[], PostgrestError | Error>(
    ["reviews", movie?.id],
    async () => getReviews(movie.id, supabase),
    {
      cacheTime: 5000 * 100,
      staleTime: 5000 * 100,
      refetchOnWindowFocus: false,
      enabled: !!movie,
    }
  );

  return (
    <div className="container mx-auto my-12 space-y-12 p-4">
      <Backdrop backdropPath={movie.backdrop_path} />
      <div
        className="2xl:h-[600px] xl:h-[600px] lg:h-[600px] min-h-[500px] w-full  rounded-lg 
         relative flex 
         justify-center gap-12 flex-wrap-reverse items-center
        "
      >
        <DetailHeader tagline={movie.tagline} title={movie.title} />
        <Poster posterPath={movie.poster_path} />
      </div>
      <div className="ratings-container gap-12  grid grid-cols-8 ">
        <div className="w-full h-[250px] border 2xl:col-span-3 xl:col-span-3 lg:col-span-3 col-span-8"></div>
        <div className="w-full 2xl:col-span-5 xl:col-span-5 lg:col-span-5 col-span-8">
          {user ? (
            <ReviewForm user={user} movie_id={movie.id} status={status} />
          ) : (
            <div className="p-4 bg-neutral-900">
              Log In to create write a review
            </div>
          )}

          {/* Comments */}
          {status === "success" ? (
            <ReviewContainer reviews={data} />
          ) : status === "loading" ? (
            <Loader />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
