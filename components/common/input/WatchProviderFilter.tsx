import { getWatchProviders } from "@lib/api/getWatchProviders";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";
import { IoCaretDownSharp } from "react-icons/io5";

type WatchProviderFilterProps = {
  media: string;
};

const WatchProviderFilter = ({ media }: WatchProviderFilterProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeService, setActiveService] = useState<string | null>(null);
  const [limit, setLimit] = useState<number>(30);

  const { data, isLoading } = useQuery<
    {
      logo_path: string;
      provider_name: string;
      provider_id: number;
      display_priority: number;
    }[]
  >(["providers", media], () => getWatchProviders(media), {
    cacheTime: 10000 * 5,
    refetchOnWindowFocus: false,
    staleTime: 10000 * 5,
    refetchOnMount: false,
    onSettled(data, error) {
      if (!error) {
        return data?.sort((a, b) => a.display_priority - b.display_priority);
      }
    },
  });

  return (
    <div className="relative w-auto">
      <div>
        <button
          className="text-sm px-3 py-2 bg-neutral-800 rounded flex items-center gap-2"
          onClick={() => setIsOpen((prev) => !prev)}
          disabled={isLoading}
        >
          {activeService ? activeService : "Streaming Service"}
          <IoCaretDownSharp />
        </button>
      </div>
      {isOpen ? (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(50px,1fr))] gap-4 absolute top-12 right-0 w-[50vw] bg-neutral-800 p-4">
          {data
            ? data.map((provider, index) =>
                index < limit ? (
                  <div className="text-sm" key={provider.provider_id}>
                    <Image
                      src={`https://www.themoviedb.org/t/p/original${provider.logo_path}`}
                      alt={provider.provider_name}
                      width={40}
                      height={40}
                      className="rounded"
                    />
                  </div>
                ) : null
              )
            : null}
        </div>
      ) : null}
    </div>
  );
};

export default WatchProviderFilter;
