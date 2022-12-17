import MetaHeader from "@components/MetaHeader";
import { UserProfile, WatchlistItems } from "@components/ui/watchlist";
import { getProfile } from "@lib/api/getProfile";
import { getWatchList } from "@lib/api/getWatchlist";
import { QUERY_CONFIG } from "@lib/constants/config";
import { IProfile } from "@lib/types/supabase/database";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";

import { useRouter } from "next/router";

const WatchList = () => {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const user = useUser();
  const { username } = router.query;

  const { data: userProfile, error } = useQuery<IProfile>(
    ["profile", username],
    () => getProfile(username as string, supabase),
    { enabled: (router.isReady && !!username) || !!user, ...QUERY_CONFIG }
  );

  const { data: watchLists } = useQuery(
    ["watchlist", username as string],
    () => getWatchList(username as string, supabase),
    {
      enabled: !!userProfile,
      ...QUERY_CONFIG,
    }
  );

  if (error) {
    return <div>Something went wrong...</div>;
  }

  return (
    <section className="my-12 container mx-auto p-4 flex gap-8 flex-wrap min-h-[80vh]">
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
            watchLists ? (
              <WatchlistItems
                username={userProfile.username}
                watchlists={watchLists}
              />
            ) : null
          ) : (
            <>
              {userProfile.is_private
                ? `${username}'s profile is private`
                : "User not found"}
            </>
          )}
        </>
      ) : null}
    </section>
  );
};

export default WatchList;
