"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description?: string;
  externalUrl?: string;
}

interface Release {
  id: string;
  title: string;
  date: string;
  imageUrl: string;
  description?: string;
  externalUrl?: string;
}

interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  externalUrl?: string;
}

type ContentType = "events" | "releases" | "blog";

interface ContentDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  contentType: ContentType;
}

// Mock data - replace with real data later
const mockEvents: Event[] = [
  {
    id: "1",
    title: "Speak For Yourself 20th Anniversary Celebration",
    date: "2024-07-18",
    location: "Online",
    description: "Live stream, Q&A, and performance.",
    externalUrl: "http://heapster.live",
  },
  {
    id: "2",
    title: "Artistry in the Age of AI: Protecting Music's Integrity",
    date: "2024-06-05",
    location: "SXSW London, UK",
    description:
      "As AI reshapes music creation, how do we protect artists and their artistry? Visionary artist, producer, and technologist Imogen Heap joins Jen Co-Founder & CEO Shara Senderoff for a timely conversation on ethical AI, artist consent, and the future of human-AI collaboration.",
    externalUrl: "https://www.sxsw.com/london",
  },
  {
    id: "3",
    title: "Convos & Collabs #4",
    date: "2024-05-08",
    location: "Online",
    description:
      "Join Imogen Heap in conversation with special guests, and be part of some live songwriting & jams.",
    externalUrl: "https://youtube.com/live/UnmeDghre10?feature=share",
  },
  {
    id: "4",
    title: "Convos & Collabs #3",
    date: "2024-04-24",
    location: "Online",
    description:
      "Join Imogen Heap in conversation with special guests, and be part of some live songwriting & jams.",
    externalUrl: "https://youtube.com/live/_qBCU24WWRI?feature=share",
  },
  {
    id: "5",
    title: "Convos & Collabs #2",
    date: "2024-03-19",
    location: "Online",
    description:
      "Join Imogen Heap in conversation with special guests, and be part of some live songwriting & jams.",
    externalUrl: "https://youtube.com/live/5pHorKADrXQ?feature=share",
  },
  {
    id: "6",
    title: "Convos & Collabs #1",
    date: "2024-02-13",
    location: "Online",
    description:
      "Join Imogen Heap in conversation with special guests, and be part of some live songwriting & jams.",
    externalUrl: "https://youtube.com/live/hdWGL9BB6tA?feature=share",
  },
  {
    id: "7",
    title: "Auracles Public Launch",
    date: "2024-12-10",
    location: "London, UK",
    description:
      "Imogen heap has just announced Auracles - a digital foundation platform for music with a verified digital ID.",
    externalUrl: "https://auracles.io",
  },
];

const mockReleases: Release[] = [
  {
    id: "1",
    title: "Sparks",
    date: "2014-03-17",
    imageUrl: "/images/Sparks.jpg",
    externalUrl: "https://ffm.to/ih-sparks",
  },
  {
    id: "2",
    title: "Ellipse",
    date: "2009-09-14",
    imageUrl: "/images/Ellipse.jpg",
    externalUrl: "https://ffm.to/ih-ellipse",
  },
  {
    id: "3",
    title: "Speak For Yourself",
    date: "2005-11-14",
    imageUrl: "/images/SpeakForYourself.jpg",
    externalUrl: "https://ffm.to/sfy",
  },
  {
    id: "4",
    title: "Details",
    date: "2002-06-04",
    imageUrl: "/images/Details.jpg",
    description: "Album with Frou Frou",
    externalUrl: "https://ffm.to/ffdetails20",
  },
  {
    id: "5",
    title: "I Megaphone",
    date: "1998-06-15",
    imageUrl: "/images/IMegaphone.jpg",
    externalUrl: "https://open.spotify.com/album/2bYyPYh0MtqXpQzFy5SrFN",
  },
];

const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The invisible made visible.",
    date: "2025-05-30",
    excerpt:
      "A shared framework for AI attribution, fingerprinting & future permissions.",
    externalUrl: "https://auracles.io/auracles-blog-2.pdf",
  },
  {
    id: "1",
    title: "Act now, before AI acts up!",
    date: "2025-03-07",
    excerpt:
      "Are you opt-in or out? The greatest collaboration of all time — featuring ALL of us.",
    externalUrl:
      "https://medium.com/@imogenheap/act-now-before-ai-acts-up-e5cb3a6a610a",
  },
];

