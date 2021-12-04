import React from "react";
import { motion } from "framer-motion";

const circles = {
  width: "2rem",
  height: "2rem",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
};

const circlesItem = {
  display: "block",
  width: "0.4rem",
  height: "0.4rem",
  background: "rgb(255, 255, 255, 0.88)",
  borderRadius: "50%",
};

const motionCircles = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const motionCirclesItem = {
  initial: {
    y: "0%",
  },
  animate: {
    y: "150%",
    transition: {
      yoyo: Infinity,
      duration: 0.33,
      ease: "easeInOut",
    },
  },
};

const ThreeDotsLoader = () => {
  return (
    <motion.div style={circles} variants={motionCircles} animate="animate">
      <motion.span style={circlesItem} variants={motionCirclesItem} />
      <motion.span style={circlesItem} variants={motionCirclesItem} />
      <motion.span style={circlesItem} variants={motionCirclesItem} />
    </motion.div>
  );
};

export default ThreeDotsLoader;
