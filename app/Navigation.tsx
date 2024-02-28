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

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <>
      <Wordmark
        className="mt-6 sm:mt-12 mb-3 lg:max-w-4xl lg:w-full"
        style={{ width: "100%", height: "100%" }}
      />
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
                startContent={<Image width="50" src={Sparks} alt="whydtm" />}
              >
                Sparks
              </DropdownItem>
              <DropdownItem
                key="autoscaling"
                description="2009"
                startContent={<Image width="50" src={Ellipse} alt="whydtm" />}
              >
                Ellipse
              </DropdownItem>
              <DropdownItem
                key="usage_metrics"
                description="2005"
                startContent={
                  <Image width="50" src={SpeakForYourself} alt="whydtm" />
                }
              >
                Speak For Yourself
              </DropdownItem>
              <DropdownItem
                key="usage_metrics"
                description="2002 (with Frou Frou)"
                startContent={<Image width="50" src={Details} alt="whydtm" />}
              >
                Details
              </DropdownItem>
              <DropdownItem
                key="usage_metrics"
                description="1998"
                startContent={
                  <Image width="50" src={IMegaphone} alt="whydtm" />
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
    </>
  );
}
