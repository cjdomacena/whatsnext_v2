import GridCell from "@components/ui/browse/GridCell";
import GridCellLoader from "@components/ui/browse/GridCellLoader";
import GridContainer from "@components/ui/browse/GridContainer";
import TitleHeader from "@components/ui/browse/TitleHeader";
import { getGenreList } from "@lib/api/getGenreList";
import { QUERY_CONFIG } from "@lib/constants/config";
import { MOVIE_GENRES, TV_GENRES } from "@lib/constants/genres";
import { QueryResult } from "@lib/types/common";
import { IMovie } from "@lib/types/movies";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

const Genre = () => {
  const router = useRouter();
  const [title, setTitle] = useState<{
    id: number;
    name: string | null;
  } | null>(null);
  // So it resets every mount.
  const page = 1;
  const getGenre = useCallback(
    (genre_id: number) => {
      let list = router.query.media === "tv" ? TV_GENRES : MOVIE_GENRES;
      const res = list.filter(({ id, name }) => id === genre_id);
      return res[0] ?? { id: -1, name: null };
    },
    [router.query.media]
  );

  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetching } =
    useInfiniteQuery<QueryResult<IMovie>>(
      ["genres", router.query.media, router.query.id],
      ({ pageParam = page }) =>
        getGenreList(
          router.query.media as string,
          router.query.id as string,
          pageParam
        ),
      {
        enabled: !!router.isReady,
        getNextPageParam: (lastPage) => {
          const totalPages = lastPage.total_pages ?? 1;
          const nextPage = lastPage.page + 1;
          return nextPage > totalPages ? totalPages : nextPage;
        },
        ...QUERY_CONFIG,
      }
    );

  useEffect(() => {
    if (router && router.isReady) {
      const filter = router.query.id;
      setTitle(getGenre(Number(filter)));
    }
  }, [getGenre, router]);

  return (
    <div className="container mx-auto my-12 min-h-[80vh] p-4">
      <div className="flex items-center justify-between">
        {router.isReady ? (
          <TitleHeader
            name={title ? title.name : null}
            media={router.query.media as string}
          />
        ) : null}
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

export default Genre;
