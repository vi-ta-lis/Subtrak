// src/components/MotionWrapper.jsx
import { motion, AnimatePresence } from "framer-motion";

export const MotionCard = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.5, ease: "easeOut", delay }}
  >
    {children}
  </motion.div>
);

export const MotionModal = ({ isOpen, children }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full max-w-lg"
        >
          {children}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export const MotionListItem = ({ children, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.4, delay: index * 0.05 }}
  >
    {children}
  </motion.div>
);
