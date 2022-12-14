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
import WatchProviders from "@components/ui/detail/WatchProviders";
import { getDetails } from "@lib/api/getDetails";
import { getWatchListItem } from "@lib/api/getWatchlist";
import { QUERY_CONFIG } from "@lib/constants/config";
import { formatDate, getCompactNumberFormat, getDuration } from "@lib/utils";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoConstructOutline } from "react-icons/io5";

const DetailsPage = () => {
  const user = useUser();
  const router = useRouter();
  const query: any = router.query;
  const supabase = useSupabaseClient();
  const [isWatchlist, setIsWatchlist] = useState<boolean>(false);
  const {
    data: details,
    isLoading,
    refetch,
  } = useQuery(
    [query.type, query.id],
    () => getDetails(query.id as string, query.type),
    {
      enabled: false,
      ...QUERY_CONFIG,
    }
  );

  const enabled = details ? true : false;
  useEffect(() => {
    if (router.isReady) {
      refetch();
    }
  }, [router, refetch]);
  useEffect(() => {
    async function isWatchList() {
      const data = await getWatchListItem(
        user?.user_metadata.username,
        supabase,
        router.query.id as string
      );
      if (data) {
        setIsWatchlist(true);
      }
    }
    if (user && router.query.id) isWatchList();
  }, [router.query.id, supabase, user]);

  if (query.type !== "person") {
    return details && !isLoading ? (
      <div className="container mx-auto my-12 space-y-12 p-4">
        <MetaHeader
          title={`WhatsNext — ${details.title ?? ""}`}
          description={details.overview}
          pathname={`details/${router.query.type}/${router.query.id}`}
        />
        <Backdrop backdropPath={details.backdrop_path} />
        <div
          className="2xl:min-h-[600px] xl:min-h-[600px] lg:min-h-[600px] min-h-[500px] w-full  rounded-lg 
         relative flex flex-wrap
         gap-12  items-start justify-center"
        >
          <Poster posterPath={details.poster_path} />

          <div className="p-4 max-w-xl space-y-4">
            <div className="space-y-1">
              <DetailHeader tagline={details.tagline} title={details.title} />
              <ul className="flex gap-1 justify-start pb-2 dark:text-neutral-300">
                {details.genres && details.genres.length > 0
                  ? details.genres.map(
                      (genre: { id: number; name: string }, index: number) => (
                        <Link
                          href={`/browse/${router.query.type}/genre/${genre.id}`}
                          key={genre.id}
                        >
                          <li className="text-sm hover:underline">
                            {genre.name}
                            {index < details.genres.length - 1 ? "," : null}
                          </li>
                        </Link>
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
                <p>{details.runtime ? <span>&#183;</span> : null}</p>
                <p>{details.runtime ? getDuration(details.runtime) : null}</p>
              </div>
            </div>
            <p className="dark:text-neutral-300 leading-relaxed">
              {details.overview}
            </p>

            <AddToWatchList
              title={details.title}
              title_id={details.id}
              poster_path={details.poster_path}
              media_type={query.type}
              isActive={isWatchlist}
            />
            {details["watch/providers"] &&
            details["watch/providers"].results ? (
              <WatchProviders
                watchProviders={details["watch/providers"].results}
              />
            ) : null}
          </div>
        </div>

        <div className="ratings-container gap-12  grid grid-cols-8">
          <div className="w-full h-auto    2xl:col-span-2 xl:col-span-2 lg:col-span-2 col-span-8 2xl:order-1 xl:order-1 lg:order-1 order-2 ">
            {details.credits ? (
              <CreditTabs
                cast={details.credits.cast}
                crew={details.credits.crew}
              />
            ) : null}
          </div>
          <div className="w-full 2xl:col-span-6 xl:col-span-6 lg:col-span-6 col-span-8 2xl:order-2 xl:order-2 lg:order-2 order-1">
            {user ? (
              <ReviewForm
                user={user}
                movie_id={query.id as string}
                movie_title={details.title}
                media_type={query.type as string}
              />
            ) : (
              <div className="p-4 dark:bg-neutral-800 bg-neutral-100 rounded">
                Log In to create write a review
              </div>
            )}

            <ReviewContainer movie_id={query.id as string} />
          </div>
        </div>

        <div className="p-4 w-full">
          <Similar enable={enabled} />
        </div>
        <div className="p-4 w-full">
          <Recommended enable={enabled} />
        </div>
      </div>
    ) : (
      <div className="container mx-auto my-12 space-y-12 p-4">
        <div
          className="2xl:min-h-[600px] xl:min-h-[600px] lg:min-h-[600px] min-h-[500px] w-full  rounded-lg 
         dark:bg-neutral-800 animate-pulse bg-neutral-100"
        ></div>
        <div className="ratings-container gap-12  grid grid-cols-8 h-[500px]">
          <div className="w-full h-auto 2xl:col-span-2 xl:col-span-2 lg:col-span-2 col-span-8 2xl:order-1 xl:order-1 lg:order-1 order-2 dark:bg-neutral-800 animate-pulse bg-neutral-100"></div>
          <div className="w-full 2xl:col-span-6 xl:col-span-6 lg:col-span-6 col-span-8 2xl:order-2 xl:order-2 lg:order-2 order-1"></div>
        </div>
      </div>
    );
  }
  return (
    <div className="container mx-auto my-12 min-h-[80vh] grid place-items-center">
      <p className="text-4xl">
        <IoConstructOutline />
        Page Under Construction...
      </p>
    </div>
  );
};

export default DetailsPage;
