import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm } from "@/components/contact-form";
export const metadata: Metadata = { title: "Contact" };
export default function Contact() {
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
          <dl className="contact-details">
            <div>
              <dt>LOCATION</dt>
              <dd>Prishtina, Kosovo</dd>
            </div>
            <div>
              <dt>EMAIL & PHONE</dt>
              <dd>
                Official contact details
                <br />
                to be supplied.
              </dd>
            </div>
            <div>
              <dt>FOR SOCIAL PRODUCTION</dt>
              <dd>
                Shooting schedules depend
                <br />
                on production requirements.
              </dd>
            </div>
          </dl>
        </aside>
        <Suspense fallback={<p>Loading inquiry form…</p>}>
          <ContactForm />
        </Suspense>
      </div>
    </div>
  );
}
