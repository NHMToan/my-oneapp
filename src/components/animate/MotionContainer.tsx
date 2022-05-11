import { Box } from "@mui/material";
import { m } from "framer-motion";
import { ReactNode } from "react";
//
import { varContainer } from "./variants";

interface MotionContainerProps {
  action?: boolean;
  animate?: boolean;
  children: ReactNode;
}
export default function MotionContainer({
  animate,
  action = false,
  children,
  ...other
}: MotionContainerProps) {
  if (action) {
    return (
      <Box
        component={m.div}
        initial={false}
        animate={animate ? "animate" : "exit"}
        variants={varContainer()}
        {...other}
      >
        {children}
      </Box>
    );
  }

  return (
    <Box
      component={m.div}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={varContainer()}
      {...other}
    >
      {children}
    </Box>
  );
}
