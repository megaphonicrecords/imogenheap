"use client";

import React from "react";
import {
  Textarea,
  Link,
  Checkbox,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import {
  FaSquareFacebook,
  FaXTwitter,
  FaBandcamp,
  FaSquareYoutube,
  FaInstagram,
  FaSpotify,
} from "react-icons/fa6";
import { SiApplemusic } from "react-icons/si";
import { BsPassportFill } from "react-icons/bs";
import { RxEnvelopeClosed, RxPencil2 } from "react-icons/rx";

const Footer = () => {
  const {
    isOpen: isPrivacyModalOpen,
    onOpen: onPrivacyModalOpen,
    onClose: onPrivacyModalClose,
  } = useDisclosure();
  const {
    isOpen: isContactModalOpen,
    onOpen: onContactModalOpen,
    onClose: onContactModalClose,
  } = useDisclosure();

  const currentYear = new Date().getFullYear();
  return (
    <footer className="py-8 text-center">
      <div className="container mx-auto flex gap-x-2 justify-center items-center text-zinc-600">
        <a
          href="https://www.facebook.com/imogenheap"
          rel="noopener noreferrer"
          className="hover:text-white"
        >
          <FaSquareFacebook />
        </a>
        <a
          href="https://www.instagram.com/imogenheap/"
          rel="noopener noreferrer"
          className="hover:text-white"
        >
          <FaInstagram />
        </a>
        <a
          href="https://twitter.com/imogenheap"
          rel="noopener noreferrer"
          className="hover:text-white"
        >
          <FaXTwitter />
        </a>
        <a
          href="https://www.youtube.com/imogenheap"
          rel="noopener noreferrer"
          className="hover:text-white"
        >
          <FaSquareYoutube />
        </a>
        <a
          href="https://open.spotify.com/artist/6Xb4ezwoAQC4516kI89nWz"
          rel="noopener noreferrer"
          className="hover:text-white"
        >
          <FaSpotify />
        </a>
        <a
          href="https://music.apple.com/gb/artist/imogen-heap/22873602"
          rel="noopener noreferrer"
          className="hover:text-white"
        >
          <SiApplemusic />
        </a>
        <a
          href="https://imogenheap.bandcamp.com"
          rel="noopener noreferrer"
          className="hover:text-white"
        >
          <FaBandcamp />
        </a>
        <a
          href="https://prerelease.creativepassport.net/page/6113890d-f6db-4b4d-838a-f811d60f4409/977a55e6-6e35-4dab-9400-923626f06545"
          rel="noopener noreferrer"
          className="hover:text-white"
        >
          <BsPassportFill />
        </a>
      </div>
      <div className="container mx-auto mt-4">
        <Link
          onPress={onPrivacyModalOpen}
          className="text-white mr-4 text-sm font-extralight hover:font-normal dotLink cursor-pointer"
        >
          Privacy & Terms
        </Link>
        <Link
          onPress={onContactModalOpen}
          className="text-white text-sm font-extralight hover:font-normal dotLink cursor-pointer"
        >
          Contact
        </Link>
      </div>
      <div className="container mx-auto mt-4">
        <p className="text-zinc-600 text-center text-sm font-light">
          &copy; {currentYear} Megaphonic
        </p>
      </div>

      <>
        <Modal
          isOpen={isPrivacyModalOpen}
          onClose={onPrivacyModalClose}
          scrollBehavior="outside"
        >
          <ModalContent>
            {(onClose) => (
              <div className="text-sm">
                <ModalHeader className="flex flex-col gap-1 text-sm">
                  Privacy Policy and Terms of Use
                </ModalHeader>
                <ModalBody>
                  <h2 className="font-semibold">1. Terms</h2>
                  <p className="font-extralight">
                    By accessing this web site, you are agreeing to be bound by
                    these web site Terms and Conditions of Use, all applicable
                    laws and regulations, and agree that you are responsible for
                    compliance with any applicable local laws. If you do not
                    agree with any of these terms, you are prohibited from using
                    or accessing this site. The materials contained in this web
                    site are protected by applicable copyright and trade mark
                    law.
                  </p>
                  <h2 className="font-semibold">2. Use License</h2>
                  <p className="font-extralight">
                    a. Permission is granted to temporarily download one copy of
                    the materials (information or software) on Megaphonic
                    Ltd&#39;s web site for personal, non-commercial transitory
                    viewing only. This is the grant of a license, not a transfer
                    of title, and under this license you may not:
                  </p>
                  <ul className="font-extralight list-roman list-outside pl-10">
                    <li>modify or copy the materials;</li>
                    <li>
                      use the materials for any commercial purpose, or for any
                      public display (commercial or non-commercial);
                    </li>
                    <li>
                      attempt to decompile or reverse engineer any software
                      contained on Megaphonic Ltd&#39;s web site;
                    </li>
                    <li>
                      remove any copyright or other proprietary notations from
                      the materials; or
                    </li>
                    <li>
                      transfer the materials to another person or
                      &quot;mirror&quot; the materials on any other server.
                    </li>
                  </ul>
                  <p className="font-extralight">
                    b. This license shall automatically terminate if you violate
                    any of these restrictions and may be terminated by
                    Megaphonic Ltd at any time. Upon terminating your viewing of
                    these materials or upon the termination of this license, you
                    must destroy any downloaded materials in your possession
                    whether in electronic or printed format.
                  </p>
                </ModalBody>
              </div>
            )}
          </ModalContent>
        </Modal>
        <Modal
          isOpen={isContactModalOpen}
          onClose={onContactModalClose}
          placement="top-center"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 text-sm">
                  Contact
                </ModalHeader>
                <ModalBody>
                  <Input
                    className="font-extralight"
                    autoFocus
                    label="Email"
                    variant="bordered"
                  />
                  <Textarea
                    label="Message"
                    variant="bordered"
                    className="font-extralight"
                  />
                  <p className="flex flex-col gap-1 text-sm font-extralight">
                    Your message will be sent automatically to the relevant
                    team. Alternatively, you can email info@imogenheap.com.
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Send
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    </footer>
  );
};

export default Footer;
