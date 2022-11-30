import { ReviewForm, ReviewContainer } from "@components/common/review";
import { Backdrop, DetailHeader, Poster } from "@components/ui/detail";
import { getDetails } from "@lib/api/getDetails";
import { QUERY_CONFIG } from "@lib/constants/config";
import { useUser } from "@supabase/auth-helpers-react";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { Suspense } from "react";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id, type }: any = context.query;
  const queryClient = new QueryClient();
  if (id && type) {
    await queryClient.prefetchQuery({
      queryKey: [type, id],
      queryFn: () => getDetails(id as string, type),
    });
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const DetailsPage = () => {
  const user = useUser();
  const router = useRouter();
  const query: any = router.query;

  const { data: details } = useQuery(
    [query.type, query.id],
    () => getDetails(query.id as string, query.type),
    {
      enabled: !!router.isReady,
      ...QUERY_CONFIG,
    }
  );

  return (
    <div className="container mx-auto my-12 space-y-12 p-4">
      <Suspense>
        <Backdrop backdropPath={details.backdrop_path} />
        <div
          className="2xl:h-[600px] xl:h-[600px] lg:h-[600px] min-h-[500px] w-full  rounded-lg 
         relative flex 
         justify-center gap-12 flex-wrap-reverse items-center
        "
        >
          <DetailHeader tagline={details.tagline} title={details.title} />
          <Poster posterPath={details.poster_path} />
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
  );
};

export default DetailsPage;