export default function ContentDrawer({
  isOpen,
  onClose,
  contentType,
}: ContentDrawerProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftFade, setShowLeftFade] = useState(false);
  const [showRightFade, setShowRightFade] = useState(false);

  const checkScrollPosition = () => {
    if (!scrollContainerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;

    // Show left fade if scrolled to the right (content hidden on left)
    setShowLeftFade(scrollLeft > 0);

    // Show right fade if there's more content to scroll to the right
    setShowRightFade(scrollLeft < scrollWidth - clientWidth);
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    // Check initial position
    checkScrollPosition();

    // Add scroll listener
    scrollContainer.addEventListener("scroll", checkScrollPosition);

    // Check on resize as well
    const handleResize = () => checkScrollPosition();
    window.addEventListener("resize", handleResize);

    return () => {
      scrollContainer.removeEventListener("scroll", checkScrollPosition);
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen]);

  const renderContent = () => {
    switch (contentType) {
      case "releases":
        return mockReleases.map((release) => (
          <motion.div
            key={release.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white/10 border-black border-4 hover:border-4 hover:ring-1 hover:ring-white/50 rounded-xl p-3 flex-shrink-0 w-64 h-full cursor-pointer relative overflow-hidden"
            onClick={() =>
              release.externalUrl && window.open(release.externalUrl, "_blank")
            }
          >
            <div
              className="absolute inset-0 z-0"
              style={{
                backgroundImage: `url(${release.imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter:
                  "blur(20px) brightness(0.2) contrast(0.8) saturate(200%)",
                transform: "scale(1.2)",
              }}
            />
            <div className="flex flex-row gap-3 h-full relative z-10">
              <Image
                src={release.imageUrl}
                alt={release.title}
                width={200}
                height={200}
                className="rounded-md h-[100px] w-[100px] object-cover"
              />
              <div>
                <h3 className="text-sm font-normal text-white mb-1">
                  {release.title}
                </h3>
                <p
                  className={`font-mono text-xs ${
                    new Date(release.date) > new Date()
                      ? "text-[#ff00a4]"
                      : "text-white opacity-50"
                  }`}
                >
                  {new Date(release.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                {release.description && (
                  <p className="text-white opacity-50 text-xs mt-1">
                    {release.description}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        ));

      case "events":
        return mockEvents.map((event) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white/10 border-black border-4 hover:border-4 hover:ring-1 hover:ring-white/50 rounded-xl p-3 flex-shrink-0 w-64 h-full cursor-pointer"
            onClick={() =>
              event.externalUrl && window.open(event.externalUrl, "_blank")
            }
          >
            <div className="flex flex-col gap-2 h-full">
              <div className="flex flex-row justify-between">
                <h3 className="text-sm font-bold text-white mb-1">
                  {event.location}
                </h3>
                <p
                  className={`text-sm font-base ${
                    new Date(event.date) > new Date()
                      ? "text-[#FF00A4]"
                      : "text-white opacity-50"
                  }`}
                >
                  {new Date(event.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
              <p className="text-white text-sm font-base">{event.title}</p>
              <p className="text-white opacity-50 text-xs line-clamp-3 text-ellipsis">
                {event.description}
              </p>
            </div>
          </motion.div>
        ));

      case "blog":
        return mockBlogPosts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white/10 border-black border-4 hover:border-4 hover:ring-1 hover:ring-white/50 rounded-xl p-3 flex-shrink-0 w-64 h-full cursor-pointer"
            onClick={() =>
              post.externalUrl && window.open(post.externalUrl, "_blank")
            }
          >
            <div className="flex flex-col gap-2">
              <div className="flex flex-row justify-between">
                <h3 className="text-sm font-bold text-white mb-1 w-40">
                  {post.title}
                </h3>
                <p className="text-white text-sm font-base opacity-50">
                  {new Date(post.date).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
              <p className="text-white opacity-50 text-xs line-clamp-3 font-immi">
                {post.excerpt}
              </p>
            </div>
          </motion.div>
        ));

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div
            className="fixed inset-x-0 bottom-0 top-[240px] z-20"
            onClick={onClose}
          />
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{
              duration: 0.6,
              ease: [0.32, 0.72, 0, 1],
            }}
            className="absolute top-0 left-0 right-0 z-30 bg-black h-[180px]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full h-full">
              <div className="h-full relative">
                {showLeftFade && (
                  <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
                )}

                {showRightFade && (
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>
                )}

                <motion.div
                  key={contentType}
                  ref={scrollContainerRef}
                  initial={{ opacity: 0, y: -20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="flex gap-4 h-full justify-left items-center overflow-x-auto scrollbar-hide px-6 py-6"
                >
                  {renderContent()}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
