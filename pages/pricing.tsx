import { useSubscription } from "@components/context/SubscriptionContext";
import { useRouter } from "next/router";

const Pricing = () => {
  const subscriptionInfo = useSubscription();
  const router = useRouter();

  const handleSubmit = () => {
    if (subscriptionInfo && subscriptionInfo.is_subscribed) {
      router.push(`/settings/manage-subscription`);
    } else {
      router.push("/auth/register");
    }
  };

  return (
    <div className="container mx-auto my-12 p-4 min-h-[80vh]">
      <div className="w-full text-center max-w-2xl mx-auto">
        <p className="text-xs tracking-wider text-amber-500 font-medium">
          PRICING
        </p>
        <h1 className="text-6xl font-black leading-tight">
          Simple, transparent pricing
        </h1>
        <p className="mt-4">
          Get access to reviews from verified critics across industry and
          curated titles.
        </p>
      </div>
      <div className="max-w-4xl mx-auto mt-12 grid  gap-4 2xl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 grid-cols-1">
        <div className="bg-neutral-600 p-4 text-white space-y-4 rounded flex flex-col justify-between">
          <p className="uppercase tracking-widest font-semibold">Free</p>
          <h4 className="text-4xl font-bold">Member Tier</h4>
          <p>Unlimited titles on your watchlist</p>
          <button
            className="p-2 bg-neutral-900 w-full rounded text-center text-white"
            onClick={handleSubmit}
          >
            Get Started - For Free
          </button>
        </div>
        <div className="bg-neutral-800 p-4 text-neutral-400 space-y-4 rounded flex flex-col justify-between">
          <p className="uppercase tracking-widest font-semibold">Paid</p>
          <h4 className="text-4xl font-bold">Premium</h4>
          <p>Get access to reviews from verified critics and curated titles.</p>
          <button
            className="p-2 bg-neutral-900 w-full rounded text-center text-white"
            onClick={handleSubmit}
          >
            Subscribe - $2.99 / month
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
