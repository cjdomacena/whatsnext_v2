const LoadingSlide = () => {
  return (
    <div className="w-full h-64 grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-2">
      <div className="dark:bg-neutral-800 bg-neutral-200 animate-pulse rounded h-full w-full" />
      <div className="dark:bg-neutral-800 bg-neutral-200 animate-pulse rounded" />
      <div className="dark:bg-neutral-800 bg-neutral-200 animate-pulse rounded" />
      <div className="dark:bg-neutral-800 bg-neutral-200 animate-pulse rounded" />
    </div>
  );
};
export default LoadingSlide;
