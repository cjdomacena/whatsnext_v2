import * as Tooltip from "@radix-ui/react-tooltip";
type TooltipProps = {
  trigger: JSX.Element | JSX.Element[];
  portal: JSX.Element | JSX.Element[];
};

const CustomTooltip: React.FC<TooltipProps> = ({ trigger, portal }) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{trigger}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content className="dark:bg-neutral-800 px-4 py-2 whitespace-nowrap TooltipContent bg-white">
            {portal}
            <Tooltip.Arrow className="dark:fill-neutral-800 fill-white" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default CustomTooltip;
