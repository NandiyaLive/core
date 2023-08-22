import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatter = new Intl.NumberFormat("en-Us", {
  style: "currency",
  currency: "LKR",
});
