export function lockScroll() {
  if (typeof window === "undefined") return;
  document.documentElement.style.overflow = "hidden";
}

export function unlockScroll() {
  if (typeof window === "undefined") return;
  document.documentElement.style.overflow = "";
}
