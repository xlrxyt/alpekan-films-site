import { Arrow } from "@/components/arrow";
import type { Metadata } from "next";
import Link from "next/link";
import { services } from "@/lib/content";
export const metadata: Metadata = { title: "Services" };
export default function Services() {
  return (
    <div className="page-shell">
      <section className="page-heading">
        <span className="eyebrow">FROM FIRST THOUGHT TO FINAL FRAME</span>
        <h1>
          Ideas into
          <br />
          images.
        </h1>
        <div className="heading-bottom">
          <p>
            Film & audiovisual production.
            <br />A thoughtful approach to every format.
          </p>
          <Link href="/contact" className="text-link">
            Tell us about your project <Arrow />
          </Link>
        </div>
      </section>
      <div className="service-list">
        {services.map((service) => (
          <article key={service.number}>
            <span className="eyebrow">/{service.number}</span>
            <h2>{service.name}</h2>
            <div>
              <p>{service.text}</p>
              <Link
                className="text-link"
                href={
                  service.number === "05"
                    ? "/social-media-production"
                    : "/contact"
                }
              >
                {service.number === "05"
                  ? "View packages"
                  : "Start a conversation"}{" "}
                <Arrow />
              </Link>
            </div>
          </article>
        ))}
      </div>
      <section className="process-section">
        <span className="eyebrow">THE APPROACH</span>
        <h2>
          A clear process.
          <br />
          Room for discovery.
        </h2>
        <div className="process-grid">
          {[
            [
              "01",
              "The conversation",
              "We start with your idea, audience and production needs.",
            ],
            [
              "02",
              "The production",
              "We shape the concept, plan the shoot and create the material.",
            ],
            [
              "03",
              "The final frame",
              "We edit, refine and prepare the work for its intended format.",
            ],
          ].map(([n, t, d]) => (
            <article key={n}>
              <span className="eyebrow">{n}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
