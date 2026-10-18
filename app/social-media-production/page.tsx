import { Arrow } from "@/components/arrow";
import type { Metadata } from "next";
import Link from "next/link";
import { packages } from "@/lib/content";
export const metadata: Metadata = { title: "Social Media Production" };
export default function Social() {
  return (
    <div className="page-shell">
      <section className="page-heading">
        <span className="eyebrow">SHORT FORM / LASTING IMPRESSION</span>
        <h1>
          Made for
          <br />
          your audience.
        </h1>
        <div className="heading-bottom">
          <p>
            Video production for social media.
            <br />A consistent visual voice, one frame at a time.
          </p>
          <span className="eyebrow">MONTHLY PACKAGES ↓</span>
        </div>
      </section>
      <section
        className="packages-section"
        aria-label="Video production packages"
      >
        <div className="section-heading">
          <h2>Your story. Your rhythm.</h2>
          <span className="eyebrow">PRODUCTION PACKAGES / EUR</span>
        </div>
        <div className="package-grid">
          {packages.map((pkg, i) => (
            <article className="package-card" key={pkg.name}>
              <div className="package-top">
                <span className="eyebrow">
                  0{i + 1} / {pkg.name.toUpperCase()}
                </span>
                <span aria-hidden="true">
                  <Arrow />
                </span>
              </div>
              <h3>{pkg.name}</h3>
              <p className="package-videos">{pkg.videos}</p>
              <p className="package-price">
                {pkg.price}
                <span>{pkg.name !== "Custom" ? " / month" : " / project"}</span>
              </p>
              <p className="package-description">{pkg.description}</p>
              <Link
                className="button"
                href={`/contact?package=${encodeURIComponent(pkg.name)}`}
              >
                Request This Package{" "}
                <span aria-hidden="true">
                  <Arrow />
                </span>
              </Link>
            </article>
          ))}
        </div>
        <div className="package-notes">
          <p>
            Shooting schedules depend on production requirements. Timing, scope
            and deliverables are agreed around your brief.
          </p>
          <p>
            These packages cover video production. Social media account
            management is not offered.
          </p>
        </div>
      </section>
      <section className="faq-section">
        <span className="eyebrow">A FEW DETAILS</span>
        <div>
          <details open>
            <summary>When do shoots take place?</summary>
            <p>
              Shooting schedules depend on production requirements. We agree the
              schedule after understanding your concept, locations and
              deliverables.
            </p>
          </details>
          <details>
            <summary>Do you manage social media accounts?</summary>
            <p>
              No. Our work focuses on video production. Publishing, account
              management and community management are not included or offered.
            </p>
          </details>
          <details>
            <summary>What if I need a different scope?</summary>
            <p>
              Choose Custom and describe your brief. Custom production starts
              from €1,000; the final scope and quote depend on the project.
            </p>
          </details>
        </div>
      </section>
    </div>
  );
}
