import { getWatchList } from "@lib/api/getWatchlist";
import { QUERY_CONFIG } from "@lib/constants/config";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Suspense } from "react";
import toast from "react-hot-toast";
import Poster from "./Poster";

const WatchlistItems = ({ username }: { username: string }) => {
  const supabase = useSupabaseClient();
  const queryClient = useQueryClient();
  const user = useUser();
  const { data, error } = useQuery(
    ["watchlist", username as string],
    () => getWatchList(username as string, supabase),
    {
      enabled: !!username,
      ...QUERY_CONFIG,
    }
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
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] h-auto gap-4 my-4 flex-grow">
        {data?.map((title) => (
          <Poster
            key={title.id}
            poster_path={title.poster_path}
            title={title.title}
            title_id={title.title_id}
            media_type={title.media_type}
            handler={async () => await handleRemove(title.id)}
            isDisabled={user?.user_metadata.username !== username}
            created_at={title.created_at.toString()}
          />
        ))}
      </div>
    </Suspense>
  );
};

export default WatchlistItems;
