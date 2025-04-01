import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

export default function PersonNumberMotion({ targetNumber }) {
  const controls = useAnimation();
  const [number, setNumber] = useState(1);

  useEffect(() => {
    controls.start({
      value: targetNumber,
      transition: { duration: 0.5, ease: [0, 1.95, 0.1, 1.95] }
    });
  }, [targetNumber]);

  return (
    <motion.span
      animate={controls}
      initial={{ value: -1 }}
      onUpdate={(latest) => setNumber(Math.floor(Math.random() * 10) + 1)}
      onAnimationComplete={() => setNumber(targetNumber)}
    >
      {number}
    </motion.span>
  );
}
