import MetaHeader from "@components/MetaHeader";
import { subscriptionInfo } from "@lib/api/getSubscriptionInfo";
import { QUERY_CONFIG } from "@lib/constants/config";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const ManageSubscription = () => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const router = useRouter();
  const { data, status } = useQuery(
    ["subscription_info"],
    () => subscriptionInfo(user?.id, supabase),
    {
      ...QUERY_CONFIG,
    }
  );

  const loadPortal = (is_subscribed: boolean) => {
    is_subscribed
      ? router.push("/api/stripe/manage-subscription")
      : router.push("/api/stripe/checkout-session");
  };

  return (
    <div className="container mx-auto my-12 space-y-4 min-h-[60vh]">
      <MetaHeader title="Whatsnext — Manage Subscription" />
      <h1 className="text-6xl font-bold leading-relaxed">
        Manage Subscription
      </h1>{" "}
      {status === "success" ? (
        <p className="text-xs">
          Status: {data && data.is_subscribed ? "Subscribed" : "Not Subscribed"}
        </p>
      ) : (
        <p className="text-xs">Status: Loading...</p>
      )}
      <button
        className="px-4 py-2 dark:bg-neutral-700 rounded text-sm"
        onClick={() => loadPortal(data.is_subscribed)}
        disabled={status === "loading" || status === "error"}
      >
        {data && data.is_subscribed ? "Update Subscription" : "Subscribe"}
      </button>
    </div>
  );
};

export default ManageSubscription;
