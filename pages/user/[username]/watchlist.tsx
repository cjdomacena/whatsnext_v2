import MetaHeader from "@components/MetaHeader";
import { UserProfile, WatchlistItems } from "@components/ui/watchlist";
import { getProfile } from "@lib/api/getProfile";
import { getWatchList } from "@lib/api/getWatchlist";
import { QUERY_CONFIG } from "@lib/constants/config";
import { IProfile } from "@lib/types/supabase/database";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { Suspense } from "react";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const supabase = createServerSupabaseClient(ctx);
  const queryClient = new QueryClient();
  const { username } = ctx.query;

  queryClient.prefetchQuery({
    queryKey: ["watchlist", username],
    queryFn: () => getWatchList(username as string, supabase),
  });
  ctx.res.setHeader(
    "Cache-Control",
    "public, s-maxage=120, stale-while-revalidate=360"
  );
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
  const { username } = router.query;

  const { data: userProfile, error } = useQuery<IProfile>(
    ["profile", username],
    () => getProfile(username as string, supabase),
    { enabled: !!username || !!user, ...QUERY_CONFIG }
  );

  if (error) {
    return <div>Something went wrong...</div>;
  }

  return (
    <section className="my-12 container mx-auto p-4 flex gap-8 flex-wrap min-h-[80vh]">
      <Suspense>
        <MetaHeader
          title={`Whatsnext — ${username}'s Watchlist`}
          description={`${username}'s watchlist`}
          pathname={`user/${username}/watchlist`}
        />
        {userProfile ? (
          <>
            <UserProfile
              userProfile={userProfile}
              withShareUrl={user ? userProfile.id === user.id : false}
            />

            {!userProfile.is_private ||
            user?.user_metadata.username === username ? (
              <WatchlistItems username={userProfile.username} />
            ) : (
              <>
                {userProfile.is_private
                  ? `${username}'s profile is private`
                  : "User not found"}
              </>
            )}
          </>
        ) : null}
      </Suspense>
    </section>
  );
};

export default WatchList;
