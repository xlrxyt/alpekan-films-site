import { Arrow } from "@/components/arrow";
import type { Metadata } from "next";
import Link from "next/link";
import { company } from "@/lib/company";
export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Alper Zilgir, filmmaker and founder of Alpekan Films, an independent audiovisual production company in Prishtina, Kosovo.",
};
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
            Founded and led by Alper Zilgir.
          </p>
          <span className="eyebrow">
            PRISHTINA, KOSOVO / FILM & AUDIOVISUAL PRODUCTION
          </span>
        </div>
      </section>
      <section className="section intro-section">
        <span className="eyebrow">THE COMPANY</span>
        <div>
          <h2>
            Stories worth
            <br />
            giving shape to.
          </h2>
          <p className="body-large">
            Alpekan Films is an audiovisual production company based in
            Prishtina, founded and led by filmmaker Alper Zilgir.
          </p>
          <p>
            We develop and produce film and audiovisual projects, music videos
            and advertising content, and provide post-production services.
            Storytelling, imagery and editing come together around the character
            and needs of each project.
          </p>
          <p>
            The Alpekan name was first used for the founder’s student
            productions, before the business was formally registered in July
            2024. Its portfolio includes fiction films, a monologue featuring
            actor Blendon Ahmeti and Fiona Abdullahu’s music video “Dardha
            t’Buta”.
          </p>
          <Link href="/work" className="text-link">
            Explore the work <Arrow />
          </Link>
        </div>
      </section>
      <section className="section intro-section founder-section">
        <span className="eyebrow">THE FOUNDER / CEO</span>
        <div>
          <h2>Alper Zilgir.</h2>
          <p className="founder-role">
            Director, screenwriter & producer
            <br />
            Founder & managing director, Alpekan Films
          </p>
          <p className="body-large">
            Born in Kırklareli, Turkey, in 2000 and raised in Prishtina, Alper
            Zilgir is a filmmaker of Albanian and Turkish heritage. He lives and
            works in Prishtina.
          </p>
          <p>
            He holds a bachelor’s degree in Film and Television Directing from
            the Faculty of Arts at the University of Prishtina. During his
            studies, he wrote, directed and edited six student short films.
          </p>
          <p>
            <em>Moonshine</em> screened at East Koenji Film Festival in Tokyo,
            Japan, on 15 June 2024. His graduation film,{" "}
            <em>Chronicles of Sonatine or: Shadows of the Broken Memories</em>,
            closed the UPward International Student Film Festival in Prishtina
            in 2025. At DokuFest’s “Stories We Tell – Camp 3” workshop, he made
            the documentary <em>Fortress.mp4</em> (2024) as director, director
            of photography, editor and co-screenwriter.
          </p>
          <p>
            Alongside his own films, he has worked on student productions in
            assistant directing, camera, lighting, sound and production design.
            He was script and continuity supervisor on <em>Angel777</em>,
            written and directed by Brilant Pireva, and recently acted in{" "}
            <em>Good Game</em>, directed by Tristan Halilaj.
          </p>
          <p>
            For more than a year, he worked at the National Theatre of Kosovo as
            first assistant director and projectionist. He also worked as
            projectionist on <em>Hotel Grand</em>, by Armend Smajli and Rebeka
            Qena, a production of Fondacioni La Rremë.
          </p>
          <div className="founder-experience">
            <span className="eyebrow">EXPERIENCE THROUGH OTHER COMPANIES</span>
            <p>
              Through collaborations with Imagine Films and Onima, Alper has
              made around thirty music videos. He currently directs commercials
              at Tatamata, with experience on projects for KFC Kosova, Credins
              Bank, Sherreti, TEB Bank, Uji Dea and Uji Selita.
            </p>
            <p className="muted">
              These collaborations form part of Alper’s professional experience
              through the companies named above.
            </p>
          </div>
          <Link href="/contact" className="text-link">
            Start a conversation <Arrow />
          </Link>
        </div>
      </section>
      <section className="company-record">
        <span className="eyebrow">COMPANY INFORMATION</span>
        <div>
          <h2>Behind the name.</h2>
          <p>
            Publicly known as Alpekan Films. The registered trade name on the
            business certificate is Aplekan Films.
          </p>
          <dl className="company-facts">
            {[
              ["Legal name", company.legalName],
              ["Registered trade name", company.registeredTradeName],
              ["Public name", company.name],
              ["Legal form", company.legalForm],
              ["NUI / Fiscal number", company.fiscalNumber],
              ["Registration date", company.registrationDate],
              ["Owner & managing director", company.founder],
              ["Address", company.address],
            ].map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <details className="registered-activities">
            <summary>Registered activities</summary>
            <p>
              Film, video and television programme production (main activity);
              film projection (secondary activity); film, video and television
              post-production and distribution. Other registered activities
              include specialised design, photography, artistic creation and
              reproduction of recorded media.
            </p>
          </details>
        </div>
      </section>
    </div>
  );
}
