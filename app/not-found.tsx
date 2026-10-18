import { Arrow } from "@/components/arrow";
import Link from "next/link";
export default function NotFound() {
  return (
    <section className="page-shell page-heading not-found">
      <span className="eyebrow">404 / OUT OF FRAME</span>
      <h1>A missing scene.</h1>
      <p>We couldn’t find that page.</p>
      <Link className="button light" href="/work">
        Back to work <Arrow />
      </Link>
    </section>
  );
}
