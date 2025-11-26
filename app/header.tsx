"use client";

import { motion } from "framer-motion";
import { cn } from "lib/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { WordMark } from "./word-mark";

export function Header() {
  const path = usePathname();

  return (
    <div
      className={cn(
        "fixed bottom-4 lg:bottom-8 w-full px-8 flex z-10 justify-center"
      )}
    >
      <motion.div
        transition={{
          delay: 0.2,
          duration: 0.3,
          type: "spring",
          damping: 15,
        }}
        initial={{ y: "200%" }}
        animate={{ y: 0 }}
        className={cn(
          "max-w-full lg:max-w-[500px] flex flex-row justify-between items-center rounded-full backdrop-blur-md px-5 py-2 border shadow-md gap-4",
          "bg-white/75 shadow-black/10 border-black/10 text-black/90",
          "dark:bg-black/50 dark:border-white/25 dark:shadow-inherit dark:text-white/90"
        )}
      >
        <WordMark short className="mt-[-1px]" />
        <span className="text-black/25 dark:text-white/25">|</span>
        <nav className="flex gap-4 items-center mt-[-1px] ml-4">
          <Link
            href="/about"
            className="hover:underline decoration-2 underline-offset-1"
          >
            About
          </Link>
          <Link
            href="/blog"
            className="hover:underline decoration-2 underline-offset-1"
          >
            Posts
          </Link>
          {/* <Link
            href="/notes/rsc"
            className="hover:underline decoration-2 underline-offset-1"
          >
            Notes
          </Link> */}
        </nav>
      </motion.div>
    </div>
  );
}
