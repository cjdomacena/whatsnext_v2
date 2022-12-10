import GridCell from "@components/ui/browse/GridCell";
import GridCellLoader from "@components/ui/browse/GridCellLoader";
import GridContainer from "@components/ui/browse/GridContainer";
import TitleHeader from "@components/ui/browse/TitleHeader";
import { getPopular } from "@lib/api/getPopular";
import { getTopRated } from "@lib/api/getTopRated";
import { getUpcoming } from "@lib/api/getUpcoming";
import { QUERY_CONFIG } from "@lib/constants/config";
import { QueryResult } from "@lib/types/common";
import { IMovie } from "@lib/types/movies";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const TopRated = () => {
  const router = useRouter();
  // So it resets every mount.
  const page = 1;

  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetching } =
    useInfiniteQuery<QueryResult<IMovie>>(
      ["top-rated", router.query.media],
      ({ pageParam = page }) =>
        getTopRated(router.query.media as string, pageParam),
      {
        enabled: !!router.isReady,
        getNextPageParam: (lastPage) => {
          const totalPages = lastPage.total_pages ?? 1;
          const nextPage = lastPage.page + 1;
          return nextPage > totalPages ? undefined : nextPage;
        },
        ...QUERY_CONFIG,
      }
    );

  if (isError) {
    return <div>Something Went wrong...</div>;
  }

  return (
    <div className="container mx-auto my-12 min-h-[80vh] p-4">
      <div className="flex items-center justify-between">
        <TitleHeader name={"Top Rated"} media={router.query.media as string} />
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

export default TopRated;
