import { Arrow } from "@/components/arrow";
import Link from "next/link";
import Image from "next/image";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/lib/content";
export default function Home() {
  return (
    <>
      <section className="home-hero">
        <div className="eyebrow hero-top">
          <span>INDEPENDENT PRODUCTION COMPANY</span>
          <span>PRISHTINA, KOSOVA</span>
        </div>
        <h1>
          Independent stories.
          <br />
          <span className="outline-text">Moving images.</span>
        </h1>
        <div className="hero-bottom">
          <p>
            We are Alpekan Films.
            <br />
            Film & audiovisual production.
            <br />
            An independent point of view.
          </p>
          <Link href="/work" className="round-link">
            <span>Explore our work</span>
            <span className="circle-arrow" aria-hidden="true">
              <Arrow />
            </span>
          </Link>
        </div>
        <figure className="homepage-feature">
          <div className="hero-art">
            <Image
              src="/images/image00001.jpeg"
              alt="Film crew working around a camera on a street during the production of Chronicles of Sonatine"
              width={1280}
              height={848}
              sizes="(max-width: 700px) 88vw, 92vw"
              priority
            />
          </div>
          <figcaption className="feature-caption">
            <div>
              <span className="eyebrow">BEHIND THE SCENES</span>
              <p>Chronicles of Sonatine</p>
            </div>
            <Link href="/work/chronicles-of-sonatine" className="text-link">
              Watch film <Arrow />
            </Link>
          </figcaption>
        </figure>
      </section>
      <section className="section intro-section">
        <span className="eyebrow">01 / THE STUDIO</span>
        <div>
          <h2>
            Rooted in Prishtina.
            <br />
            Open to every story.
          </h2>
          <p className="body-large">
            We are an independent film and audiovisual production company based
            in Kosova. We bring ideas to life through film, music, commercial
            work and digital storytelling.
          </p>
          <Link href="/about" className="text-link">
            Meet Alpekan{" "}
            <span aria-hidden="true">
              <Arrow />
            </span>
          </Link>
        </div>
      </section>
      <section className="section work-preview">
        <div className="section-heading">
          <div>
            <span className="eyebrow">02 / IN THE FRAME</span>
            <h2>Selected work.</h2>
          </div>
          <Link href="/work" className="text-link">
            Explore all work <Arrow />
          </Link>
        </div>
        <div className="project-grid">
          {[projects[0], projects[6]].map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </section>
      <section className="section social-callout">
        <span className="eyebrow">03 / MADE FOR DIGITAL</span>
        <h2>
          Small screen.
          <br />
          Strong impression.
        </h2>
        <div>
          <p>
            Social media videos and photography. From a focused monthly package
            to a production built around your brief.
          </p>
          <Link className="button light" href="/social-media-production">
            Explore social media packages{" "}
            <span aria-hidden="true">
              <Arrow />
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
