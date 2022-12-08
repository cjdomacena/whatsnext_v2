import GridContainer from "@components/ui/browse/GridContainer";
import TitleHeader from "@components/ui/browse/TitleHeader";
import { MOVIE_GENRES, TV_GENRES } from "@lib/constants/genres";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

const excludedFilter = ["popular", "upcoming", "trending", "top-rated"];

const Browse = () => {
  const router = useRouter();
  const [title, setTitle] = useState<{
    id: number;
    name: string | null;
  } | null>(null);
  const getGenre = useCallback(
    (genre_id: number) => {
      let list = router.query.media === "tv" ? TV_GENRES : MOVIE_GENRES;
      const res = list.filter(({ id, name }) => id === genre_id);
      return res[0] ?? { id: -1, name: null };
    },
    [router.query.media]
  );

  useEffect(() => {
    if (router && router.isReady) {
      const filter = router.query.filter;
      if (excludedFilter.includes(filter as string)) {
        const formattedFilter = filter?.toString().split("-").join(" ") ?? "";
        setTitle({
          id: -1,
          name: formattedFilter,
        });
      } else {
        setTitle(getGenre(Number(filter)));
      }
    }
  }, [getGenre, router]);

  return (
    <div className="container mx-auto my-12 min-h-[80vh] p-4">
      <TitleHeader
        name={title ? title.name : null}
        media={router.query.media as string}
      />

      <GridContainer>
        {/* {new Array(6).fill(0).map((item, index) => (
          <GridCell poster_path="" title="" ratings={0} key={index} />
        ))} */}
      </GridContainer>
    </div>
  );
};

export default Browse;
