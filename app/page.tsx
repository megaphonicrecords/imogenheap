import Image from "next/image";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
} from "@nextui-org/react";

import { RxChevronRight } from "react-icons/rx";
import whydtm2 from "../public/images/whydtm2.jpg";

export default function Home() {
  return (
    <>
      {/*<Image
        src={whydtm2}
        alt="What Have You Done To Me promo image"
        placeholder="blur"
        className="w-full object-cover rounded-xl border border-transparent"
  />*/}
      <div className="mb-12 mt-16 grid lg:max-w-4xl lg:w-full md:grid-cols-2 lg:grid-cols-3 text-left">
        <a
          href="https://imogenheap.app"
          className="group glowBox hover:shadow-[0_0px_75px_-25px_rgb(99,156,255,1)]"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-sm font-semibold">
            <Image
              src="/app-icon.png"
              alt="Heapster App icon"
              className="rounded-lg inline-block mr-2"
              width={30}
              height={30}
            />
            <span className="text-blue-500">Heapster App</span>
            <span className="text-blue-300 ml-1 align-middle inline-block transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none">
              <RxChevronRight />
            </span>
          </h2>
          <p className="m-0 max-w-[100ch] text-sm font-extralight">
            <b>Be part of the Heapster community.</b> Listen to Imogen’s entire
            discography, unreleased songs, videos, and watch livestreams or chat
            with her directly in the app.
          </p>
        </a>

        <a
          href="https://mogen.ai"
          className="group glowBox hover:shadow-[0_0px_75px_-25px_rgb(211,247,178,1)]"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-sm font-semibold">
            <Image
              src="/aimogen-icon.png"
              alt="ai.mogen icon"
              className="rounded-lg inline-block mr-2"
              width={30}
              height={30}
            />
            <span className="text-lime-200">ai.mogen</span>
            <span className="text-lime-100 ml-1 align-middle inline-block transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none">
              <RxChevronRight />
            </span>
          </h2>
          <p className="m-0 max-w-[100ch] text-sm font-extralight">
            <b>Learn about Imogen’s ongoing AI project.</b> Talk to Augmented
            Imogen Heap, help contribute to the AImogen model, and see roadmap
            of its development.
          </p>
        </a>

        <a
          href="https://mimugloves.com"
          className="group glowBox hover:shadow-[0_0px_75px_-25px_rgb(60,178,185,1)]"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-sm font-semibold">
            <Image
              src="/mimu-icon.png"
              alt="MiMu icon"
              className="rounded-lg inline-block mr-2"
              width={30}
              height={30}
            />
            <span className="text-teal-400">MiMu Gloves</span>
            <span className="text-teal-200 ml-1 align-middle inline-block transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none">
              <RxChevronRight />
            </span>
          </h2>
          <p className="m-0 max-w-[100ch] text-sm font-extralight">
            <b>Check out Imogen’s magical gloves.</b> Music through movement.
            Learn about the world’s most advanced and innovative wearable
            musical instrument.
          </p>
        </a>

        <a
          href="https://prerelease.creativepassport.net"
          className="group glowBox hover:shadow-[0_0px_75px_-25px_rgb(205,83,138,1)]"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-sm font-semibold">
            <Image
              src="/creativepassport-icon.png"
              alt="The Creative Passport icon"
              className="rounded-lg inline-block mr-2"
              width={30}
              height={30}
            />
            <span className="text-pink-400">The Creative Passport</span>
            <span className="text-pink-300 ml-1 align-middle inline-block transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none">
              <RxChevronRight />
            </span>
          </h2>
          <p className="m-0 max-w-[100ch] text-sm font-extralight">
            <b>Sign up to Imogen’s platform for digital identity.</b> A verified
            digital ID and data hub for musicmakers, services, and
            representatives.
          </p>
        </a>

        <a
          href="https://thehideaway.studio"
          className="group glowBox hover:shadow-[0_0px_75px_-25px_rgb(232,218,197,1)]"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-sm font-semibold">
            <Image
              src="/hideaway-icon.png"
              alt="The Hideaway Studio icon"
              className="rounded-lg inline-block mr-2"
              width={30}
              height={30}
            />
            <span className="text-orange-100">The Hideaway Studio</span>
            <span className="text-orange-50 ml-1 align-middle inline-block transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none">
              <RxChevronRight />
            </span>
          </h2>
          <p className="m-0 max-w-[100ch] text-sm font-extralight">
            <b>
              Explore the East London residential studio and production space.
            </b>{" "}
            Available for private bookings, studio hire, and creative retreats.
          </p>
        </a>

        <a
          href="https://megaphonicrecords.com"
          className="group glowBox hover:shadow-[0_0px_75px_-25px_rgb(233,233,233,1)]"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-sm font-semibold">
            <Image
              src="/megaphonic-icon.png"
              alt="Megaphonic Records icon"
              className="rounded-lg inline-block mr-2"
              width={30}
              height={30}
            />
            <span className="text-warmGray-200">Megaphonic Records</span>
            <span className="ml-1 align-middle inline-block transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none">
              <RxChevronRight />
            </span>
          </h2>
          <p className="m-0 max-w-[100ch] text-sm font-extralight">
            <b>Discover Imogen’s independent music label.</b> Explore the
            catalogue, and connect with publishing, booking, and management
            team.
          </p>
        </a>
      </div>
      <div
        className="lg:max-w-4xl lg:w-full text-center rounded-xl
  border  
  px-5 py-4 
  transition-colors 
border-dotted border-zinc-700"
      >
        <p className="text-sm">Stay tuned.</p>
        <p className="mb-2 text-sm font-extralight">
          We're building a new space for all things Imogen Heap.
        </p>
        <Button
          as={Link}
          color="secondary"
          href="https://legacy.imogenheap.com"
          variant="flat"
        >
          View Legacy Website
        </Button>
      </div>
    </>
  );
}
