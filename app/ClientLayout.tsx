"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Navigation from "./Navigation";
import ContentDrawer from "./ContentDrawer";
import Footer from "./Footer";
import { Providers } from "./providers";

interface ClientLayoutProps {
  children: React.ReactNode;
}

type DrawerContentType = "events" | "releases" | "blog";

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerContentType, setDrawerContentType] =
    useState<DrawerContentType>("events");

  const handleDrawerToggle = (contentType: DrawerContentType) => {
    if (isDrawerOpen && drawerContentType === contentType) {
      setIsDrawerOpen(false);
    } else {
      setDrawerContentType(contentType);
      setIsDrawerOpen(true);
    }
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <Providers>
      {/* Black background layer */}
      <div className="fixed inset-0 bg-black z-0" />

      <ContentDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        contentType={drawerContentType}
      />

      <motion.div
        animate={{
          y: isDrawerOpen ? "180px" : "0",
          borderRadius: isDrawerOpen ? "16px 16px 0 0" : "0px",
        }}
        transition={{
          duration: 0.6,
          ease: [0.32, 0.72, 0, 1],
        }}
        className={`min-h-screen bg-[#dddddd] relative z-10 ${
          isDrawerOpen ? "shadow-2xl shadow-black/50" : ""
        }`}
        style={{
          transformOrigin: "top center",
        }}
      >
        <Navigation
          onDrawerToggle={handleDrawerToggle}
          isDrawerOpen={isDrawerOpen}
          drawerContentType={drawerContentType}
        />
        <main className="flex-col items-center justify-between px-6 sm:px-12 md:px-24 lg:px-0 lg:max-w-4xl mx-auto">
          {children}
        </main>
        <Footer />
      </motion.div>
    </Providers>
  );
}
