"use client";
import { useState } from "react";
import { categories, Category, projects } from "@/lib/content";
import { ProjectCard } from "./project-card";
export function WorkGrid() {
  const [active, setActive] = useState<Category>("All");
  const visible = projects.filter(
    (p) => active === "All" || p.category === active,
  );
  return (
    <>
      <div
        className="filters"
        role="group"
        aria-label="Filter projects by category"
      >
        {categories.map((category) => (
          <button
            key={category}
            aria-pressed={active === category}
            onClick={() => setActive(category)}
          >
            {category}
            {category === "All" && (
              <sup>{String(projects.length).padStart(2, "0")}</sup>
            )}
          </button>
        ))}
      </div>
      <p className="filter-status" role="status">
        {visible.length} {visible.length === 1 ? "project" : "projects"} /{" "}
        {active}
      </p>
      {visible.length === 0 && (
        <p className="empty-work">
          Projects in this category will be added soon. Explore Films or Music
          Videos in the meantime.
        </p>
      )}
      <div className="project-grid">
        {visible.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={projects.indexOf(project)}
          />
        ))}
      </div>
    </>
  );
}
