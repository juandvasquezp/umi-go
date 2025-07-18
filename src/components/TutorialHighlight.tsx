import { motion } from "framer-motion";

interface TutorialHighlightProps {
  isActive: boolean;
  children: React.ReactNode;
}

export function TutorialHighlight({ isActive, children }: TutorialHighlightProps) {
  if (!isActive) {
    return <>{children}</>;
  }

  return (
    <motion.div
      className="relative"
      initial={{ scale: 1 }}
      animate={{ 
        scale: [1, 1.05, 1],
        boxShadow: [
          "0 0 0 0px rgba(255, 149, 0, 0)",
          "0 0 0 4px rgba(255, 149, 0, 0.3)",
          "0 0 0 0px rgba(255, 149, 0, 0)"
        ]
      }}
      transition={{ 
        duration: 2, 
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
      <motion.div
        className="absolute inset-0 border-2 border-primary rounded-lg pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
}