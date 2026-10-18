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
            {category === "All" && <sup>04</sup>}
          </button>
        ))}
      </div>
      <p className="filter-status" role="status">
        {visible.length} {visible.length === 1 ? "placeholder" : "placeholders"}{" "}
        / {active}
      </p>
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
