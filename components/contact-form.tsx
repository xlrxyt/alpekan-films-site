"use client";
import { Arrow } from "@/components/arrow";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { company } from "@/lib/company";
import { packages } from "@/lib/content";
export function ContactForm() {
  const query = useSearchParams();
  const requested = query.get("package") ?? "";
  const initial = packages.some((p) => p.name === requested) ? requested : "";
  const [selected, setSelected] = useState(initial);
  const [subject, setSubject] = useState("Project inquiry — Alpekan Films");
  const [summary, setSummary] = useState("");
  const [feedback, setFeedback] = useState("");
  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const text = [
      "ALPEKAN FILMS — PROJECT INQUIRY",
      `Name: ${data.get("name")}`,
      `Email: ${data.get("email")}`,
      `Company: ${data.get("company") || "Not provided"}`,
      `Package: ${data.get("package") || "General inquiry"}`,
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
    <form className="contact-form" onSubmit={submit}>
      <div className="form-intro">
        <h2>Tell us what you have in mind.</h2>
        <p>
          Prepare your inquiry below, then open it in your email app to send it
          to {company.email}. You can also copy or download it. This website
          does not send messages automatically.
        </p>
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
          {packages.map((p) => (
            <option key={p.name} value={p.name}>
              {p.name} — {p.videos} — {p.price}
            </option>
          ))}
        </select>
      </label>
      <label>
        Your project <span>*</span>
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={6000}
          rows={5}
          placeholder="The idea, the format, your timing. Tell us a little about it."
        />
      </label>
      <p className="form-privacy">
        Required fields are marked *. Preparing an inquiry keeps your details in
        this browser. Choosing “Open email app” passes the draft to your email
        app, where you review and send it.
      </p>
      <button className="button light" type="submit">
        Prepare inquiry{" "}
        <span aria-hidden="true">
          <Arrow />
        </span>
      </button>
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
