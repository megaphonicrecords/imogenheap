"use client";

import * as React from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      className={
        "h-10 w-full rounded border border-zinc-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black disabled:cursor-not-allowed disabled:opacity-50 " +
        (className || "")
      }
      {...props}
    />
  );
});

export default Input;
