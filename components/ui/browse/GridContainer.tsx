const container = {
  show: {
    transition: {
      staggerChildren: 2,
    },
  },
};

const GridContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mt-8 grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-6">
      {children}
    </div>
  );
};

export default GridContainer;
