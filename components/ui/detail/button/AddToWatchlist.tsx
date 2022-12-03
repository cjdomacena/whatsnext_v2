import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoBookmarkSharp } from "react-icons/io5";

type ButtonProps = {
  title_id: string;
  title: string;
  poster_path: string;
  media_type: "tv" | "movie";
  isActive: boolean;
};

const AddToWatchList = ({
  title_id,
  title,
  poster_path,
  media_type,
  isActive,
}: ButtonProps) => {
  const queryClient = useQueryClient();
  const supabase = useSupabaseClient();
  const user = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const [localActive, setLocalActive] = useState<boolean>(isActive);
  // username, title_id: movie_id/tv_id,  title: name/title, poster_path
  const handleClick = async () => {
    if (user) {
      const toastIdLoading = toast.loading("Loading...");
      setLoading(true);
      try {
        if (!localActive) {
          const { error } = await supabase.from("watchlists").insert({
            title_id: title_id,
            title: title,
            username: user?.user_metadata.username,
            poster_path: poster_path,
            media_type: media_type,
          });
          if (error) throw error;
        } else {
          const { error } = await supabase
            .from("watchlists")
            .delete()
            .eq("title_id", title_id)
            .eq("username", user?.user_metadata.username);
          if (error) throw error;
        }

        queryClient.invalidateQueries([
          "watchlist",
          user?.user_metadata.username,
        ]);
        toast.dismiss(toastIdLoading);
        toast.success(
          `${title} successfully ${
            localActive
              ? "removed from your watchlist"
              : "added to your watchlist"
          }`
        );
      } catch (e) {
        toast.dismiss(toastIdLoading);
        toast.error("Failed to add to watchlist");
      } finally {
        setLoading(false);
        setLocalActive((prev) => !prev);
      }
    } else {
      toast.error("Must be logged in");
    }
  };

  return (
    <div className="flex gap-2 text-xs mt-6 text-white ">
      <button
        className={`px-4 py-4  rounded-sm flex items-center gap-1 disabled:bg-blue-900 ${
          localActive
            ? "bg-amber-700 hover:bg-amber-800"
            : "bg-blue-700 hover:bg-blue-800"
        }`}
        disabled={loading}
        onClick={handleClick}
      >
        <IoBookmarkSharp />
        {localActive ? "Remove from Watchlist" : "Add to Watchlist"}
      </button>
    </div>
  );
};

export default AddToWatchList;
