import { FormInput } from "@components/common/input";
import SwitchInput from "@components/common/input/SwitchInput";
import MetaHeader from "@components/MetaHeader";
import { UserProfile } from "@components/ui/watchlist";
import { getProfile } from "@lib/api/getProfile";
import { QUERY_CONFIG } from "@lib/constants/config";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

const Profile = () => {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const queryClient = useQueryClient();
  const { username } = router.query;
  const { data: userProfile } = useQuery(
    ["profile", username],
    () => getProfile(username as string, supabase),
    {
      enabled: username ? true : false,
      suspense: true,
      ...QUERY_CONFIG,
    }
  );

  const [newUsername, setUsername] = useState<string>("");
  const [fullName, setFullname] = useState<string>("");
  const [isPrivate, setPrivate] = useState<boolean>(false);

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      full_name: fullName,
      is_private: isPrivate,
    };
    try {
      const { error } = await supabase
        .from("profiles")
        .update(data)
        .eq("id", userProfile.id);
      if (error) throw error;
    } catch (e: any) {
      console.log(e.message || e);
    }
  };

  const mutation = useMutation({
    mutationFn: handleUpdate,
    onSuccess: () => {
      toast.success("Profile Updated", {
        id: "mutation",
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile", username],
      });
    },
    onMutate: () => {
      toast.loading("Loading...", {
        id: "mutation",
      });
    },
  });

  useEffect(() => {
    if (userProfile) {
      setUsername(userProfile.username);
      setFullname(userProfile.full_name);
      setPrivate(userProfile.is_private);
    }
  }, [userProfile]);

  return (
    <section className="my-12 container mx-auto p-4 flex gap-8 flex-wrap min-h-[80vh]">
      <MetaHeader title={`Whatsnext — Update Profile`} />
      {userProfile ? (
        <UserProfile userProfile={userProfile} withShareUrl={false} />
      ) : null}

      <div className="flex-grow h-auto">
        <form
          className="space-y-4 max-w-2xl mx-auto"
          onSubmit={mutation.mutate}
        >
          <h1 className="text-xl font-bold">Profile</h1>
          <FormInput
            setter={setUsername}
            value={newUsername}
            id={"username"}
            textLabel={"Username"}
            disabled={true}
          />
          <FormInput
            setter={setFullname}
            value={fullName}
            id={"fullName"}
            textLabel={"Full Name"}
            disabled={mutation.isLoading}
          />
          <SwitchInput
            setter={setPrivate}
            value={isPrivate}
            loading={mutation.isLoading}
          />
          <button
            type="submit"
            className="px-6 py-2 bg-amber-500 text-xs font-medium rounded hover:bg-amber-700 transition-colors"
            disabled={mutation.isLoading}
          >
            Update Profile
          </button>
        </form>
      </div>
    </section>
  );
};

export default Profile;
