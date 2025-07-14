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
import Newsletter from "./Newsletter";

export default function Home() {
  return (
    <>
      {/*<Image
        src={whydtm2}
        alt="What Have You Done To Me promo image"
        placeholder="blur"
        className="w-full object-cover rounded-xl border border-transparent"
  />*/}
      {/* Newsletter Section */}
      <div className="my-12 w-full lg:max-w-4xl">
        <Newsletter />
      </div>

      <div className="mb-12 mt-16 grid lg:max-w-4xl lg:w-full md:grid-cols-2 lg:grid-cols-3 text-left">
        <a
          href="https://imogenheap.app"
          className="group glowBox hover:shadow-[0_0px_75px_-25px_rgb(250,250,250,1)]"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-sm font-semibold">
            <Image
              src="/imogensite-square.png"
              alt="Heapster App icon"
              className="rounded-lg inline-block mr-2"
              width={30}
              height={30}
            />
            <span className="text-neutral-200">Imogen Heap App</span>
            <span className="text-neutral-300 ml-1 align-middle inline-block transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none">
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
          className="group glowBox hover:shadow-[0_0px_75px_-25px_rgb(99,180,255,1)]"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-sm font-semibold">
            <Image
              src="/mogenai-square.png"
              alt="ai.mogen icon"
              className="rounded-lg inline-block mr-2"
              width={30}
              height={30}
            />
            <span className="text-[#0191C0]">Mogen AI</span>
            <span className="text-[#0191C0] ml-1 align-middle inline-block transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none">
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
          href="https://id.auracles.io"
          className="group glowBox hover:shadow-[0_0px_75px_-25px_rgb(101,83,233,1)]"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-sm font-semibold">
            <Image
              src="/auracles-icon.png"
              alt="Auracles icon"
              className="rounded-lg inline-block mr-2"
              width={30}
              height={30}
            />
            <span className="text-violet-400">Auracles</span>
            <span className="text-violet-300 ml-1 align-middle inline-block transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none">
              <RxChevronRight />
            </span>
          </h2>
          <p className="m-0 max-w-[100ch] text-sm font-extralight">
            <b>Introducing the missing digital foundation layer for music. </b>A
            verified ID and information hub for musicmakers, and services.
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
    </>
  );
}
