import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

// 📌 **AnimatedNumber 組件（共用動畫）**
export default function AnimatedNumber({ targetNumber }) {
  const controls = useAnimation();
  const [number, setNumber] = useState(1);

  useEffect(() => {
    controls.start({
      value: targetNumber, // 目標數字
      transition: { duration: 0.5, ease: [0, 1.95, 0.1, 1.95] }
    });
  }, [targetNumber]); // ✅ 監聽 targetNumber，每次變更都會播放動畫

  return (
    <motion.span
      animate={controls}
      initial={{ value: 1 }}
      onUpdate={(latest) => setNumber(Math.floor(Math.random() * 10) + 1)}
      onAnimationComplete={() => setNumber(targetNumber)}
    >
      {number}
    </motion.span>
  );
}
