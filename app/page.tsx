"use client";

import Image from "next/image";
import { RxChevronRight } from "react-icons/rx";
import { FaPlay } from "react-icons/fa6";
import { Button, Link } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { TbPhotoPlus } from "react-icons/tb";
import HalftoneDialog from "./components/HalftoneDialog";
import { BiSolidAlbum } from "react-icons/bi";
import { PiButterflyFill } from "react-icons/pi";
import { BiLoaderCircle } from "react-icons/bi";

// TypeScript interface for glowBox data
interface GlowBoxItem {
  href: string;
  icon: string;
  iconAlt: string;
  title: string;
  color: string;
  description: React.ReactNode;
}

// Move targetDate outside components to avoid useEffect dependency warnings
const targetDate = new Date("2025-07-18T18:00:00+01:00");

const LiveBadge = () => {
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const checkLiveStatus = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      const minutesLeft = Math.floor(difference / (1000 * 60));
      setIsLive(minutesLeft <= 60); // Show "Live now" if within 60 minutes
    };

    checkLiveStatus();
    const timer = setInterval(checkLiveStatus, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium text-white backdrop-blur-sm ${
        isLive ? "bg-[#FF00A4]/70" : "bg-black/25"
      }`}
    >
      {isLive ? "Live" : "Preparing…"}
    </div>
  );
};

const CountdownText = () => {
  const [timeLeft, setTimeLeft] = useState<string>("with us...");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft("now");
        return;
      }

      const minutes = Math.floor(difference / (1000 * 60));
      if (minutes < 60) {
        setTimeLeft(`in ${minutes} minute${minutes !== 1 ? "s" : ""}`);
      } else {
        const hours = Math.floor(minutes / 60);
        setTimeLeft(`in ${hours} hour${hours !== 1 ? "s" : ""}`);
      }
    };

    calculateTimeLeft(); // Initial calculation
    const timer = setInterval(calculateTimeLeft, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  return <span>Celebrate live {timeLeft}</span>;
};

// GlowBox data configuration
const glowBoxData: GlowBoxItem[] = [
  {
    href: "https://imogenheap.app",
    icon: "/imogensite-square.png",
    iconAlt: "Heapster App icon",
    title: "Imogen Heap App",
    color: "#333333",
    description: (
      <>
        <b>Be part of the Heapster community.</b> Listen to Imogen&apos;s entire
        discography, unreleased songs, videos, and watch livestreams or chat
        with her directly in the app.
      </>
    ),
  },
  {
    href: "https://mogen.ai",
    icon: "/mogenai-square.png",
    iconAlt: "ai.mogen icon",
    title: "Mogen AI",
    color: "#048AB8",
    description: (
      <>
        <b>Learn about Imogen&apos;s ongoing AI project.</b> Talk to Augmented
        Imogen Heap, help contribute to the AImogen model, and see roadmap of
        its development.
      </>
    ),
  },
  {
    href: "https://imogenheap.com",
    icon: "/heapsterlive-square.png",
    iconAlt: "ai.mogen icon",
    title: "Heapster Live",
    color: "#FF00A4",
    description: (
      <>
        <b>Connect with Heapsters and talk live with Imogen and Mogen.</b> Login
        with your Heapster ID and join the community of fans and likeminded
        people. Launching later today.
      </>
    ),
  },
  {
    href: "https://endlesss.fm",
    icon: "/endlesss-icon.png",
    iconAlt: "Megaphonic Records icon",
    title: "Endlesss",
    color: "#000000",
    description: (
      <>
        <b>The online multiplayer loop station.</b> An innovative workflow
        perfect for generating ideas. Play solo or jam together online. Recently
        aquired by Imogen&apos;s music lab, HabLab London.
      </>
    ),
  },
  {
    href: "https://mimugloves.com",
    icon: "/mimu-icon.png",
    iconAlt: "MiMu icon",
    title: "MiMu Gloves",
    color: "#2CA2A5",
    description: (
      <>
        <b>Check out Imogen&apos;s magical gloves.</b> Music through movement.
        Learn about the world&apos;s most advanced and innovative wearable
        musical instrument.
      </>
    ),
  },
  {
    href: "https://id.auracles.io",
    icon: "/auracles-icon.png",
    iconAlt: "Auracles icon",
    title: "Auracles",
    color: "#632ce7",
    description: (
      <>
        <b>The missing foundational data layer for music. </b>
        Enabling musicmakers & representatives to create a verified digital ID,
        streamline their data, and grant permissions for works.
      </>
    ),
  },
];

// AnimatedText component for character-by-character animation within words
const AnimatedText = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  const words = text.split(" ");

  return (
    <div className={`${className} break-words`}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block">
          {word.split("").map((char, charIndex) => {
            const globalIndex =
              words.slice(0, wordIndex).join(" ").length +
              wordIndex +
              charIndex;

            return (
              <motion.span
                key={charIndex}
                initial={{ opacity: 0, filter: "blur(2px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{
                  duration: 0.4,
                  delay: globalIndex * 0.02,
                  ease: "easeOut",
                }}
                className="inline-block"
              >
                {char}
              </motion.span>
            );
          })}
          {wordIndex < words.length - 1 && "\u00A0"}
        </span>
      ))}
    </div>
  );
};

export default function Home() {
  const [isHalftoneOpen, setIsHalftoneOpen] = useState(false);

  return (
    <>
      <h1 className="text-sm text-left mb-4 mt-8 font-bold">
        Announcing: Speak for Yourself (20th Anniversary Remaster)
      </h1>
      <div className="w-full mb-4 sm:mb-8">
        <Image
          src="/images/hero.jpg"
          alt="Speak for Yourself (20th Anniversary Remaster)"
          className="w-full rounded-xl border border-black/20"
          width={1000}
          height={1000}
          unoptimized
        />
        <p className="mt-4 text-sm text-left w-fit bg-gradient-to-r from-[rgba(255,0,164,0.25)] to-transparent">
          Preorder the limited edition 2×LP
        </p>
        <p className="text-left font-light text-sm mt-4">
          Two coloured variants pressed on 45rpm double vinyl, protected by
          polylined inner sleeves. Packaged in a spot UV gatefold jacket with
          lyrics, poster, and redeemable digital Heapster badge. The 20th
          anniversary remaster is avaliable for preorder now via Imogen
          Heap&apos;s new shop, and will be rolling out to retail stores
          worldwide in the coming days.
        </p>
      </div>
      <div className="flex gap-2 mb-8 w-full justify-center">
        <Button
          as={Link}
          href="https://shop.imogenheap.com"
          variant="flat"
          className="gap-2 bg-black/25 hover:bg-black/20 transition-colors duration-300 text-black"
        >
          <BiSolidAlbum size={18} /> PREORDER 180G BLACK
        </Button>
        <Button
          as={Link}
          color="secondary"
          href="https://shop.imogenheap.com"
          variant="flat"
          className="gap-2"
        >
          <PiButterflyFill size={18} />
          PREORDER CMYK Splatter
        </Button>
      </div>
      <div className="text-sm text-left font-bold border-t-1 border-black border-dotted pt-4 mt-16 mb-14 opacity-25"></div>

      <div className="flex gap-2 w-full justify-center">
        <div className="max-w-full">
          <AnimatedText
            text="Today marks 20 years since something that truly changed my life, and maybe yours too. To celebrate this milestone, I am releasing an anniversary vinyl of my record Speak for Yourself you can now pre-order. This limited pressing will be mailed out in October which is also when I will finally have all the publishing rights back! Hooray!"
            className="text-2xl text-left font-bold font-immi text-black/20"
          />
        </div>
      </div>
      <div className="text-sm text-left font-bold border-t-1 border-black border-dotted pt-4 mt-16 mb-14 opacity-25"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        <div>
          <div className="relative w-full group">
            <video
              className="w-full rounded-xl border border-black/20"
              controls={false}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
            >
              <source src="/videos/sfy-loader.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <LiveBadge />
            <motion.div
              className="absolute inset-0 flex items-center justify-center cursor-pointer"
              whileHover="hover"
              whileTap="tap"
              initial="initial"
              animate="animate"
            >
              <motion.div
                variants={{
                  initial: { scale: 0.98 },
                  animate: {
                    scale: 1,
                    transition: { duration: 0.3 },
                  },
                  hover: {
                    scale: 1.1,
                    transition: {
                      type: "spring",
                      stiffness: 400,
                      damping: 10,
                    },
                  },
                  tap: {
                    scale: 0.98,
                    transition: { duration: 0.1 },
                  },
                }}
                className="bg-[#FF00A4]/50 hover:bg-[#FF00A4] transition-colors duration-300 text-white w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-sm"
              >
                <motion.div
                  variants={{
                    initial: { scale: 1 },
                    hover: {
                      scale: 1.1,
                      transition: {
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 1,
                      },
                    },
                  }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <BiLoaderCircle size={24} />
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
          <p className="mt-4 text-sm text-left w-fit bg-gradient-to-r from-[rgba(255,0,164,0.25)] to-transparent">
            <CountdownText />
          </p>
          <p className="text-left font-light text-sm mt-4">
            To celebrate the 20th anniversary, Imogen will be streaming across
            all platforms, and you can chat in a virtual room with her;
            exclusive to the new Heapster Live platform launching today. Sign up
            now to join at 6pm UK.
          </p>
        </div>

        <div className="relative w-full">
          <div className="relative w-full group">
            <Image
              src="/images/chat-still.jpg"
              alt="Speak for Yourself (20th Anniversary Remaster)"
              className="w-full h-full object-cover rounded-xl border border-black/20"
              width={1000}
              height={1000}
            />
            <motion.a
              href="http://sfy20.com/remasteringhideandseek"
              className="absolute inset-0 flex items-center justify-center"
              target="_blank"
              rel="noopener noreferrer"
              whileHover="hover"
              whileTap="tap"
              initial="initial"
              animate="animate"
            >
              <motion.div
                variants={{
                  initial: { scale: 0.98 },
                  animate: {
                    scale: 1,
                    transition: { duration: 0.3 },
                  },
                  hover: {
                    scale: 1.1,
                    transition: {
                      type: "spring",
                      stiffness: 400,
                      damping: 10,
                    },
                  },
                  tap: {
                    scale: 0.98,
                    transition: { duration: 0.1 },
                  },
                }}
                className="bg-[#D1E322]/50 hover:bg-[#D1E322] transition-colors duration-300 text-white w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-sm"
              >
                <motion.div
                  variants={{
                    initial: { scale: 1 },
                    hover: {
                      scale: 1.1,
                      transition: {
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 1,
                      },
                    },
                  }}
                >
                  <FaPlay className="ml-1" size={24} />
                </motion.div>
              </motion.div>
            </motion.a>
          </div>
          <p className="mt-4 text-sm text-left w-fit bg-gradient-to-r from-[rgba(255,0,164,0.25)] to-transparent">
            &apos;Speak for Yourself&apos; remastering discussion
          </p>
          <p className="text-left font-light text-sm mt-4">
            Watch a clip from when Imogen sat down with Simon Heyworth, who
            worked on the original album 20 years ago. They chat about the
            creative process behind the new remastered versions.
          </p>
        </div>

        <div className="relative w-full">
          <div className="relative w-full group">
            <video
              className="w-full rounded-xl border border-black/20"
              controls={false}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
            >
              <source src="/videos/hide-and-seek.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <motion.a
              href="https://sfy20.com/hideandseek"
              className="absolute inset-0 flex items-center justify-center"
              target="_blank"
              rel="noopener noreferrer"
              whileHover="hover"
              whileTap="tap"
              initial="initial"
              animate="animate"
            >
              <motion.div
                variants={{
                  initial: { scale: 0.98 },
                  animate: {
                    scale: 1,
                    transition: { duration: 0.3 },
                  },
                  hover: {
                    scale: 1.1,
                    transition: {
                      type: "spring",
                      stiffness: 400,
                      damping: 10,
                    },
                  },
                  tap: {
                    scale: 0.98,
                    transition: { duration: 0.1 },
                  },
                }}
                className="bg-[#0091C0]/70 hover:bg-[#0091C0] transition-colors duration-300 text-white w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-sm"
              >
                <motion.div
                  variants={{
                    initial: { scale: 1 },
                    hover: {
                      scale: 1.1,
                      transition: {
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 1,
                      },
                    },
                  }}
                >
                  <FaPlay className="ml-1" size={24} />
                </motion.div>
              </motion.div>
            </motion.a>
          </div>

          <p className="mt-4 text-sm text-left w-fit bg-gradient-to-r from-[rgba(255,0,164,0.25)] to-transparent">
            Hide and Seek (Dolby Atmos)
          </p>
          <p className="text-left font-light text-sm mt-4">
            Listen to the brand new Dolby Atmos mix of &apos;Hide and
            Seek&apos;, exclusive to Apple Music. The stereo remaster is also
            available on all other music platforms.
          </p>
        </div>
        <div className="relative w-full">
          <div className="relative w-full group">
            <Image
              src="/images/compare.jpg"
              alt="Speak for Yourself (20th Anniversary Remaster)"
              className="w-full h-full object-cover rounded-xl border border-black/20"
              width={1000}
              height={1000}
              unoptimized
            />
            <motion.button
              onClick={() => setIsHalftoneOpen(true)}
              className="absolute inset-0 flex items-center justify-center"
              whileHover="hover"
              whileTap="tap"
              initial="initial"
              animate="animate"
            >
              <motion.div
                variants={{
                  initial: { scale: 0.98 },
                  animate: {
                    scale: 1,
                    transition: { duration: 0.3 },
                  },
                  hover: {
                    scale: 1.1,
                    transition: {
                      type: "spring",
                      stiffness: 400,
                      damping: 10,
                    },
                  },
                  tap: {
                    scale: 0.98,
                    transition: { duration: 0.1 },
                  },
                }}
                className="bg-black/50 hover:bg-black transition-colors duration-300 text-white w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-sm"
              >
                <motion.div
                  variants={{
                    initial: { scale: 1 },
                    hover: {
                      scale: 1.1,
                      transition: {
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 1,
                      },
                    },
                  }}
                >
                  <TbPhotoPlus className="ml-1" size={24} />
                </motion.div>
              </motion.div>
            </motion.button>
          </div>

          <p className="mt-4 text-sm text-left w-fit bg-gradient-to-r from-[rgba(255,0,164,0.25)] to-transparent">
            Make your own artwork
          </p>
          <p className="text-left font-light text-sm mt-4">
            Use the web editor to make your own &apos;Speak For Yourself&apos;
            style artwork to celebrate. Share your creations with the #SFY20
            hashtag.
          </p>
        </div>
      </div>

      <div className="text-sm text-left font-bold border-t-1 border-black border-dotted pt-4 mt-16 mb-14 opacity-25"></div>
      <div className="grid lg:max-w-4xl lg:w-full md:grid-cols-2 lg:grid-cols-3 text-left">
        {glowBoxData.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className="group glowBox"
            style={
              {
                "--shadow-color": item.color,
                "--text-color": item.color,
              } as React.CSSProperties & {
                "--shadow-color": string;
                "--text-color": string;
              }
            }
            rel="noopener noreferrer"
          >
            <h2 className="mb-3 text-sm font-semibold">
              <Image
                src={item.icon}
                alt={item.iconAlt}
                className="rounded-lg inline-block mr-2"
                width={30}
                height={30}
              />
              <span style={{ color: "var(--text-color)" }}>{item.title}</span>
              <span
                className="ml-1 align-middle inline-block transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none"
                style={{ color: "var(--text-color)" }}
              >
                <RxChevronRight />
              </span>
            </h2>
            <p className="m-0 max-w-[100ch] text-sm font-light">
              {item.description}
            </p>
          </a>
        ))}
      </div>
      <div className="text-sm text-left font-bold border-t-1 border-black border-dotted pt-4 mt-16 opacity-25"></div>
      <HalftoneDialog
        isOpen={isHalftoneOpen}
        onOpenChange={setIsHalftoneOpen}
      />
    </>
  );
}
