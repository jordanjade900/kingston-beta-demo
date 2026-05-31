import type React from "react";

import { cn } from "@/src/lib/utils";

type InfiniteSliderProps = React.ComponentProps<"div"> & {
  children: React.ReactNode;
  gap?: number;
  reverse?: boolean;
  speed?: number;
  speedOnHover?: number;
};

export function InfiniteSlider({
  children,
  className,
  gap = 40,
  reverse = false,
  speed = 60,
  speedOnHover = 30,
  style,
  ...props
}: InfiniteSliderProps) {
  return (
    <div
      {...props}
      className={cn("infinite-slider", className)}
      style={
        {
          "--slider-gap": `${gap}px`,
          "--slider-duration": `${speed}s`,
          "--slider-hover-duration": `${speedOnHover}s`,
          "--slider-direction": reverse ? "reverse" : "normal",
          ...style,
        } as React.CSSProperties
      }
    >
      <div className="infinite-slider-track" aria-hidden="true">
        <div className="infinite-slider-group">{children}</div>
        <div className="infinite-slider-group">{children}</div>
      </div>
    </div>
  );
}
