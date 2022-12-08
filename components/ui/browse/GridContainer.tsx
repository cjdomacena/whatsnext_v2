import { motion } from "framer-motion";

const container = {
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const GridContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      className="mt-8 grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-6"
      variants={container}
    >
      {children}
    </motion.div>
  );
};

export default GridContainer;
