import { Bot, LucideProps } from "lucide-react";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export const Logo = () => {
  return (
    <Link
      href="/"
      className="flex space-x-2 items-center text-sm text-black py-1 relative"
    >
      <Bot size={30} className="flex-shrink-0 text-regal-blue" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre text-2xl"
      >
        HomeLab
      </motion.span>
    </Link>
  );
};

export const LogoDefault: React.FC<LucideProps> = (props = {}) => {
  return <Bot size={30} className="flex-shrink-0 text-regal-blue" {...props} />;
};
