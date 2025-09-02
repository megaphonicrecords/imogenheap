"use client";

import * as React from "react";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  variant?: "default" | "outline" | "flat";
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant = "default", ...props },
  ref,
) {
  const base =
    "inline-flex items-center justify-center whitespace-nowrap rounded text-sm h-10 px-4 py-2 disabled:opacity-50 disabled:pointer-events-none";
  const variants: Record<string, string> = {
    default: "bg-black text-white hover:opacity-90",
    outline: "border border-zinc-300 bg-white text-black hover:bg-zinc-50",
    flat: "bg-zinc-100 text-black hover:bg-zinc-200",
  };
  return (
    <button
      ref={ref}
      className={`${base} ${variants[variant]} ${className || ""}`}
      {...props}
    />
  );
});

export default Button;
