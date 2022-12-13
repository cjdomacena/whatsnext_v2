import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useSession, useUser } from "@supabase/auth-helpers-react";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

interface ISubscriptionContext {
  is_subscribed: boolean;
  stripe_id: string;
}

const SubscriptionContext = createContext({} as ISubscriptionContext | null);

const SubscriptionProvider = ({ children }: PropsWithChildren) => {
  const [supabase] = useState(() => createBrowserSupabaseClient());
  const [subscriptionInfo, setSubscriptionInfo] =
    useState<ISubscriptionContext | null>(null);
  const user = useUser();
  const session = useSession();

  useEffect(() => {
    const loadSubscriptionInfo = async () => {
      const { data }: { data: ISubscriptionContext | null } = await supabase
        .from("profiles")
        .select("is_subscribed, stripe_id")
        .eq("id", user?.id)
        .single();

      setSubscriptionInfo(data);
    };
    if (user || session) loadSubscriptionInfo();
  }, [user, session, supabase]);

  return (
    <SubscriptionContext.Provider value={subscriptionInfo}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => useContext(SubscriptionContext);
export default SubscriptionProvider;
