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
      <div className="footer-bottom">
        <Link href="/" className="footer-brand">
          ALPEKAN FILMS
        </Link>
        <span>
          Independent film & audiovisual production
          <br />
          Prishtina, Kosovo
        </span>
        <span>© {new Date().getFullYear()} Alpekan Films</span>
        <Link href="/contact">
          Get in touch <Arrow />
        </Link>
      </div>
    </footer>
  );
}
