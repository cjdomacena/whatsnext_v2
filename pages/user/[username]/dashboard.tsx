import Comment from "@components/common/util/Comment";
import MetaHeader from "@components/MetaHeader";
import { UserProfile } from "@components/ui/watchlist";
import { getProfile } from "@lib/api/getProfile";
import { QUERY_CONFIG } from "@lib/constants/config";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-hot-toast";

const Dashboard: React.FC = () => {
  const router = useRouter();
  const { username } = router.query;
  const supabase = useSupabaseClient();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState<boolean>(false);
  const { data: userProfile, isLoading } = useQuery(
    ["profile", username],
    () => getProfile(username as string, supabase),
    {
      enabled: username ? true : false,

      ...QUERY_CONFIG,
    }
  );

  const { data: comments, isLoading: loadingComments } = useQuery(
    ["activity", username],
    async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("user_id", userProfile.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    { enabled: userProfile ? true : false, ...QUERY_CONFIG }
  );

  const handleDelete = async (review_id: string | number) => {
    const loadingId = toast.loading("Loading...");
    setLoading(true);
    try {
      const { error } = await supabase
        .from("reviews")
        .delete()
        .eq("id", review_id);
      if (error) throw error;
      toast.dismiss(loadingId);
      toast.success("Successfully deleted");
      await queryClient.invalidateQueries({
        queryKey: ["activity", username],
      });
    } catch (err: any) {
      toast.dismiss(loadingId);
      toast.error("error");
    }
    setLoading(false);
  };

  return (
    <section className="my-12 container mx-auto p-4 flex gap-8 flex-wrap min-h-[80vh]">
      <MetaHeader title={`Whatsnext — Dashboard`} />
      {userProfile && !isLoading ? (
        <UserProfile userProfile={userProfile} withShareUrl={false} />
      ) : null}
      <div className="flex-grow">
        <p>Recent Activity</p>
        <div className="my-4 space-y-4">
          {loadingComments ? (
            <div className="p-12 dark:bg-neutral-800 bg-neutral-100 rounded w-full space-y-2 relative animate-pulse"></div>
          ) : null}
          {comments && comments.length > 0
            ? comments.map((comment) => (
                <Comment
                  key={comment.id}
                  movie_title={comment.movie_title}
                  handleDelete={() => handleDelete(comment.id)}
                  rating={comment.rating}
                  review={comment.review}
                  loading={loading}
                  type={comment.type}
                  movie_id={comment.movie_id}
                  created_at={comment.created_at}
                />
              ))
            : null}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
