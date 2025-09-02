"use client";

import * as React from "react";

export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  className?: string;
};

export default function Label({ className, ...props }: LabelProps) {
  return (
    <label
      className={
        "text-sm font-medium text-zinc-800 inline-block mb-1 " +
        (className || "")
      }
      {...props}
    />
  );
}
