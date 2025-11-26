import React from "react";
import SocialIcons from "../components/social-icons";
import { cn } from "lib/cn";
import Image from "next/image";
import { Typewriter } from "./typewriter";
import { Metadata } from "next";
import { AgeVersion } from "../components/age-version";
import Link from "next/link";

export const metadata: Metadata = {
  title: {
    template: "%s - Bryce Kalow",
    default: "Bryce Kalow",
  },
};

const Home = () => (
  <>
    <span className="font-normal font-mono tracking-widest inline-block text-xs uppercase text-black/30 dark:text-white/30">
      v<AgeVersion />
    </span>
    <div className="mb-6 flex flex-row gap-4 font-mono">
      <span className="font-normal tracking-wide inline-block text-2xl">
        <Typewriter text="bryce kalow" />

        <span className="inline-block animate-blink font-normal text-black/40 dark:text-white/40 motion-reduce:hidden">
          |
        </span>
      </span>
    </div>
    <div
      className={cn(
        "max-w-[600px] text-lg gap-4 flex flex-col leading-relaxed"
      )}
    >
      <p>
        I am a developer working on the web, focused on creating tools and
        workflows that enable teams and individuals to iterate quickly.
      </p>
      <p>
        Currently at&nbsp;&nbsp;
        <a href="https://www.clerk.com" target="_blank" className={cn()}>
          <Image
            className="inline align-middle mt-[-6px] invert dark:invert-0"
            src="/img/clerk-logo-white.svg"
            alt="Clerk"
            width="64"
            height="24"
          />
        </a>
        , obsessing over developer experience, for humans and agents, and
        building a great product.
      </p>
      <p>
        If you're curious to learn more about me,{" "}
        <Link
          className={cn(
            "transition-colors underline underline-offset-4 decoration-dotted decoration-black/20 hover:decoration-black/40 dark:decoration-white/20 dark:hover:decoration-white/40"
          )}
          href="/about"
        >
          read the long version
        </Link>
        . You can also{" "}
        <Link
          className={cn(
            "transition-colors underline underline-offset-4 decoration-dotted decoration-black/20 hover:decoration-black/40 dark:decoration-white/20 dark:hover:decoration-white/40"
          )}
          href="/blog"
        >
          read my writing
        </Link>
        ,{" "}
        <a
          className={cn(
            "transition-colors underline underline-offset-4 decoration-dotted decoration-black/20 hover:decoration-black/40 dark:decoration-white/20 dark:hover:decoration-white/40"
          )}
          target="_blank"
          href="https://github.com/brkalow"
        >
          checkout my code
        </a>
        , or{" "}
        <a
          className={cn(
            "transition-colors underline underline-offset-4 decoration-dotted decoration-black/20 hover:decoration-black/40 dark:decoration-white/20 dark:hover:decoration-white/40"
          )}
          target="_blank"
          href="https://x.com/brkalow"
        >
          follow me
        </a>
        .
      </p>
      <div className="mt-4">
        <h2 className="mb-4 border-b text-xs uppercase tracking-widest text-black/50 dark:text-white/50 border-black/5 dark:border-white/5 pb-3">
          Connect
        </h2>
        <dl className="grid grid-cols-[100px_1fr] gap-y-3 gap-x-4 my-4 text-sm">
          <dt className="text-black/40 dark:text-white/40">Email</dt>
          <dd>
            <a
              className="transition-colors hover:text-black dark:hover:text-white"
              href="mailto:hello@brycekalow.name"
            >
              hello@brycekalow.name
            </a>
          </dd>
          <dt className="text-black/40 dark:text-white/40">X</dt>
          <dd>
            <a
              className="transition-colors hover:text-black dark:hover:text-white"
              href="https://x.com/brkalow"
              target="_blank"
            >
              @brkalow
            </a>
          </dd>
          <dt className="text-black/40 dark:text-white/40">GitHub</dt>
          <dd>
            <a
              className="transition-colors hover:text-black dark:hover:text-white"
              href="https://github.com/brkalow"
              target="_blank"
            >
              @brkalow
            </a>
          </dd>
          <dt className="text-black/40 dark:text-white/40">LinkedIn</dt>
          <dd>
            <a
              className="transition-colors hover:text-black dark:hover:text-white"
              href="https://www.linkedin.com/in/brkalow/"
              target="_blank"
            >
              @brkalow
            </a>
          </dd>
        </dl>
      </div>
      {/* <SocialIcons className="mt-6" /> */}
    </div>
  </>
);

export default Home;
