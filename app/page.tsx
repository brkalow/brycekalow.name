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
    <span className="font-normal font-mono tracking-tight inline-block text-sm text-black/40 dark:text-white/40">
      v<AgeVersion />
    </span>
    <div className="mb-6 flex flex-row gap-4 font-mono">
      <span className="font-normal tracking-tight inline-block text-2xl">
        <Typewriter text="bryce kalow" />

        <span className="inline-block animate-blink font-normal text-black/40 dark:text-white/40 motion-reduce:hidden">
          |
        </span>
      </span>
    </div>
    <div className={cn("max-w-[600px] text-lg gap-4 flex flex-col")}>
      <p>
        I am a developer working on the web, focused on creating tools and
        workflows that enable teams and individuals to iterate quickly.
      </p>
      <p>
        Currently at&nbsp;&nbsp;
        <a href="https://www.clerk.com" target="_blank" className={cn()}>
          <Image
            className="inline align-middle mt-[-4px] invert dark:invert-0"
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
            "transition-colors underline underline-offset-2 decoration-white/30 hover:decoration-white/50"
          )}
          href="/about"
        >
          read the long version
        </Link>
        . You can also{" "}
        <Link
          className={cn(
            "transition-colors underline underline-offset-2 decoration-white/30 hover:decoration-white/50"
          )}
          href="/blog"
        >
          read my writing
        </Link>
        ,{" "}
        <a
          className={cn(
            "transition-colors underline underline-offset-2 decoration-white/30 hover:decoration-white/50"
          )}
          target="_blank"
          href="https://github.com/brkalow"
        >
          checkout my code
        </a>
        , or{" "}
        <a
          className={cn(
            "transition-colors underline underline-offset-2 decoration-white/30 hover:decoration-white/50"
          )}
          target="_blank"
          href="https://x.com/brkalow"
        >
          follow me
        </a>
        .
      </p>
      <div className="mt-4">
        <h2 className="mb-2 border-b text-white/90 border-white/10 pb-2">
          Connect
        </h2>
        <dl className="grid grid-cols-2 gap-2 max-w-[300px] my-4 text-base">
          <dt className="text-white/50">Email</dt>
          <dd>
            <a href="mailto:hello@brycekalow.name">hello@brycekalow.name</a>
          </dd>
          <dt className="text-white/50">X</dt>
          <dd>
            <a href="https://x.com/brkalow" target="_blank">
              @brkalow
            </a>
          </dd>
          <dt className="text-white/50">GitHub</dt>
          <dd>
            <a href="https://github.com/brkalow" target="_blank">
              @brkalow
            </a>
          </dd>
          <dt className="text-white/50">LinkedIn</dt>
          <dd>
            <a href="https://www.linkedin.com/in/brkalow/" target="_blank">
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
