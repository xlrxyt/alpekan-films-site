import { Arrow } from "@/components/arrow";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
export const metadata: Metadata = { title: "About" };
export default function About() {
  return (
    <div className="page-shell">
      <section className="page-heading">
        <span className="eyebrow">INDEPENDENT BY NATURE</span>
        <h1>
          A place.
          <br />A point of view.
        </h1>
        <div className="heading-bottom">
          <p>
            Alpekan Films.
            <br />
            Prishtina, Kosovo.
          </p>
          <span className="eyebrow">FILM & AUDIOVISUAL PRODUCTION</span>
        </div>
      </section>
      <div className="about-art">
        <Image
          src="/images/hero.svg"
          alt="Abstract monochrome landscape — studio image placeholder"
          width={1800}
          height={900}
        />
        <span className="art-caption">
          STUDIO IMAGE PLACEHOLDER / OFFICIAL PHOTOGRAPHY TO FOLLOW
        </span>
      </div>
      <section className="section intro-section">
        <span className="eyebrow">THE COMPANY</span>
        <div>
          <h2>
            Stories worth
            <br />
            giving shape to.
          </h2>
          <p className="body-large">
            Alpekan Films is an independent film and audiovisual production
            company based in Prishtina, Kosovo.
          </p>
          <p>
            Our focus spans films, music videos, commercials, theatre and
            audiovisual work, and short-form production for social media. Each
            format begins with the same question: what does this story need?
          </p>
          <p className="muted">
            A fuller studio story, team profiles and official imagery will be
            added when supplied.
          </p>
          <Link href="/services" className="text-link">
            Discover our services <Arrow />
          </Link>
        </div>
      </section>
      <section className="about-statement">
        <span className="eyebrow">OUR OUTLOOK</span>
        <p>
          One idea.
          <br />
          Many possibilities.
          <br />
          <span className="outline-text">A shared vision.</span>
        </p>
      </section>
    </div>
  );
}
