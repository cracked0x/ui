"use client";

import * as React from "react";
import { useInView, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

type DelayInSeconds = `${number}s`;

type NumberTickerProps = {
  value: number;
  startValue?: number;
  direction?: "up" | "down";
  delay?: DelayInSeconds;
  decimalPlaces?: number;
} & React.ComponentPropsWithoutRef<"span">;

function NumberTicker({
  value,
  startValue = 0,
  direction = "up",
  delay = "0s",
  decimalPlaces = 0,
  className,
  ...props
}: NumberTickerProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const delaySeconds = parseFloat(delay);

  const motionValue = useMotionValue(direction === "up" ? startValue : value);
  const springValue = useSpring(motionValue, { damping: 70 });
  const isInView = useInView(ref, { once: true, margin: "0px" });

  const initialValue = React.useMemo(() => {
    const _value = Intl.NumberFormat("en-US").format(
      direction === "up" ? startValue : value
    );
    return _value;
  }, []);

  React.useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        motionValue.set(direction === "up" ? value : startValue);
      }, delaySeconds * 1000);

      return () => clearTimeout(timer);
    }
  }, [isInView, value]);

  React.useEffect(
    () =>
      springValue.on("change", (latest) => {
        if (ref.current) {
          ref.current.textContent = Intl.NumberFormat("en-US", {
            minimumFractionDigits: decimalPlaces,
            maximumFractionDigits: decimalPlaces,
          }).format(Number(latest.toFixed(decimalPlaces)));
        }
      }),
    [springValue, decimalPlaces]
  );

  return (
    <span
      ref={ref}
      className={cn("tabular-nums font-mono", className)}
      {...props}
    >
      {initialValue}
    </span>
  );
}

export { NumberTicker };
