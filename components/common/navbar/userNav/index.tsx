import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { User } from "@supabase/supabase-js";

const UserNav = ({ user }: { user: User }) => {
  const supabase = useSupabaseClient();

  return (
    <div className="flex gap-2">
      <button>
        <h4>{user.user_metadata.full_name}</h4>
      </button>
      <button className="text-xs" onClick={() => supabase.auth.signOut()}>
        Logout
      </button>
    </div>
  );
};

export default UserNav;
