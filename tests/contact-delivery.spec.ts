import { test, expect } from "@playwright/test";
import { handleContactRequest } from "../lib/contact-delivery";

const valid = {
  name: "Test Person",
  email: "test@example.com",
  service: "Music video",
  budget: "€2,500",
  message: "We would like to discuss a production.",
  website: "",
};
function inquiry(body: unknown, origin = "https://alpekanfilms.vercel.app") {
  return new Request("https://alpekanfilms.vercel.app/api/contact", {
    method: "POST",
    headers: { origin, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

test("delivery sends validated fields to the configured form and requires acknowledgement", async () => {
  let calls = 0;
  const transport: typeof fetch = async (url, init) => {
    calls++;
    expect(String(url)).toBe("https://formspree.io/f/testform");
    const payload = JSON.parse(String(init?.body));
    expect(payload.email).toBe("test@example.com");
    expect(payload.service).toBe("Music video");
    expect(payload.budget).toBe("€2,500");
    expect(payload._subject).toBe("Music video inquiry — Alpekan Films");
    expect(payload.to).toBeUndefined();
    expect(payload.company).toBe("Not provided");
    return Response.json({ ok: true });
  };
  const response = await handleContactRequest(
    inquiry({ ...valid, to: "someone-else@example.com" }),
    { formId: "testform", transport },
  );
  expect(response.status).toBe(200);
  expect(await response.json()).toEqual({ ok: true });
  expect(calls).toBe(1);
});

test("invalid submissions never reach the email provider", async () => {
  const transport: typeof fetch = async () => {
    throw new Error("Must not contact provider");
  };
  for (const body of [
    { ...valid, email: "bad-email" },
    { ...valid, name: "  " },
    { ...valid, message: "short" },
    { ...valid, website: "spam.example.com" },
    { ...valid, email: "test@example.com\r\nBcc: someone@example.com" },
    { ...valid, name: 42 },
    { ...valid, message: "a".repeat(6001) },
  ]) {
    expect(
      (
        await handleContactRequest(inquiry(body), {
          formId: "testform",
          transport,
        })
      ).status,
    ).toBe(400);
  }
  expect(
    (
      await handleContactRequest(
        inquiry(valid, "https://another-site.example"),
        { formId: "testform", transport },
      )
    ).status,
  ).toBe(403);
  expect(
    (await handleContactRequest(inquiry(valid), { formId: null, transport }))
      .status,
  ).toBe(503);
  expect(
    (
      await handleContactRequest(
        inquiry({ ...valid, message: "a".repeat(25000) }),
        { formId: "testform", transport },
      )
    ).status,
  ).toBe(413);
});

test("provider rejection, quota and uncertain responses cannot report success", async () => {
  for (const [providerResponse, expectedStatus] of [
    [Response.json({ error: "account not activated" }, { status: 403 }), 502],
    [Response.json({ error: "quota" }, { status: 429 }), 429],
    [Response.json({ ok: false }), 502],
    [new Response("<html>Verification required</html>"), 502],
  ] as const) {
    const response = await handleContactRequest(inquiry(valid), {
      formId: "testform",
      transport: async () => providerResponse,
    });
    expect(response.status).toBe(expectedStatus);
    expect((await response.json()).ok).toBe(false);
  }
  const failed = await handleContactRequest(inquiry(valid), {
    formId: "testform",
    transport: async () => {
      throw new Error("timeout");
    },
  });
  expect(failed.status).toBe(502);
});

test("unconfigured production endpoint does not pretend to send", async ({
  request,
}) => {
  const response = await request.post("/api/contact", {
    headers: { origin: "http://127.0.0.1:3100" },
    data: valid,
  });
  expect(response.status()).toBe(503);
  expect((await response.json()).ok).toBe(false);
  const crossOrigin = await request.post("/api/contact", {
    headers: { origin: "https://unrelated.example" },
    data: valid,
  });
  expect(crossOrigin.status()).toBe(403);
});
