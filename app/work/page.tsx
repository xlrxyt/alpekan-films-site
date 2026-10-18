import type { Metadata } from "next";
import { WorkGrid } from "@/components/work-grid";
export const metadata: Metadata = { title: "Work" };
export default function Work() {
  return (
    <div className="page-shell">
      <section className="page-heading">
        <span className="eyebrow">OUR POINT OF VIEW / IN MOTION</span>
        <h1>
          The work<span className="title-dot">.</span>
        </h1>
        <div className="heading-bottom">
          <p>
            Film. Music. Brands. Performance.
            <br />
            Different formats. The same commitment to the story.
          </p>
          <span className="eyebrow">SCROLL TO EXPLORE ↓</span>
        </div>
      </section>
      <p className="placeholder-note">
        Portfolio in preparation. The entries below are clearly labeled
        placeholders, not client projects.
      </p>
      <WorkGrid />
    </div>
  );
}
