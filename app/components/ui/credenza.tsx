"use client";

import * as React from "react";
import { Modal, ModalContent, ModalHeader } from "@nextui-org/react";

interface CredenzaProps {
  children: React.ReactNode;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function Credenza({ children, isOpen, onOpenChange }: CredenzaProps) {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="5xl"
      scrollBehavior="inside"
      className="max-w-full sm:max-w-[95%] min-h-screen sm:min-h-[90vh]"
    >
      {children}
    </Modal>
  );
}

export function CredenzaContent({ children }: { children: React.ReactNode }) {
  return <ModalContent className="p-6">{children}</ModalContent>;
}

export function CredenzaHeader({ children }: { children: React.ReactNode }) {
  return <ModalHeader className="px-6 pt-6">{children}</ModalHeader>;
}

export function CredenzaTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl font-bold">{children}</h2>;
}
