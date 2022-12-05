import Avatar from "@components/common/avatar";
import * as Tabs from "@radix-ui/react-tabs";

type CreditTabsProps = {
  cast: any;
  crew: any;
};

const CreditTabs = ({ cast, crew }: CreditTabsProps) => {
  return (
    <Tabs.Root className="  " defaultValue="cast">
      <Tabs.List
        aria-label="Cast and Crew"
        className="text-xs pb-2 flex  w-full"
      >
        <Tabs.Trigger
          value="cast"
          className="dark:bg-neutral-900 bg-neutral-100 px-6 py-2 border-t 
          data-[state='active']:border-t-amber-500
          data-[state='inactive']:dark:border-t-neutral-800
          rounded-tl
           w-full"
        >
          Cast
        </Tabs.Trigger>
        <Tabs.Trigger
          value="crew"
          className="dark:bg-neutral-900 bg-neutral-100 px-6 py-2  border-t 
          data-[state='active']:border-t-amber-500
          data-[state='inactive']:dark:border-t-neutral-800
           w-full
           rounded-tr
           "
        >
          Crew
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content
        value="cast"
        className="max-h-[500px] overflow-y-scroll border-r border-r-neutral-100 dark:border-r-neutral-800"
      >
        <div className="grid grid-cols-1 p-4 gap-4 items-start justify-center relative">
          {cast.length > 0
            ? cast.map((castUser: any) => (
                <div
                  className=" flex gap-4 items-center z-10"
                  key={`cast-${castUser.id}`}
                >
                  <Avatar
                    name={castUser.original_name ?? ""}
                    src={castUser.profile_path}
                  />
                  <div>
                    <p>{castUser.original_name}</p>
                    <p className="text-xs">{castUser.character}</p>
                  </div>
                </div>
              ))
            : null}

          {/* <p>{details.credits.cast[0].original_name}</p> */}
        </div>
      </Tabs.Content>
      <Tabs.Content
        value="crew"
        className="max-h-[500px] overflow-y-scroll border-r border-r-neutral-100 dark:border-r-neutral-800"
      >
        <div className="grid grid-cols-1 p-4 gap-4 items-start justify-center relative">
          {crew.length > 0
            ? crew.map((crewUser: any) => (
                <div
                  className=" flex gap-4 items-center z-10"
                  key={`cast-${crewUser.id}`}
                >
                  <Avatar
                    name={crewUser.original_name ?? ""}
                    src={crewUser.profile_path}
                  />
                  <div>
                    <p>{crewUser.original_name}</p>
                    <p className="text-xs">{crewUser.job}</p>
                  </div>
                </div>
              ))
            : null}

          {/* <p>{details.credits.cast[0].original_name}</p> */}
        </div>
      </Tabs.Content>
    </Tabs.Root>
  );
};

export default CreditTabs;
