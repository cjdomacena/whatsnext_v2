import MetaHeader from "@components/MetaHeader";
import GridCell from "@components/ui/browse/GridCell";
import GridCellLoader from "@components/ui/browse/GridCellLoader";
import GridContainer from "@components/ui/browse/GridContainer";
import TitleHeader from "@components/ui/browse/TitleHeader";
import { getTrending } from "@lib/api/getTrending";
import { QUERY_CONFIG } from "@lib/constants/config";
import { QueryResult } from "@lib/types/common.type";
import { IMovie } from "@lib/types/movies.type";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const Trending = () => {
  const [window, setWindow] = useState<"day" | "week">("week");
  const router = useRouter();
  // So it resets every mount.
  const page = 1;

  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetching } =
    useInfiniteQuery<QueryResult<IMovie>>(
      ["trending-browse", router.query.media, window],
      ({ pageParam = page }) =>
        getTrending(router.query.media as string, window, pageParam),
      {
        enabled: !!router.isReady,
        getNextPageParam: (lastPage) => {
          const totalPages = lastPage.total_pages ?? 1;
          const nextPage = lastPage.page + 1;
          return nextPage > totalPages ? undefined : nextPage;
        },
        keepPreviousData: true,
        ...QUERY_CONFIG,
      }
    );

  if (isError) {
    return <div>Something Went wrong...</div>;
  }

  return (
    <div className="container mx-auto my-12 min-h-[80vh] p-4">
      <MetaHeader title={"Whatsnext — Trending"} />
      <div className="flex items-center justify-between flex-wrap">
        <TitleHeader name={"Trending"} media={router.query.media as string} />
        <div className="text-sm flex dark:bg-neutral-800 bg-neutral-200 rounded">
          <button
            className={`px-2 py-1 ${
              window === "day" ? "dark:bg-neutral-600 bg-neutral-300" : ""
            } rounded transition-colors`}
            onClick={() => setWindow("day")}
            disabled={window === "day" ? true : false || isFetching}
          >
            Day
          </button>
          <button
            className={`px-2 py-1 ${
              window === "week" ? "dark:bg-neutral-600 bg-neutral-200" : ""
            } rounded transition-colors`}
            onClick={() => setWindow("week")}
            disabled={window === "week" ? true : false || isFetching}
          >
            Week
          </button>
        </div>
      </div>
      <GridContainer>
        {isLoading || isFetching
          ? new Array(10)
              .fill(0)
              .map((_, index) => <GridCellLoader key={"loader-" + index} />)
          : data?.pages.map((page) =>
              page.results.map((result) => (
                <GridCell
                  poster_path={result.poster_path}
                  title={result.title}
                  ratings={result.vote_average}
                  id={result.id}
                  media={router.query.media as string}
                  key={result.id}
                />
              ))
            )}
      </GridContainer>
      <div className="w-full grid place-items-center mt-24 text-sm">
        <button
          className="px-3 py-2 dark:bg-neutral-800 rounded bg-neutral-100"
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetching}
        >
          {!hasNextPage ? "End" : isFetching ? "Loading..." : " Show More"}
        </button>
      </div>
    </div>
  );
};

export default Trending;
