import Avatar from "@components/common/avatar";
import { useUser } from "@supabase/auth-helpers-react";
import ClipboardButton from "./ClipboardButton";

type UserProfileProps = {
  userProfile: {
    full_name: string;
    is_subscribed: boolean;
    username: string;
    id: string;
  };
  withShareUrl?: boolean;
};

const UserProfile = ({
  userProfile,
  withShareUrl = true,
}: UserProfileProps) => {
  const user = useUser();
  return (
    <div className="space-y-2 2xl:w-52 xl:w-52 lg:w-52 w-full">
      <div className="flex gap-2 p-2 ">
        <div className="space-y-2">
          <Avatar name={userProfile.full_name} />
          <div>
            <h4 className="text-2xl font-bold">{userProfile.full_name}</h4>
            <p className="dark:text-neutral-500 text-sm">
              @{userProfile.username}
            </p>
          </div>
          <p className="text-xs capitalize text-amber-500  rounded w-fit">
            {userProfile && userProfile.is_subscribed ? "Critic" : "Member"}
          </p>
          {withShareUrl ? (
            <ClipboardButton username={userProfile.username} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
