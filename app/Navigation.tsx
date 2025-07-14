"use client";

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Wordmark from "./InteractiveWordmark.js";
import Ellipse from "../public/images/Ellipse.jpg";
import IMegaphone from "../public/images/IMegaphone.jpg";
import Sparks from "../public/images/Sparks.jpg";
import SpeakForYourself from "../public/images/SpeakForYourself.jpg";
import Details from "../public/images/Details.jpg";

import Image from "next/image";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function Countdown() {
  const [seconds, setSeconds] = React.useState<number | null>(null);

  React.useEffect(() => {
    const targetTime = 1752840000 * 1000; // Convert to milliseconds

    const updateCountdown = (): void => {
      const now = Date.now();
      const difference = targetTime - now;

      if (difference > 0) {
        const totalSeconds = Math.floor(difference / 1000);
        setSeconds(totalSeconds);
      } else {
        setSeconds(0);
      }
    };

    updateCountdown(); // Initial update
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  if (seconds === null) return null;

  return (
    <div className="w-full text-center animate-fadeIn">
      <style jsx>{`
        @font-face {
          font-family: "DotFont";
          src: url("/fonts/dotfont.ttf") format("truetype");
        }
        .countdown-font {
          font-family: "DotFont", monospace;
          line-height: 0.5;
          color: #ff00a4;
        }
      `}</style>
      <div className="countdown-font text-[100px] sm:text-[200px] md:text-[240px] lg:text-[270px]">
        {seconds}
      </div>
    </div>
  );
}

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <>
      <Wordmark
        className="mt-6 sm:mt-12 mb-3 lg:max-w-4xl lg:w-full"
        style={{ width: "100%", height: "100%" }}
      />
      <Countdown />
      {/*
      <Navbar
        maxWidth="full"
        className="lg:max-w-4xl mb-3"
        position="sticky"
        isBlurred={false}
        onMenuOpenChange={setIsMenuOpen}
        classNames={{
          wrapper: ["px-0"],
          item: [
            "flex",
            "relative",
            "h-8",
            "items-center",
            "data-[active=true]:after:content-['']",
            "data-[active=true]:after:absolute",
            "data-[active=true]:after:bottom-0",
            "data-[active=true]:after:left-0",
            "data-[active=true]:after:right-0",
            "data-[active=true]:after:h-[0px]",
            "data-[active=true]:after:rounded-[0px]",
            "data-[active=true]:after:bg-foreground",
          ],
        }}
      >
        <NavbarContent className="sm:flex gap-4" justify="center">
          <NavbarItem isActive={pathname === "/"}>
            <Link
              color="foreground"
              href="/"
              className={`dotLink text-sm hover:font-normal ${
                pathname === "/" ? "font-normal" : "font-extralight"
              }`}
            >
              Home
            </Link>
          </NavbarItem>
          <Dropdown>
            <NavbarItem isActive={pathname === "/releases"}>
              <DropdownTrigger>
                <p
                  color="foreground"
                  className={`dotLink text-sm hover:font-normal hover:cursor-pointer ${
                    pathname === "/releases" ? "font-normal" : "font-extralight"
                  }`}
                >
                  Releases
                </p>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
              aria-label="ACME features"
              className="w-[340px]"
              itemClasses={{
                base: "gap-4",
              }}
            >
              <DropdownItem
                key="autoscaling"
                description="2014"
                startContent={
                  <Image
                    className="rounded-md"
                    width="50"
                    src={Sparks}
                    alt="Sparks"
                  />
                }
              >
                Sparks
              </DropdownItem>
              <DropdownItem
                key="autoscaling"
                description="2009"
                startContent={
                  <Image
                    className="rounded-md"
                    width="50"
                    src={Ellipse}
                    alt="Ellipse"
                  />
                }
              >
                Ellipse
              </DropdownItem>
              <DropdownItem
                key="usage_metrics"
                description="2005"
                startContent={
                  <Image
                    className="rounded-md"
                    width="50"
                    src={SpeakForYourself}
                    alt="Speak For Yourself"
                  />
                }
              >
                Speak For Yourself
              </DropdownItem>
              <DropdownItem
                key="usage_metrics"
                description="2002 (with Frou Frou)"
                startContent={
                  <Image
                    className="rounded-md"
                    width="50"
                    src={Details}
                    alt="whydtm"
                  />
                }
              >
                Details
              </DropdownItem>
              <DropdownItem
                key="usage_metrics"
                description="1998"
                startContent={
                  <Image
                    className="rounded-md"
                    width="50"
                    src={IMegaphone}
                    alt="I Megaphone"
                  />
                }
              >
                I Megaphone
              </DropdownItem>
              <DropdownItem
                key="autoscaling"
                description="View full discography"
              ></DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <NavbarItem isActive={pathname === "/events"}>
            <Link
              color="foreground"
              href="/events"
              className={`dotLink text-sm hover:font-normal ${
                pathname === "/events" ? "font-normal" : "font-extralight"
              }`}
            >
              Events
            </Link>
          </NavbarItem>
          <NavbarItem isActive={pathname === "/blog"}>
            <Link
              color="foreground"
              href="/blog"
              className={`dotLink text-sm hover:font-normal ${
                pathname === "/blog" ? "font-normal" : "font-extralight"
              }`}
            >
              Blog
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem>
            <Button as={Link} color="secondary" href="#" variant="flat">
              Demo AiMogen
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
            */}
    </>
  );
}
