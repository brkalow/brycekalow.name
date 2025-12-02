import { cn } from "lib/cn";
import Image from "next/image";
import { ClerkLogo } from "../../components/clerk-logo";
import profilePic from "./avatar.png";
import icelandPic from "./iceland.jpeg";
import confTalkPic from "./conf_talk.jpeg";
import sailing1Pic from "./sailing_1.jpeg";
import sailing2Pic from "./sailing_3.jpeg";
import dadPic from "./dad.jpeg";
import dogPic from "./dog.jpeg";
import greecePic from "./greece.jpeg";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About me",
};

export default function AboutPage() {
  return (
    <>
      <h1
        className={cn(
          "text-2xl mb-8 mt-0 font-normal flex gap-4 flex-row tracking-wide font-mono items-center justify-between"
        )}
      >
        <div className="flex flex-col gap-1">
          <Link
            href="/"
            className="font-normal font-sans tracking-widest inline-block text-xs uppercase text-black/30 dark:text-white/30 transition-colors hover:text-black/60 dark:hover:text-white/60"
          >
            bryce kalow/
          </Link>
          <span>About me</span>
        </div>
        <Image
          src={profilePic}
          alt="profile shot"
          width="48"
          height="48"
          className={cn(
            "rounded-full inline-block",
            "dark:border dark:border-white/25"
          )}
          placeholder="blur"
        />
      </h1>
      <section data-post className="leading-relaxed">
        <p>
          Hiya, I'm Bryce. I'm currently an engineer at{" "}
          <a
            href="https://www.clerk.com"
            target="_blank"
            className="transition-opacity hover:opacity-70"
          >
            <ClerkLogo className="inline align-middle h-[16px] w-auto" />
          </a>{" "}
          obsessing over developer experience, for humans and agents, and
          building a great product.
        </p>
        <p>
          At work, I have a deep interest in creating tools and platforms for
          other developers. I've spent nearly a decade across a few companies
          working with frameworks and tooling for primarily frontend teams, but
          I'm not afraid to dive into other areas of the stack. I've worked on
          frameworks, tooling, and performance optimization for one of the
          largest US e-commerce sites, and I've also helped other companies
          build scalable frontend applications during times of huge
          organizational growth.
        </p>
        <p>
          I generally love working with small, high-performing teams solving
          interesting technical and product problems in the web space. I'm not
          afraid to work across large parts of the organization and collaborate
          with all levels of leadership to make sure we're solving the right
          problems for the business.
        </p>
        <p>
          Outside of work, I'm learning how to be a dad, biking, and racing
          sailboats competitively across the country. If any of this sounds
          interesting to you, let's chat!
        </p>
      </section>
      <section className="grid auto-rows-[128px] grid-cols-2 md:grid-cols-4 gap-3 mt-8">
        <figure className="row-span-1 col-span-2 relative rounded-xl overflow-hidden m-0">
          <Image
            fill
            src={icelandPic}
            sizes="50vw"
            alt="Black sand beach Iceland"
            className="object-cover"
            placeholder="blur"
          />
        </figure>
        <figure className="row-span-2 col-span-2 relative rounded-xl overflow-hidden m-0">
          <Image
            fill
            src={confTalkPic}
            sizes="50vw"
            alt="Me giving a talk at React Conf 2018"
            className="object-cover"
            placeholder="blur"
          />
        </figure>

        <figure className="row-span-1 col-span-1 relative rounded-xl overflow-hidden m-0">
          <Image
            fill
            src={sailing1Pic}
            sizes="50vw"
            alt="Four people on a sailboat"
            className="object-cover"
            placeholder="blur"
          />
        </figure>
        <figure className="row-span-1 col-span-1 relative rounded-xl overflow-hidden m-0">
          <Image
            fill
            src={sailing2Pic}
            sizes="50vw"
            alt="Four people on a sailboat with a spinnaker up"
            className="object-cover"
            placeholder="blur"
          />
        </figure>
        <figure className="row-span-2 col-span-2 relative rounded-xl overflow-hidden m-0">
          <Image
            fill
            src={dadPic}
            sizes="50vw"
            alt="Me being a dad"
            className="object-cover"
            placeholder="blur"
          />
        </figure>
        <figure className="row-span-2 relative rounded-xl overflow-hidden m-0">
          <Image
            fill
            src={dogPic}
            sizes="50vw"
            alt="Certified good boi"
            className="object-cover"
            placeholder="blur"
          />
        </figure>
        <figure className="row-span-2 col-span-1 relative rounded-xl overflow-hidden m-0">
          <Image
            fill
            src={greecePic}
            sizes="50vw"
            alt="A cobblestone road in Athens, Greece"
            className="object-cover"
            placeholder="blur"
          />
        </figure>
      </section>
    </>
  );
}
