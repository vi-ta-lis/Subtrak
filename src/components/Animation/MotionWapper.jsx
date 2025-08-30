import { motion } from "framer-motion";

export const MotionImage = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, x: -50, scale: 0.9 }}
    animate={{ opacity: 1, x: 0, scale: 1 }}
    transition={{ duration: 0.8, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

export const MotionText = ({ children, delay = 0.3 }) => (
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8, ease: "easeOut", delay }}
  >
    {children}
  </motion.div>
);
