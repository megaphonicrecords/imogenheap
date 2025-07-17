"use client";

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Modal,
  ModalContent,
  ModalBody,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Newsletter from "./Newsletter";

interface NavigationProps {
  onDrawerToggle: (contentType: "events" | "releases" | "blog") => void;
  isDrawerOpen: boolean;
  drawerContentType: "events" | "releases" | "blog";
}

export default function Navigation({
  onDrawerToggle,
  isDrawerOpen,
  drawerContentType,
}: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isNewsletterOpen, setIsNewsletterOpen] = React.useState(false);
  const pathname = usePathname();

  return (
    <div className="w-full relative z-[30]">
      <Navbar
        maxWidth="full"
        className="mb-3 w-full pl-4 pr-3 bg-transparent"
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
        <NavbarContent className="sm:flex gap-4 sm:gap-5" justify="center">
          <NavbarItem isActive={pathname === "/"}>
            <Image
              src="/imogensite-alt-icon.svg"
              alt="Imogen Heap"
              width={18}
              height={18}
              className="mr-3 sm:mr-4"
            />
            <Link
              color="foreground"
              href="/"
              className={`dotLink text-sm hover:font-normal ${
                pathname === "/" ? "font-normal" : "font-extralight"
              }`}
            >
              Imogen Heap
            </Link>
          </NavbarItem>
          <NavbarItem
            isActive={isDrawerOpen && drawerContentType === "releases"}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDrawerToggle("releases");
              }}
              className={`dotLink text-sm hover:font-normal ${
                isDrawerOpen && drawerContentType === "releases"
                  ? "font-normal"
                  : "font-extralight"
              }`}
            >
              Music
            </button>
          </NavbarItem>
          <NavbarItem isActive={isDrawerOpen && drawerContentType === "events"}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDrawerToggle("events");
              }}
              className={`dotLink text-sm hover:font-normal ${
                isDrawerOpen && drawerContentType === "events"
                  ? "font-normal"
                  : "font-extralight"
              }`}
            >
              Events
            </button>
          </NavbarItem>
          <NavbarItem isActive={isDrawerOpen && drawerContentType === "blog"}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDrawerToggle("blog");
              }}
              className={`dotLink text-sm hover:font-normal ${
                isDrawerOpen && drawerContentType === "blog"
                  ? "font-normal"
                  : "font-extralight"
              }`}
            >
              Blog
            </button>
          </NavbarItem>
          <NavbarItem>
            <button
              onClick={() => setIsNewsletterOpen(true)}
              className="dotLink text-sm font-extralight hover:font-normal"
            >
              Newsletter
            </button>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end" className="gap-4 hidden sm:flex">
          <NavbarItem>
            <Button
              as={Link}
              color="secondary"
              href="#"
              variant="flat"
              className="p-3 gap-2 bg-gradient-to-b from-zinc-800 to-black text-[#D0E321]"
            >
              <Image
                src="/heapsterid-icon.svg"
                alt="HeapsterID"
                width={16}
                height={16}
              />
              Heapster<span className="hidden sm:inline -ml-1">ID</span>
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <Modal
        isOpen={isNewsletterOpen}
        onOpenChange={setIsNewsletterOpen}
        size="2xl"
        scrollBehavior="inside"
        backdrop="blur"
      >
        <ModalContent>
          <ModalBody className="p-0">
            <Newsletter />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
