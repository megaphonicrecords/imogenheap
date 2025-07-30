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
          className="hover:text-foreground"
        >
          <FaSquareFacebook />
        </a>
        <a
          href="https://www.instagram.com/imogenheap/"
          rel="noopener noreferrer"
          className="hover:text-foreground"
        >
          <FaInstagram />
        </a>
        <a
          href="https://twitter.com/imogenheap"
          rel="noopener noreferrer"
          className="hover:text-foreground"
        >
          <FaXTwitter />
        </a>
        <a
          href="https://www.youtube.com/imogenheap"
          rel="noopener noreferrer"
          className="hover:text-foreground"
        >
          <FaSquareYoutube />
        </a>
        <a
          href="https://open.spotify.com/artist/6Xb4ezwoAQC4516kI89nWz"
          rel="noopener noreferrer"
          className="hover:text-foreground"
        >
          <FaSpotify />
        </a>
        <a
          href="https://music.apple.com/gb/artist/imogen-heap/22873602"
          rel="noopener noreferrer"
          className="hover:text-foreground"
        >
          <SiApplemusic />
        </a>
        <a
          href="https://imogenheap.bandcamp.com"
          rel="noopener noreferrer"
          className="hover:text-foreground"
        >
          <FaBandcamp />
        </a>
        <a
          href="https://id.auracles.io/page/6113890d-f6db-4b4d-838a-f811d60f4409/977a55e6-6e35-4dab-9400-923626f06545"
          rel="noopener noreferrer"
          className="hover:text-foreground"
        >
          <BsPassportFill />
        </a>
      </div>
      <div className="container mx-auto mt-4">
        <span className="text-zinc-600 text-center text-sm font-light mr-2">
          &copy; {currentYear}{" "}
          <Link
            href="https://megaphonicrecords.com/"
            className="text-zinc-600 text-sm font-light hover:font-normal dotLink cursor-pointer"
          >
            Megaphonic
          </Link>
          . Website powered by{" "}
          <Link
            href="https://auracles.io"
            className="text-zinc-600 text-sm font-light hover:font-normal dotLink cursor-pointer"
          >
            Auracles
          </Link>
          .
        </span>
        <Link
          onPress={onPrivacyModalOpen}
          className="text-zinc-600 mr-3 text-sm font-light hover:font-normal dotLink cursor-pointer"
        >
          Privacy & Terms
        </Link>
        <Link
          onPress={onContactModalOpen}
          className="text-zinc-600 text-sm font-light hover:font-normal dotLink cursor-pointer"
        >
          Contact
        </Link>
      </div>
      <>
        <Modal
          isOpen={isPrivacyModalOpen}
          onClose={onPrivacyModalClose}
          scrollBehavior="outside"
        >
          <ModalContent className="pt-1 pb-3">
            {(onClose) => (
              <div className="text-sm">
                <ModalHeader className="flex flex-col gap-1 text-sm">
                  Privacy Policy
                </ModalHeader>
                <ModalBody>
                  <p className="font-extralight">
                    This privacy policy has been compiled to better serve those
                    who are concerned with how their &#39;Personally
                    identifiable information&#39; (PII) is being used online.
                    PII, as used in US privacy law and information security, is
                    information that can be used on its own or with other
                    information to identify, contact, or locate a single person,
                    or to identify an individual in context. Please read our
                    privacy policy carefully to get a clear understanding of how
                    we collect, use, protect or otherwise handle your Personally
                    Identifiable Information in accordance with our website.
                  </p>
                  <h2 className="font-semibold">1. Data We Collect</h2>
                  <p className="font-extralight">
                    When ordering or registering on our site, as appropriate,
                    you may be asked to enter your name, email address or other
                    details to help you with your experience.
                  </p>
                  <h2 className="font-semibold">2. When We Collect Data</h2>
                  <p className="font-extralight">
                    We collect information from you when you register on our
                    site, fill out a form or enter information on our site.
                  </p>
                  <h2 className="font-semibold">3. How We Use Data</h2>
                  <p className="font-extralight">
                    We may use the information we collect from you when you
                    register, make a purchase, sign up for our newsletter,
                    respond to a survey or marketing communication, surf the
                    website, or use certain other site features in the following
                    ways:
                  </p>
                  <ul className="font-extralight list-disc list-outside pl-10">
                    <li>
                      To personalize user&#39;s experience and to allow us to
                      deliver the type of content and product offerings in which
                      you are most interested.
                    </li>
                    <li>
                      To improve our website in order to better serve you.
                    </li>
                    <li>
                      To send periodic emails regarding your order or other
                      products and services.
                    </li>
                  </ul>
                  <h2 className="font-semibold">4. How We Protect Your Data</h2>
                  <p className="font-extralight">
                    The information we collect is low level and we use basic
                    protection methods.
                  </p>
                  <h2 className="font-semibold">5. Use of Cookies</h2>
                  <p className="font-extralight">
                    Cookies are small files that a site or its service provider
                    transfers to your computer&#39;s hard drive through your Web
                    browser (if you allow) that enables the site&#39;s or
                    service provider&#39;s systems to recognize your browser and
                    capture and remember certain information. For instance, we
                    use cookies to help us remember and process the items in
                    your shopping cart. They are also used to help us understand
                    your preferences based on previous or current site activity,
                    which enables us to provide you with improved services. We
                    also use cookies to help us compile aggregate data about
                    site traffic and site interaction so that we can offer
                    better site experiences and tools in the future.
                  </p>
                  <p className="font-extralight">We use cookies to:</p>
                  <ul className="font-extralight list-disc list-outside pl-10">
                    <li>
                      Understand and save user&#39;s preferences for future
                      visits.
                    </li>
                    <li>
                      Compile aggregate data about site traffic and site
                      interactions in order to offer better site experiences and
                      tools in the future. We may also use trusted third party
                      services that track this information on our behalf.
                    </li>
                  </ul>
                  <p className="font-extralight">
                    You can choose to have your computer warn you each time a
                    cookie is being sent, or you can choose to turn off all
                    cookies. You do this through your browser (like Internet
                    Explorer) settings. Each browser is a little different, so
                    look at your browser&#39;s Help menu to learn the correct
                    way to modify your cookies.
                  </p>
                  <p className="font-extralight">
                    If you disable cookies off, some features will be disabled
                    It will turn off some of the features that make your site
                    experience more efficient and some of our services will not
                    function properly. Any personalised experience, such as
                    creating or interacting with content will be disabled.
                  </p>
                  <h2 className="font-semibold">6. Third Party Disclosure</h2>
                  <p className="font-extralight">
                    We do not sell, trade, or otherwise transfer to outside
                    parties your personally identifiable information unless we
                    provide you with advance notice. This does not include
                    website hosting partners and other parties who assist us in
                    operating our website, conducting our business, or servicing
                    you, so long as those parties agree to keep this information
                    confidential. We may also release your information when we
                    believe release is appropriate to comply with the law,
                    enforce our site policies, or protect ours or others&#39;
                    rights, property, or safety.
                  </p>
                  <p className="font-extralight">
                    However, non-personally identifiable visitor information may
                    be provided to other parties for marketing, advertising, or
                    other uses.
                  </p>
                  <p className="font-extralight">
                    Occasionally, at our discretion, we may include or offer
                    third party products or services on our website. These third
                    party sites have separate and independent privacy policies.
                    We therefore have no responsibility or liability for the
                    content and activities of these linked sites. Nonetheless,
                    we seek to protect the integrity of our site and welcome any
                    feedback about these sites.
                  </p>
                  <h1 className="font-semibold mb-3">Terms of Use</h1>

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
                  <h2 className="font-semibold">3. Disclaimer</h2>
                  <p className="font-extralight">
                    The materials on Megaphonic Ltd&#39;s web site are provided
                    &quot;as is&quot;. Megaphonic Ltd makes no warranties,
                    expressed or implied, and hereby disclaims and negates all
                    other warranties, including without limitation, implied
                    warranties or conditions of merchantability, fitness for a
                    particular purpose, or non-infringement of intellectual
                    property or other violation of rights. Further, Megaphonic
                    Ltd does not warrant or make any representations concerning
                    the accuracy, likely results, or reliability of the use of
                    the materials on its Internet web site or otherwise relating
                    to such materials or on any sites linked to this site.
                  </p>
                  <h2 className="font-semibold">4. Limitations</h2>
                  <p className="font-extralight">
                    In no event shall Megaphonic Ltd or its suppliers be liable
                    for any damages (including, without limitation, damages for
                    loss of data or profit, or due to business interruption,)
                    arising out of the use or inability to use the materials on
                    Megaphonic Ltd&#39;s Internet site, even if Megaphonic Ltd
                    or a Megaphonic Ltd authorized representative has been
                    notified orally or in writing of the possibility of such
                    damage. Because some jurisdictions do not allow limitations
                    on implied warranties, or limitations of liability for
                    consequential or incidental damages, these limitations may
                    not apply to you.
                  </p>
                  <h2 className="font-semibold">5. Revisions and Errata</h2>
                  <p className="font-extralight">
                    The materials appearing on Megaphonic Ltd&#39;s web site
                    could include technical, typographical, or photographic
                    errors. Megaphonic Ltd does not warrant that any of the
                    materials on its web site are accurate, complete, or
                    current. Megaphonic Ltd may make changes to the materials
                    contained on its web site at any time without notice.
                    Megaphonic Ltd does not, however, make any commitment to
                    update the materials.
                  </p>
                  <h2 className="font-semibold">6. Links</h2>
                  <p className="font-extralight">
                    Megaphonic Ltd has not reviewed all of the sites linked to
                    its Internet web site and is not responsible for the
                    contents of any such linked site. The inclusion of any link
                    does not imply endorsement by Megaphonic Ltd of the site.
                    Use of any such linked web site is at the user&#39;s own
                    risk.
                  </p>
                  <h2 className="font-semibold">
                    7. Site Terms of Use Modifications
                  </h2>
                  <p className="font-extralight">
                    Megaphonic Ltd may revise these terms of use for its web
                    site at any time without notice. By using this web site you
                    are agreeing to be bound by the then current version of
                    these Terms and Conditions of Use.
                  </p>
                  <h2 className="font-semibold">8. Governing Law</h2>
                  <p className="font-extralight">
                    Any claim relating to Megaphonic Ltd&#39;s web site shall be
                    governed by the laws of the United Kingdom without regard to
                    its conflict of law provisions.
                  </p>
                  <p className="font-extralight">
                    General Terms and Conditions applicable to Use of a Web
                    Site.
                  </p>
                </ModalBody>
              </div>
            )}
          </ModalContent>
        </Modal>
        <Modal
          isOpen={isContactModalOpen}
          onClose={onContactModalClose}
          placement="center"
        >
          <ModalContent className="pt-1 pb-2">
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1 text-sm">
                  Contact
                </ModalHeader>
                <ModalBody>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-sm">Artist</h3>
                      <p className="text-sm font-extralight">
                        info@imogenheap.com
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-sm">Label</h3>
                      <p className="text-sm font-extralight">
                        label@megaphonicrecords.com
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-sm">Distributor</h3>
                      <p className="text-sm font-extralight">
                        kevinhopper@symdistro.com
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-sm">Press US</h3>
                      <p className="text-sm font-extralight">
                        sarah.avrin@charmschoolmedia.com
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-sm">Press UK</h3>
                      <p className="text-sm font-extralight">
                        media@megaphonicrecords.com
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-sm">Website</h3>
                      <p className="text-sm font-extralight">
                        jacob@imogenheap.com
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-sm">Webshop</h3>
                      <p className="text-sm font-extralight">
                        support@ochre.store
                      </p>
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="secondary" variant="flat" onPress={onClose}>
                    Close
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
