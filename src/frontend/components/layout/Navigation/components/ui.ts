// Centralized responsive classes for the mobile navigation.
// Note: Tailwind requires classes to exist as static strings at build time.
// Change breakpoint by editing the class strings below (e.g., switch md -> lg).

export const NAV_RESPONSIVE = {
  // Desktop nav is visible at and above this breakpoint
  desktopOnly: "hidden lg:flex",
  // Mobile controls are visible below this breakpoint
  mobileOnly: "lg:hidden",
}

// Sizing and spacing for mobile menu items (links)
export const MOBILE_MENU_ITEM_CLASS = "hover:bg-coolgray-950 text-coolgray-200 flex items-center gap-3 rounded-full px-4 py-3 text-base font-semibold"

// Container classes for the mobile drawer
export const MOBILE_DRAWER_CLASSES = {
  backdrop: "absolute inset-0 bg-black/70",
  panel: "border-coolgray-950 bg-black absolute inset-x-0 top-0 rounded-b-2xl border-b p-4 shadow-2xl",
}

// Desktop nav link styles
export const DESKTOP_NAV_ITEM_CLASS =
  "hover:text-accent-3 text-coolgray-200 relative flex items-center gap-2 px-2 py-1.5 font-semibold transition-colors duration-150 ease-in-out"
