import Poster from "@components/ui/watchlist/Poster";
import { getWatchList } from "@lib/api/getWatchlist";
import { QUERY_CONFIG } from "@lib/constants/config";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import {
  dehydrate,
  QueryClient,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { Suspense } from "react";
import toast from "react-hot-toast";

const getServerSideProps: GetServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx);
  const queryClient = new QueryClient();
  const { username } = ctx.query;

  queryClient.prefetchQuery({
    queryKey: ["watchlist", username],
    queryFn: () => getWatchList(username as string, supabase),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const WatchList = () => {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const user = useUser();
  const queryClient = useQueryClient();
  const { username } = router.query;
  const { data, error } = useQuery(
    ["watchlist", username as string],
    () => getWatchList(username as string, supabase),
    {
      enabled: !!username,
      ...QUERY_CONFIG,
    }
  );
  const {
    data: userProfile,
    error: selectError,
    status,
  } = useQuery(
    ["watchlist-user", username],
    async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("username", username)
        .single();
      if (error) {
        if (error.code === "PGRST116") {
          return null;
        }
        throw error;
      }
      return data;
    },
    { enabled: !!username || !!user, ...QUERY_CONFIG }
  );

  const handleRemove = async (id: string | number) => {
    const toastLoadingId = toast.loading("Loading...");
    try {
      const { error } = await supabase.from("watchlists").delete().eq("id", id);
      if (error) {
        throw error;
      }
      toast.dismiss(toastLoadingId);
      toast.success("Successfully removed.");
      queryClient.invalidateQueries(["watchlist", username]);
    } catch (e: any) {
      console.log(e.message || e);
      toast.error("Failed to remove from watchlist");
    }
  };

  if (error) {
    return <div>Something went wrong...</div>;
  }

  return (
    <section className="my-12 container mx-auto p-4">
      <h4>@{username}&apos;s Watchlist</h4>
      {status === "success" ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(185px,1fr))] h-auto gap-4 my-4">
          {userProfile ? (
            <Suspense fallback={<p>Loading...</p>}>
              {data?.map((title) => (
                <Poster
                  key={title.id}
                  poster_path={title.poster_path}
                  title={title.title}
                  title_id={title.title_id}
                  media_type={title.media_type}
                  handler={async () => await handleRemove(title.id)}
                />
              ))}
            </Suspense>
          ) : (
            <>User not found</>
          )}
        </div>
      ) : null}
    </section>
  );
};

export default WatchList;
