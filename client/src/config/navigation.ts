import {
  HomeIcon,
  InfoIcon,
  SwordsIcon,
} from "lucide-react";

export const navigationItems = [
  { label: "Home", href: "/", icon: HomeIcon },
  { label: "Battles", href: "/battles", icon: SwordsIcon },
  { label: "About", href: "/about", icon: InfoIcon },
] as const;
