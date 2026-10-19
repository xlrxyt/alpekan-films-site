"use client";
import { Arrow } from "@/components/arrow";

import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import { company } from "@/lib/company";
import { packages } from "@/lib/content";
export function ContactForm({
  directSubmission = false,
}: {
  directSubmission?: boolean;
}) {
  const query = useSearchParams();
  const requested = query.get("package") ?? "";
  const initial = packages.some((p) => p.name === requested) ? requested : "";
  const [selected, setSelected] = useState(initial);
  const [subject, setSubject] = useState("Project inquiry — Alpekan Films");
  const [summary, setSummary] = useState("");
  const [feedback, setFeedback] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const pending = useRef(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    setSent(false);
    setError("");
    if (directSubmission) {
      pending.current = true;
      setSending(true);
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: data.get("name"),
            email: data.get("email"),
            company: data.get("company"),
            service: packages.some((p) => p.name === data.get("package"))
              ? `${data.get("package")} — social media content`
              : data.get("package"),
            budget: data.get("budget"),
            message: data.get("message"),
            website: data.get("website"),
          }),
          signal: AbortSignal.timeout(20000),
        });
        const result = await response.json();
        if (!response.ok || result.ok !== true) {
          setError(
            typeof result.message === "string"
              ? result.message
              : "We couldn’t confirm your inquiry was sent. Please try again or email us directly.",
          );
          return;
        }
        setSent(true);
        form.reset();
        setSelected(initial);
      } catch {
        setError(
          "We couldn’t confirm your inquiry was sent. Your details are still here; please try again or email filmsalpekan@gmail.com.",
        );
      } finally {
        pending.current = false;
        setSending(false);
      }
      return;
    }
    const text = [
      "ALPEKAN FILMS — PROJECT INQUIRY",
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Company: ${data.get("company") || "Not provided"}`,
      packages.some((p) => p.name === data.get("package"))
        ? `Package: ${data.get("package")} (social media content)`
        : `Service: ${data.get("package") || "General project inquiry"}`,
      `Budget: ${data.get("budget") || "To be discussed"}`,
      "",
      String(data.get("message")),
    ].join("\n");
    setSubject(`${data.get("package") || "Project"} inquiry — Alpekan Films`);
    setSummary(text);
    setFeedback("");
  }
  async function copy() {
    try {
      await navigator.clipboard.writeText(summary);
      setFeedback("Inquiry copied. Nothing has been sent.");
    } catch {
      setFeedback(
        "Copy isn’t available here. Select and copy the inquiry text below.",
      );
    }
  }
  function download() {
    const url = URL.createObjectURL(
      new Blob([summary], { type: "text/plain;charset=utf-8" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "alpekan-films-inquiry.txt";
    a.click();
    URL.revokeObjectURL(url);
    setFeedback("Inquiry downloaded. Nothing has been sent.");
  }
  return (
    <form className="contact-form" onSubmit={submit} aria-busy={sending}>
      <div className="form-intro">
        <h2>Tell us what you have in mind.</h2>
        <p>
          {directSubmission ? (
            <>
              Send your project inquiry here and we’ll reply by email. There’s
              no need to open an email app.
            </>
          ) : (
            <>
              Prepare your inquiry below, then open it in your email app to send
              it to {company.email}. You can also copy or download it.
            </>
          )}
        </p>
      </div>
      <fieldset className="inquiry-fields" disabled={sending}>
        <div className="contact-trap" aria-hidden="true">
          <label>
            Leave this field empty
            <input
              name="website"
              tabIndex={-1}
              autoComplete="off"
              maxLength={200}
            />
          </label>
        </div>
        <div className="form-row">
          <label>
            Your name <span>*</span>
            <input
              name="name"
              autoComplete="name"
              required
              maxLength={120}
              placeholder="Name & surname"
            />
          </label>
          <label>
            Email address <span>*</span>
            <input
              type="email"
              name="email"
              autoComplete="email"
              required
              maxLength={254}
              placeholder="you@example.com"
            />
          </label>
        </div>
        <label>
          Company / organisation
          <input
            name="company"
            autoComplete="organization"
            maxLength={180}
            placeholder="Optional"
          />
        </label>
        <label>
          Interested in
          <select
            name="package"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            <option value="">General project inquiry</option>
            <optgroup label="Project-based productions">
              <option value="Film production">
                Film production — project-based quote
              </option>
              <option value="Music video">
                Music video — project-based quote
              </option>
              <option value="Commercial">
                Commercial — project-based quote
              </option>
              <option value="Theatre / audiovisual">
                Theatre / audiovisual — project-based quote
              </option>
            </optgroup>
            <optgroup label="Social media content packages">
              {packages.map((p) => (
                <option key={p.name} value={p.name}>
                  {p.name} — social media — {p.videos} — {p.price}
                </option>
              ))}
            </optgroup>
          </select>
        </label>
        <label>
          Available budget (optional)
          <input
            name="budget"
            maxLength={120}
            placeholder="Your budget or range, with currency"
          />
        </label>
        <label>
          Your project <span>*</span>
          <textarea
            name="message"
            required
            minLength={10}
            maxLength={6000}
            rows={5}
            placeholder="Your idea, format, timing and production needs. Tell us a little about it."
          />
        </label>
        <p className="form-privacy">
          Required fields are marked *.{" "}
          {directSubmission ? (
            <>
              Submitting shares your contact details and inquiry with Alpekan
              Films through Formspree so we can respond to your request. Please
              don’t include sensitive information.
            </>
          ) : (
            <>
              Preparing an inquiry keeps your details in this browser. “Open
              email app” passes the draft to your email app, where you review
              and send it.
            </>
          )}
        </p>
        <button className="button light" type="submit">
          {sending
            ? "Sending…"
            : directSubmission
              ? "Send inquiry"
              : "Prepare inquiry"}{" "}
          <span aria-hidden="true">
            <Arrow />
          </span>
        </button>
      </fieldset>
      {error && (
        <p className="contact-error" role="alert">
          {error}
        </p>
      )}
      {sent && (
        <section className="inquiry-result" role="status">
          <h3>Inquiry submitted.</h3>
          <p>
            Thank you for getting in touch with Alpekan Films. We’ll reply by
            email.
          </p>
        </section>
      )}
      {summary && (
        <section className="inquiry-result" aria-live="polite">
          <h3>Your inquiry is ready.</h3>
          <p>
            Nothing has been sent. Open your email app, review the draft and
            press Send there. If an email app isn’t configured or the draft is
            too long to open, copy the text and email it to {company.email}.
          </p>
          <textarea
            aria-label="Prepared inquiry"
            value={summary}
            readOnly
            rows={10}
          />
          <a
            className="button light email-draft-link"
            href={`mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(summary)}`}
          >
            Open email app <Arrow />
          </a>
          <div className="result-actions">
            <button type="button" className="button" onClick={copy}>
              Copy inquiry <Arrow />
            </button>
            <button type="button" className="button" onClick={download}>
              Download .txt ↓
            </button>
          </div>
          <p role="status">{feedback}</p>
        </section>
      )}
    </form>
  );
}
