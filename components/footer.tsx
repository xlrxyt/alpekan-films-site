import { company } from "@/lib/company";
import { Arrow } from "@/components/arrow";
import Link from "next/link";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <p>Have a story in mind?</p>
        <Link href="/contact" className="footer-cta">
          Let’s make it happen.{" "}
          <span aria-hidden="true">
            <Arrow />
          </span>
        </Link>
      </div>
      <div className="footer-contact">
        <a href={`mailto:${company.email}`}>
          {company.email} <Arrow />
        </a>
        <a href={company.instagram} target="_blank" rel="noopener noreferrer">
          Instagram <Arrow />
        </a>
      </div>
      <div className="footer-bottom">
        <Link href="/" className="footer-brand">
          ALPEKAN FILMS
        </Link>
        <span>
          Independent film & audiovisual production
          <br />
          {company.location}
        </span>
        <span>© {new Date().getFullYear()} Alpekan Films</span>
        <Link href="/contact">
          Get in touch <Arrow />
        </Link>
      </div>
    </footer>
  );
}
