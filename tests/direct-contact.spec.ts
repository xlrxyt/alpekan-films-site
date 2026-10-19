import { test, expect } from "@playwright/test";
test.use({ baseURL: "http://127.0.0.1:3101" });
async function fill(page: import("@playwright/test").Page) {
  await page.goto("/contact?package=Growth");
  await page.getByLabel("Your name").fill("Test Person");
  await page.getByLabel("Email address").fill("test@example.com");
  await page.getByLabel("Available budget").fill("€600");
  await page
    .getByLabel("Your project")
    .fill("We would like a social media production.");
}

test("direct submission stays on the website and prevents duplicate sends", async ({
  page,
}) => {
  let calls = 0;
  let release: () => void = () => {};
  const waiting = new Promise<void>((resolve) => {
    release = resolve;
  });
  await page.route("**/api/contact", async (route) => {
    calls++;
    const payload = route.request().postDataJSON();
    expect(payload.service).toBe("Growth — social media content");
    expect(payload.email).toBe("test@example.com");
    expect(payload.budget).toBe("€600");
    await waiting;
    await route.fulfill({ json: { ok: true } });
  });
  await fill(page);
  await page.getByRole("button", { name: "Send inquiry" }).click();
  await expect(page.getByRole("button", { name: "Sending…" })).toBeDisabled();
  await expect(page.getByLabel("Your project")).toBeDisabled();
  release();
  await expect(
    page.getByRole("heading", { name: "Inquiry submitted." }),
  ).toBeVisible();
  expect(calls).toBe(1);
  await expect(page.getByLabel("Your project")).toHaveValue("");
  await expect(page).toHaveURL(/\/contact\?package=Growth$/);
  await expect(page.getByRole("link", { name: "Open email app" })).toHaveCount(
    0,
  );
});

test("rejected or interrupted submissions preserve the message and show no success", async ({
  page,
}) => {
  await page.route("**/api/contact", (route) =>
    route.fulfill({
      status: 502,
      json: {
        ok: false,
        message: "We couldn’t confirm your inquiry was sent. Please try again.",
      },
    }),
  );
  await fill(page);
  await page.getByRole("button", { name: "Send inquiry" }).click();
  await expect(page.locator(".contact-error[role=alert]")).toContainText(
    "couldn’t confirm",
  );
  await expect(page.getByLabel("Your project")).toHaveValue(
    "We would like a social media production.",
  );
  await expect(
    page.getByRole("heading", { name: "Inquiry submitted." }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "Send inquiry" }),
  ).toBeEnabled();
  await page.route("**/api/contact", (route) => route.abort());
  await page.getByRole("button", { name: "Send inquiry" }).click();
  await expect(page.locator(".contact-error[role=alert]")).toContainText(
    "details are still here",
  );
  await expect(page.getByLabel("Your name")).toHaveValue("Test Person");
});

test("required fields block sending before any network request", async ({
  page,
}) => {
  let calls = 0;
  await page.route("**/api/contact", (route) => {
    calls++;
    return route.fulfill({ json: { ok: true } });
  });
  await page.goto("/contact");
  await page.getByRole("button", { name: "Send inquiry" }).click();
  expect(calls).toBe(0);
  await expect(
    page.getByRole("heading", { name: "Inquiry submitted." }),
  ).toHaveCount(0);
});
