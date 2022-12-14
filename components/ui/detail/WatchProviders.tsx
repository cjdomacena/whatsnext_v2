import { filterWatchProvider } from "@lib/utils";
import { useState, useEffect } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { WatchProviders } from "@lib/types/common.type";
import { PROVIDER_ICON_URL } from "@lib/constants/config";
import Link from "next/link";

type WatchProviderTypes = {
  watchProviders?: any;
};

const WatchProvider = ({ watchProviders }: WatchProviderTypes) => {
  const [providers, setProviders] = useState<WatchProviders | null>(
    filterWatchProvider(watchProviders)
  );

  useEffect(() => {
    if (watchProviders) {
      const res = filterWatchProvider({
        region: "US",
        results: watchProviders,
      });
      setProviders(res);
    }
  }, [watchProviders]);
  return (
    <div className="container mx-auto py-12 space-y-4">
      <Tabs.Root defaultValue="flatrate" className=" max-w-2xl h-fit">
        <Tabs.List className="text-sm space-x-2 w-full border-b dark:border-b-neutral-800">
          <Tabs.Trigger
            value="flatrate"
            className="p-2 data-[state='active']:border-b-2 data-[state='active']:border-b-amber-500"
          >
            Subscription
          </Tabs.Trigger>
          <Tabs.Trigger
            value="buy"
            className="p-2 data-[state='active']:border-b-2 data-[state='active']:border-b-amber-500"
          >
            Buy/Rent
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="flatrate" className="mt-4">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-4">
            {providers && providers.flatrate ? (
              providers?.flatrate.map((provider, index) => (
                <TabContentItem
                  key={provider.provider_id ?? `provider-flatrate-${index}`}
                  link={providers.link}
                  logo_path={provider.logo_path}
                  provider_name={provider.provider_name}
                  subText="Subscription"
                />
              ))
            ) : (
              <p>Not Available</p>
            )}
          </div>
        </Tabs.Content>
        <Tabs.Content value="buy" className="mt-4">
          {providers && providers.buy ? (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
              {providers?.buy?.map((provider, index) => (
                <TabContentItem
                  key={provider.provider_id ?? `provider-flatrate-${index}`}
                  link={providers.link}
                  logo_path={provider.logo_path}
                  provider_name={provider.provider_name}
                  subText="Rent/Buy"
                />
              ))}
            </div>
          ) : (
            <p>Not Available</p>
          )}
        </Tabs.Content>
      </Tabs.Root>
      <div className="text-xs">
        <p className="dark:text-neutral-400">
          Data provided by:{" "}
          <Link href={"https://www.justwatch.com/"} className="underline">
            JustWatch
          </Link>
        </p>
      </div>
    </div>
  );
};

const TabContentItem = ({
  logo_path,
  provider_name,
  link,
  subText,
}: {
  logo_path?: string;
  provider_name: string;
  link: string;
  subText: string;
}) => {
  return (
    <div className="flex gap-2 items-center">
      {logo_path ? (
        <div className="w-[50px] h-[50px]">
          <img
            src={`${PROVIDER_ICON_URL}${logo_path}`}
            alt={provider_name}
            width="50"
            height={50}
            className="rounded "
          />
        </div>
      ) : null}
      <div>
        <Link href={link}>
          <p className="text">{provider_name}</p>
        </Link>
        <p className="text-xs">{subText}</p>
      </div>
    </div>
  );
};

export default WatchProvider;
