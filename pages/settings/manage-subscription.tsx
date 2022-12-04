import MetaHeader from "@components/MetaHeader";
import { subscriptionInfo } from "@lib/api/getSubscriptionInfo";
import { QUERY_CONFIG } from "@lib/constants/config";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const supabase = createServerSupabaseClient(context);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["subscription_info"],
    queryFn: () => subscriptionInfo(user?.id, supabase),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const ManageSubscription = () => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const router = useRouter();
  const { data } = useQuery(
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
    <div className="container mx-auto my-12 space-y-4">
      <MetaHeader title="Whatsnext — Manage Subscription" />
      <h1 className="text-6xl font-bold leading-relaxed">
        Manage Subscription
      </h1>{" "}
      <p className="text-xs">
        Status: {data.is_subscribed ? "Subscribed" : "Not Subscribed"}
      </p>
      <button
        className="px-4 py-2 dark:bg-neutral-700 rounded text-sm"
        onClick={() => loadPortal(data.is_subscribed)}
      >
        {data.is_subscribed ? "Update Subscription" : "Subscribe"}
      </button>
    </div>
  );
};

export default ManageSubscription;
