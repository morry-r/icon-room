"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function ColorPicker({
  value,
  onChange,
  className,
}: ColorPickerProps) {
  return (
    <input
      type="color"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn("h-10 w-full rounded-md border", className)}
    />
  );
} 