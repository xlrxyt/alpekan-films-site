"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
const links = [
  ["/work", "Work"],
  ["/services", "Services"],
  ["/social-media-production", "Social production"],
  ["/about", "About"],
  ["/contact", "Contact"],
];
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <Link
        href="/"
        className="wordmark"
        aria-label="Alpekan Films home"
        onClick={() => setOpen(false)}
      >
        ALPEKAN<span>FILMS</span>
      </Link>
      <button
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="main-nav"
        onClick={() => setOpen(!open)}
      >
        {open ? "Close −" : "Menu +"}
      </button>
      <nav
        id="main-nav"
        className={open ? "main-nav is-open" : "main-nav"}
        aria-label="Main navigation"
      >
        {links.map(([url, label]) => (
          <Link
            key={url}
            href={url}
            aria-current={
              pathname === url || pathname.startsWith(url + "/")
                ? "page"
                : undefined
            }
            onClick={() => setOpen(false)}
          >
            {label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
