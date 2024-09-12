"use client";
import { Metadata } from "next";
import { motion } from "framer-motion";
import { LogoDefault } from "@/components/Logo";

const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <div className="flex w-full h-full justify-center">
      <motion.div
        className="flex flex-col justify-center items-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        layout
      >
        <LogoDefault size={100} />
        <h1 className="text-4xl">Welcome !</h1>
      </motion.div>
    </div>
  );
}
