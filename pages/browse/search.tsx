import { Search } from "@components/common/input";
import SelectRadix from "@components/common/input/Select";
import MetaHeader from "@components/MetaHeader";
import GridCell from "@components/ui/browse/GridCell";
import GridCellLoader from "@components/ui/browse/GridCellLoader";
import GridContainer from "@components/ui/browse/GridContainer";
import TitleHeader from "@components/ui/browse/TitleHeader";
import { getSearchResult } from "@lib/api/getSearchResult";
import { QUERY_CONFIG } from "@lib/constants/config";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SearchPage = () => {
  const router = useRouter();
  const [isAdult, setIsAdult] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>("multi");
  const [query, setQuery] = useState<string>("");
  const [enabled, setEnabled] = useState<boolean>(false);

  const { data, isFetching, refetch, hasNextPage, fetchNextPage } =
    useInfiniteQuery(
      [query, isAdult, filter],
      ({ pageParam = 1 }) =>
        getSearchResult(filter, query, isAdult, pageParam.page),
      {
        enabled: enabled,
        getNextPageParam: (lastPage) => {
          const totalPages = lastPage.total_pages ?? 1;
          const nextPage = lastPage.page + 1;
          return nextPage > totalPages ? undefined : nextPage;
        },
        keepPreviousData: true,
        ...QUERY_CONFIG,
      }
    );

  useEffect(() => {
    if (router.isReady) {
      if (router.query.query) {
        setQuery(router.query.query as string);
        setEnabled(true);
      } else {
        setQuery("");
      }
      if (router.query.type) {
        setFilter(router.query.type as string);
        setEnabled(true);
      }
    }
  }, [router]);

  return (
    <div className="container mx-auto my-12 min-h-[80vh] p-4">
      <MetaHeader title={"Whatsnext — Search"} />
      <div className="flex items-center flex-wrap">
        <TitleHeader name={"Search"} media={""} />
        <div className=" flex-grow w-full flex gap-2 my-4">
          <div className="flex-grow">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                refetch();
              }}
            >
              <Search
                onChange={(e) => {
                  if (enabled) {
                    setEnabled(false);
                  }
                  setQuery(e.currentTarget.value);
                }}
              />
              <div className="flex items-center justify-between">
                <div className="text-xs">
                  <h4>
                    Total Results:{" "}
                    {data?.pages && data.pages[0].results.length > 0
                      ? data.pages.at(-1).total_results > 20
                        ? data.pages.length * 20
                        : data.pages.at(-1).total_results
                      : null}
                    {data?.pages ? ` of ${data?.pages[0].total_results}` : null}
                  </h4>
                </div>

                <div className="flex items-center gap-2  py-1 rounded w-fit">
                  <div className=" flex items-center gap-1">
                    <button
                      type="button"
                      className="text-sm px-2 py-1 dark:bg-neutral-800 my-2 rounded dark:text-neutral-300 flex items-center gap-1 whitespace-nowrap bg-neutral-200 dark:hover:bg-neutral-700 hover:bg-neutral-300"
                      onClick={() => {
                        setIsAdult((prev) => !prev);
                        if (query.length > 2) {
                          setEnabled(true);
                        }
                      }}
                    >
                      <p className="">
                        nswf:{" "}
                        <span
                          className={
                            isAdult ? "text-green-500" : "text-red-500"
                          }
                        >
                          {isAdult ? "on" : "off"}
                        </span>
                      </p>
                    </button>
                  </div>
                  <div className="relative z-50">
                    <SelectRadix
                      setter={setFilter}
                      value={filter}
                      isLoading={isFetching}
                      setEnabled={setEnabled}
                      query={query}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div>
        <GridContainer>
          {isFetching
            ? new Array(6)
                .fill(0)
                .map((_, index) => <GridCellLoader key={`loader-${index}`} />)
            : data && data.pages.length > 0
            ? data.pages.map((page) =>
                page.results.map((res: any) => (
                  <GridCell
                    key={res.id}
                    poster_path={
                      res.media_type === "person" ? null : res.poster_path
                    }
                    title={res.title}
                    ratings={res.media_type === "person" ? 0 : res.vote_average}
                    media={res.media_type ?? filter}
                    id={res.id}
                    withMedia={true}
                  />
                ))
              )
            : null}
        </GridContainer>
        <div className="grid place-items-center my-12">
          {data && data.pages[0].results.length > 0 ? (
            <button
              disabled={isFetching || !hasNextPage}
              className="px-3 py-2 dark:bg-neutral-800 rounded bg-neutral-100 text-xs"
              onClick={() => fetchNextPage()}
            >
              {hasNextPage ? "Load More" : "End"}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
