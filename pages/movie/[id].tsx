import { useUser } from "@supabase/auth-helpers-react";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { ReviewContainer, ReviewForm } from "@components/common/review";
import { Backdrop, DetailHeader, Poster } from "@components/ui/detail";
import { GetServerSideProps } from "next";
import { getMovie } from "@lib/api/getMovie";
import { useRouter } from "next/router";
import { QUERY_CONFIG } from "@lib/constants/config";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Suspense } from "react";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const supabase = createServerSupabaseClient(context);
  const queryClient = new QueryClient();
  if (id) {
    await queryClient.prefetchQuery({
      queryKey: ["movie", id],
      queryFn: () => getMovie(id as string),
    });
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const MovieDetailsPage = () => {
  const user = useUser();
  const router = useRouter();
  const query = router.query;
  const { data: movie } = useQuery(
    ["movie", query.id],
    () => getMovie(query.id as string),
    {
      ...QUERY_CONFIG,
    }
  );

  return movie ? (
    <div className="container mx-auto my-12 space-y-12 p-4">
      <Suspense>
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
      </Suspense>
      <div className="ratings-container gap-12  grid grid-cols-8 ">
        <div className="w-full h-[250px] border 2xl:col-span-3 xl:col-span-3 lg:col-span-3 col-span-8"></div>
        <div className="w-full 2xl:col-span-5 xl:col-span-5 lg:col-span-5 col-span-8">
          {user ? (
            <ReviewForm user={user} movie_id={query.id as string} />
          ) : (
            <div className="p-4 dark:bg-neutral-800 bg-neutral-100 rounded">
              Log In to create write a review
            </div>
          )}

          <ReviewContainer movie_id={query.id as string} />
        </div>
      </div>
    </div>
  ) : null;
};

export default MovieDetailsPage;
