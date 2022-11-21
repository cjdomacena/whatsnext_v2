import { User } from "@supabase/supabase-js";

const UserNav = ({ user }: { user: User }) => {
  return (
    <button>
      <h4>{user.user_metadata.full_name}</h4>
    </button>
  );
};

export default UserNav;
