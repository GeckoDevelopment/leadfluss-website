import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Leadfluss-Wortmarke (offizielle SVG: grüne Doppelwelle + „Leadfluss" in
 * Marken-Navy #232D44). Für dunkle Flächen `variant="light"` nutzen.
 */
export function Logo({
  className,
  variant = "dark",
}: {
  className?: string;
  variant?: "dark" | "light";
}) {
  const src =
    variant === "light" ? "/leadfluss-logo-white.png" : "/leadfluss-logo.svg";
  return (
    <Image
      src={src}
      alt="Leadfluss"
      width={356}
      height={86}
      priority
      className={cn("h-10 w-auto", className)}
    />
  );
}
