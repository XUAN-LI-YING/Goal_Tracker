import { motion } from "framer-motion";
import React from "react";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export default function HomeFadeMotion({
  children,
  as = "div",
  className,
  ...rest
}) {
  const MotionTag = motion.create(as);
  return (
    <MotionTag
      className={className}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
