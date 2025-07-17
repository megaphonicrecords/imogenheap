import { Modal, ModalContent, ModalHeader } from "@nextui-org/react";
import HalftoneImage from "./HalftoneImage";

interface HalftoneDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function HalftoneDialog({
  isOpen,
  onOpenChange,
}: HalftoneDialogProps) {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="5xl"
      scrollBehavior="inside"
      className="max-w-2xl"
    >
      <ModalContent>
        <div className="sm:p-8 p-4 space-y-4">
          <h2 className="text-sm font-bold">
            'Speak For Yourself' CMYK Filter
          </h2>
          <HalftoneImage
            size={800}
            dotSize={28}
            spacing={18}
            downloadSize={2048}
            halftoneSize={1440}
          />
        </div>
      </ModalContent>
    </Modal>
  );
}
