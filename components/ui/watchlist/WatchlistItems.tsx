import { IWatchlist } from "@lib/types/supabase/database";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Poster from "./Poster";

const WatchlistItems = ({
  username,
  watchlists,
}: {
  username: string;
  watchlists: IWatchlist[];
}) => {
  const supabase = useSupabaseClient();
  const queryClient = useQueryClient();
  const user = useUser();
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
    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] h-auto gap-4 my-4 flex-grow">
      {watchlists?.map((title: IWatchlist) => (
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
  );
};

export default WatchlistItems;
