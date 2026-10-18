"use client";
import Link from "next/link";
import Image from "next/image";
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
        className="brand-logo"
        aria-label="Alpekan Films home"
        onClick={() => setOpen(false)}
      >
        <Image
          src="/images/4a3bae79-6592-4578-981f-64e7ccaef663.png"
          alt="Alpekan Films"
          width={1672}
          height={941}
          sizes="(max-width: 700px) 250px, 320px"
          priority
        />
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
