import { Arrow } from "@/components/arrow";
import { company } from "@/lib/company";
import type { Metadata } from "next";
import { connection } from "next/server";
import { getContactFormId } from "@/lib/contact-config";
import { Suspense } from "react";
import { ContactForm } from "@/components/contact-form";
export const metadata: Metadata = { title: "Contact" };
export default async function Contact() {
  await connection();
  const directSubmission = Boolean(getContactFormId());
  return (
    <div className="page-shell">
      <section className="page-heading">
        <span className="eyebrow">EVERY STORY STARTS WITH A CONVERSATION</span>
        <h1>
          Let’s make
          <br />
          something move.
        </h1>
      </section>
      <div className="contact-layout">
        <aside>
          <span className="eyebrow">ALPEKAN FILMS</span>
          <h2>
            Based in Prishtina.
            <br />
            Ready for your idea.
          </h2>
          <p className="contact-guidance">
            Email is the best way to reach us. For films, music videos and other
            productions, tell us about your idea and budget. Scope and pricing
            are agreed individually for each project.
          </p>
          <dl className="contact-details">
            <div>
              <dt>EMAIL</dt>
              <dd>
                <a href={`mailto:${company.email}`}>{company.email}</a>
              </dd>
            </div>
            <div>
              <dt>BASED IN</dt>
              <dd>{company.location}</dd>
            </div>
            <div>
              <dt>INSTAGRAM</dt>
              <dd>
                <a
                  href={company.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @alpekanfilms <Arrow />
                </a>
              </dd>
            </div>
            <div>
              <dt>FOR SOCIAL PRODUCTION</dt>
              <dd>Shooting schedules depend on production requirements.</dd>
            </div>
          </dl>
        </aside>
        <Suspense fallback={<p>Loading inquiry form…</p>}>
          <ContactForm directSubmission={directSubmission} />
        </Suspense>
      </div>
    </div>
  );
}
