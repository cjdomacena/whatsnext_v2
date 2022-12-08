import { ReviewForm, ReviewContainer } from "@components/common/review";
import Rating from "@components/common/util/Rating";
import MetaHeader from "@components/MetaHeader";
import {
  Backdrop,
  DetailHeader,
  Poster,
  CreditTabs,
  AddToWatchList,
  Recommended,
  Similar,
} from "@components/ui/detail";
import { getDetails } from "@lib/api/getDetails";
import { getWatchListItem } from "@lib/api/getWatchlist";
import { QUERY_CONFIG } from "@lib/constants/config";
import { formatDate, getCompactNumberFormat, getDuration } from "@lib/utils";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { Suspense } from "react";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id, type }: any = context.query;

  const supabase = createServerSupabaseClient(context);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const data = await getWatchListItem(
    user?.user_metadata.username,
    supabase,
    id
  );

  return {
    props: {
      isWatchlist: data ? true : false,
    },
  };
};

const DetailsPage = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
  const user = useUser();
  const router = useRouter();
  const query: any = router.query;

  const { data: details, isLoading } = useQuery(
    [query.type, query.id],
    () => getDetails(query.id as string, query.type),
    {
      ...QUERY_CONFIG,
    }
  );

  const enabled = details ? true : false;

  return (
    <div className="container mx-auto my-12 space-y-12 p-4">
      {!isLoading ? (
        <>
          <MetaHeader
            title={`WhatsNext — ${details.title}`}
            description={details.overview}
            pathname={`details/${router.query.type}/${router.query.id}`}
          />
          <Backdrop backdropPath={details.backdrop_path} />
          <div
            className="2xl:min-h-[600px] xl:min-h-[600px] lg:min-h-[600px] min-h-[500px] w-full  rounded-lg 
         relative flex flex-wrap
         gap-12  items-start justify-center
        "
          >
            <Poster posterPath={details.poster_path} />

            <div className="p-4 max-w-xl space-y-4">
              <div className="space-y-1">
                <DetailHeader tagline={details.tagline} title={details.title} />
                <ul className="flex gap-1 justify-start pb-2 dark:text-neutral-300">
                  {details.genres.length > 0
                    ? details.genres.map(
                        (
                          genre: { id: number; name: string },
                          index: number
                        ) => (
                          <li className="text-sm" key={genre.id}>
                            {genre.name}
                            {index < details.genres.length - 1 ? "," : null}
                          </li>
                        )
                      )
                    : null}
                </ul>
                <div className="flex items-start text-xs gap-1">
                  <Rating votes={details.vote_average} />{" "}
                  {getCompactNumberFormat(Number(details.vote_count ?? 0)) +
                    " Reviews"}
                </div>
                <div className="text-sm flex items-center gap-2 ">
                  <p>
                    {details.release_date
                      ? formatDate(details.release_date, {
                          year: "numeric",
                        })
                      : details.first_air_date
                      ? formatDate(details.first_air_date, {
                          year: "numeric",
                        })
                      : "NA"}
                  </p>
                  <p>{details.runtime ? <>&#183;</> : null}</p>
                  <p>{details.runtime ? getDuration(details.runtime) : null}</p>
                </div>
              </div>
              <p className="dark:text-neutral-300 leading-relaxed">
                {details.overview}
              </p>
              <Suspense>
                <AddToWatchList
                  title={details.title}
                  title_id={details.id}
                  poster_path={details.poster_path}
                  media_type={query.type}
                  isActive={props.isWatchlist}
                />
              </Suspense>
            </div>
          </div>

          <div className="ratings-container gap-12  grid grid-cols-8">
            <div className="w-full h-auto    2xl:col-span-2 xl:col-span-2 lg:col-span-2 col-span-8 2xl:order-1 xl:order-1 lg:order-1 order-2 ">
              <CreditTabs
                cast={details.credits.cast}
                crew={details.credits.crew}
              />
            </div>
            <div className="w-full 2xl:col-span-6 xl:col-span-6 lg:col-span-6 col-span-8 2xl:order-2 xl:order-2 lg:order-2 order-1">
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
        </>
      ) : null}
      <div className="p-4 w-full">
        <Similar enable={enabled} />
      </div>
      <div className="p-4 w-full">
        <Recommended enable={enabled} />
      </div>
    </div>
  );
};

export default DetailsPage;
