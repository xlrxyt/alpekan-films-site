import { Arrow } from "@/components/arrow";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/content";
export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return {
    title: project
      ? `${project.category} — Portfolio placeholder`
      : "Project not found",
    robots: { index: false, follow: true },
  };
}
export default async function Project({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  return (
    <div className="page-shell project-detail">
      <Link href="/work" className="text-link back-link">
        ← Back to work
      </Link>
      <section className="page-heading">
        <span className="eyebrow">
          {project.category} / PORTFOLIO PLACEHOLDER
        </span>
        <h1>{project.title}</h1>
        <p className="placeholder-note">
          This is a layout preview. No commissioned project, client or credits
          are represented.
        </p>
      </section>
      <div className="video-placeholder">
        <span className="video-icon" aria-hidden="true">
          <span className="play-triangle" />
        </span>
        <h2>Space for the film.</h2>
        <p>Official video will appear here when available.</p>
        <span className="eyebrow">VIDEO PLACEHOLDER / 16:9</span>
      </div>
      <section className="project-info">
        <div>
          <span className="eyebrow">ABOUT THE PROJECT</span>
          <h2>
            The story behind
            <br />
            the frame.
          </h2>
          <p>
            Project description to be supplied. This space is reserved for the
            concept, production approach and story of an official Alpekan Films
            project.
          </p>
        </div>
        <div>
          <span className="eyebrow">CREDITS / TO BE CONFIRMED</span>
          <dl>
            {[
              "Project title",
              "Director",
              "Production",
              "Cinematography",
              "Editing",
              "Year",
            ].map((label) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>To be supplied</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <div className="project-still">
        <Image
          src={project.image}
          alt="Abstract project still placeholder — official imagery to be supplied"
          width={1200}
          height={800}
        />
        <span className="eyebrow">01 / IMAGE PLACEHOLDER</span>
      </div>
      <Link className="next-project" href={`/work/${next.slug}`}>
        <span className="eyebrow">NEXT PLACEHOLDER</span>
        <span>
          {next.title} <Arrow />
        </span>
      </Link>
    </div>
  );
}
