import { Arrow } from "@/components/arrow";
import { ProjectThumbnail } from "./project-thumbnail";
import Link from "next/link";
import { projects } from "@/lib/content";
export function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  return (
    <Link className="project-card" href={`/work/${project.slug}`}>
      <div className="project-image">
        <ProjectThumbnail videoId={project.videoId} title={project.title} />
        <span className="image-label">
          {project.year} / {project.format}
        </span>
        <span className="project-arrow" aria-hidden="true">
          <Arrow />
        </span>
      </div>
      <div className="project-meta">
        <span className="project-index">0{index + 1}</span>
        <h2>{project.title}</h2>
        <span>{project.category}</span>
      </div>
    </Link>
  );
}
