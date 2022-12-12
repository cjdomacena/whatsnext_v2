import { motion } from "framer-motion";

const container = {
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const GridContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      className="mt-8 grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-6 justify-center"
      variants={container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {children}
    </motion.div>
  );
};

export default GridContainer;
