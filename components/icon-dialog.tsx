"use client";

import { Icon } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface IconDialogProps {
  icon: Icon | null;
  onClose: () => void;
}

export function IconDialog({ icon, onClose }: IconDialogProps) {
  if (!icon) return null;

  const handleDownload = () => {
    // ダウンロード機能は後で実装
    console.log("Downloading:", icon.name);
  };

  return (
    <Dialog open={!!icon} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{icon.name}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4 py-4">
          <img
            src={icon.url}
            alt={icon.name}
            className="h-32 w-32 object-contain"
          />
          <div className="flex w-full justify-between">
            <div className="text-sm text-muted-foreground">
              {icon.category}
            </div>
            <Button onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              ダウンロード
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 