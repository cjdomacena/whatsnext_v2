import { getRecommended } from "@lib/api/getRecommended";
import { QUERY_CONFIG } from "@lib/constants/config";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { Carousel } from "../home";

const Recommended = () => {
  const router = useRouter();
  const { type, id } = router.query;

  const { data, status, error } = useQuery(
    ["recommendations", type, id],
    () => getRecommended(type as any, id as string),
    { ...QUERY_CONFIG }
  );

  if (status === "error") {
    return <div>Something went wrong..</div>;
  } else if (status === "loading") {
    return (
      <div className="w-full h-64 grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-2">
        <div className="dark:bg-neutral-800 bg-neutral-200 animate-pulse rounded" />
        <div className="dark:bg-neutral-800 bg-neutral-200 animate-pulse rounded" />
        <div className="dark:bg-neutral-800 bg-neutral-200 animate-pulse rounded" />
        <div className="dark:bg-neutral-800 bg-neutral-200 animate-pulse rounded" />
      </div>
    );
  } else {
    return (
      <div className=" space-y-4">
        <h4 className="text-lg font-bold uppercase">Recommended {type}s</h4>
        <div className="w-full h-auto ">
          {data.results.length === 0 ? (
            <p>Not Available</p>
          ) : (
            <Carousel data={data.results} media={type as any} />
          )}
        </div>
      </div>
    );
  }
};

export default Recommended;