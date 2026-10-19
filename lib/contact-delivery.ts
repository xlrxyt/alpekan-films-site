type DeliveryOptions = {
  formId: string | null;
  transport?: typeof fetch;
};

function reply(status: number, message: string) {
  return Response.json(
    { ok: false, message },
    { status, headers: { "Cache-Control": "no-store" } },
  );
}

export async function handleContactRequest(
  request: Request,
  options: DeliveryOptions,
) {
  // Browser submissions must originate on this deployment, including its Vercel previews.
  const origin = request.headers.get("origin");
  const expectedHost = request.headers.get("host") ?? new URL(request.url).host;
  let sameOrigin = false;
  try {
    const url = new URL(origin ?? "");
    sameOrigin =
      ["https:", "http:"].includes(url.protocol) &&
      url.origin === origin &&
      url.host === expectedHost;
  } catch {
    /* Missing or malformed browser origin. */
  }
  if (!sameOrigin) {
    return reply(
      403,
      "Please send your inquiry from the website’s contact page.",
    );
  }
  if (
    request.headers.get("content-type")?.split(";")[0].trim() !==
    "application/json"
  ) {
    return reply(415, "Please use the contact form to send your inquiry.");
  }
  if (!options.formId || !/^[a-z0-9]{6,32}$/i.test(options.formId)) {
    return reply(
      503,
      "Online sending isn’t available yet. Please email filmsalpekan@gmail.com.",
    );
  }

  // Bound the body before parsing, including requests without Content-Length.
  let payload: unknown;
  const reader = request.body?.getReader();
  if (!reader) return reply(400, "Please complete the contact form.");
  try {
    const chunks: Uint8Array[] = [];
    let bytes = 0;
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      if (bytes > 24000) {
        await reader.cancel();
        return reply(
          413,
          "Your inquiry is too long. Please shorten it and try again.",
        );
      }
      chunks.push(value);
    }
    const body = new Uint8Array(bytes);
    let offset = 0;
    for (const chunk of chunks) {
      body.set(chunk, offset);
      offset += chunk.length;
    }
    payload = JSON.parse(new TextDecoder().decode(body));
  } catch {
    return reply(400, "We couldn’t read your inquiry. Please try again.");
  } finally {
    reader.releaseLock();
  }
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return reply(400, "Please complete the contact form.");
  }
  const input = payload as Record<string, unknown>;
  const limits = {
    name: 120,
    email: 254,
    company: 180,
    service: 120,
    budget: 120,
    message: 6000,
    website: 200,
  };
  const values: Record<string, string> = {};
  for (const [key, limit] of Object.entries(limits)) {
    const value = input[key] ?? "";
    if (
      typeof value !== "string" ||
      value.length > limit ||
      (key !== "message" && /[\r\n\u0000]/.test(value))
    ) {
      return reply(400, "Please check your form fields and try again.");
    }
    values[key] = value.trim();
  }
  if (
    !values.name ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) ||
    values.message.length < 10 ||
    values.website
  ) {
    return reply(
      400,
      "Please enter your name, a valid email address and at least 10 characters about your project.",
    );
  }

  try {
    const response = await (options.transport ?? fetch)(
      `https://formspree.io/f/${options.formId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Origin: origin!,
          Referer: `${origin}/contact`,
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          company: values.company || "Not provided",
          service: values.service || "General project inquiry",
          budget: values.budget || "To be discussed",
          message: values.message,
          _subject: `${values.service || "Project"} inquiry — Alpekan Films`,
          _gotcha: "",
        }),
        signal: AbortSignal.timeout(12000),
        cache: "no-store",
        redirect: "error",
      },
    );
    if (response.status === 429)
      return reply(
        429,
        "We’ve received too many requests. Please wait a little, or email filmsalpekan@gmail.com.",
      );
    if (!response.ok)
      return reply(
        502,
        "We couldn’t confirm your inquiry was sent. Your details are still here; please try again or email filmsalpekan@gmail.com.",
      );
    // Accept only the provider's explicit JSON acknowledgement, never an HTML redirect or challenge.
    const receipt: unknown = await response.json();
    if (
      !receipt ||
      typeof receipt !== "object" ||
      !("ok" in receipt) ||
      receipt.ok !== true
    ) {
      return reply(
        502,
        "We couldn’t confirm your inquiry was sent. Please email filmsalpekan@gmail.com if this continues.",
      );
    }
    return Response.json(
      { ok: true },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return reply(
      502,
      "We couldn’t confirm your inquiry was sent. Please try again or email filmsalpekan@gmail.com. Your form details haven’t been cleared.",
    );
  }
}
