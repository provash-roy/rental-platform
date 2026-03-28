"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Home } from "lucide-react";

interface ModalProps {
  title?: string;
  bodyContent: React.ReactNode;

  onSubmit?: () => void;
  onBack?: () => void;

  actionLabel?: string;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;

  disabled?: boolean;
}

export default function Modal({
  title,
  bodyContent,
  onSubmit,
  onBack,
  actionLabel,
  secondaryAction,
  secondaryActionLabel,
  disabled,
}: ModalProps) {
  return (
    <Dialog>
      {/* Trigger Button */}
      <DialogTrigger asChild>
        <button className="flex items-center gap-2">
          <Home size={16} />
          List Home
        </button>
      </DialogTrigger>

      {/* Modal Content */}
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center font-bold text-lg">
            {"Rent Your Home"}
          </DialogTitle>

          <DialogDescription className="text-center text-sm text-gray-500">
            {title}
          </DialogDescription>
        </DialogHeader>

        {/* Body */}
        <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
          {bodyContent}
        </div>

        {/* Footer */}
        <DialogFooter className="flex justify-between gap-2">
          {/* Back Button */}
          {secondaryAction && (
            <Button
              type="button"
              variant="outline"
              onClick={secondaryAction}
              disabled={disabled}
            >
              {secondaryActionLabel || "Prev"}
            </Button>
          )}

          <div className="flex gap-2">
            {/* 
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose> */}

            {/* Main Action */}
            <Button
              onClick={onSubmit}
              disabled={disabled}
              className="bg-black text-white hover:bg-black/80"
            >
              {actionLabel || "Next"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
