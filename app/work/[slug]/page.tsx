import { Arrow } from "@/components/arrow";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/content";
import { VideoPlayer } from "@/components/video-player";
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
  return project
    ? { title: project.title, description: project.description }
    : { title: "Project not found" };
}
export default async function ProjectPage({
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
          {project.category} / {project.year}
        </span>
        <h1>{project.title}</h1>
        <p className="project-summary">
          {project.format}
          {project.duration ? ` · ${project.duration}` : ""}
        </p>
      </section>
      <VideoPlayer videoId={project.videoId} title={project.title} />
      <section className="project-info">
        <div>
          <span className="eyebrow">ABOUT THE PROJECT</span>
          <h2>
            The story behind
            <br />
            the frame.
          </h2>
          <p>{project.description}</p>
        </div>
        <div>
          <span className="eyebrow">PROJECT DETAILS</span>
          <dl>
            <div>
              <dt>Year</dt>
              <dd>{project.year}</dd>
            </div>
            {project.duration && (
              <div>
                <dt>Runtime</dt>
                <dd>{project.duration}</dd>
              </div>
            )}
            <div>
              <dt>Format</dt>
              <dd>{project.format}</dd>
            </div>
            {project.roles.map((role) => (
              <div key={role}>
                <dt>{role}</dt>
                <dd>{project.creditName}</dd>
              </div>
            ))}
            {project.production && (
              <div>
                <dt>Production</dt>
                <dd>{project.production}</dd>
              </div>
            )}
            {project.postProduction && (
              <div>
                <dt>Post-production</dt>
                <dd>{project.postProduction}</dd>
              </div>
            )}
          </dl>
        </div>
      </section>
      <Link className="next-project" href={`/work/${next.slug}`}>
        <span className="eyebrow">NEXT PROJECT</span>
        <span>
          {next.title} <Arrow />
        </span>
      </Link>
    </div>
  );
}
