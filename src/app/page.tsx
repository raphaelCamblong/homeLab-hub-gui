"use client";
import React from "react";
import { motion } from "framer-motion";
import { LogoDefault } from "@/components/Logo";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  const user = session?.user;

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
        {user ? (
          <p className="text-sm text-muted-foreground">
            Nice to see you {user.name}
          </p>
        ) : (
          <Link href="/auth/login">
            <p className="text-sm text-muted-foreground">
              Please login to continue
            </p>
          </Link>
        )}
      </motion.div>
    </div>
  );
}
