"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import * as React from "react";

type SpotlightInputProps = React.ComponentProps<typeof Input> & {
  borderWidth?: "1px" | "2px" | "3px" | "4px";
};

const borderStyles = {
  "1px": "border-[1px]",
  "2px": "border-2",
  "3px": "border-[3px]",
  "4px": "border-4",
};

const SpotlightInput = ({
  borderWidth = "2px",
  ...props
}: SpotlightInputProps) => {
  const divRef = React.useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = React.useState(0);
  const [isFocused, setIsFocused] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const borderClass = borderStyles[borderWidth];

  function handleMouseMove(event: React.MouseEvent<HTMLInputElement>) {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  }

  function handleMouseEnter() {
    setOpacity(1);
  }

  function handleMouseLeave() {
    setOpacity(0);
  }

  function handleFocus() {
    setIsFocused(true);
    setOpacity(1);
  }

  function handleBlur() {
    setIsFocused(false);
    setOpacity(0);
  }

  return (
    <div className="relative">
      <Input
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        autoComplete="off"
        {...props}
        className={cn(
          "h-12 focus-visible:ring-0 focus-visible:border-neutral-800 dark:focus-visible:border-neutral-200 transition-colors duration-300 ease-in-out",
          borderClass
        )}
      />

      <div
        ref={divRef}
        style={{
          opacity,
          WebkitMaskImage: `radial-gradient(30% 30px at ${position.x}px ${position.y}px, black 45%, transparent)`,
        }}
        aria-hidden="true"
        className={cn(
          "absolute left-0 top-0 z-10 h-12 w-full pointer-events-none border-neutral-800 dark:border-neutral-200 bg-transparent opacity-0 transition-colors duration-300 ease-in-out rounded-md",
          borderClass
        )}
      />
    </div>
  );
};

export { SpotlightInput };
