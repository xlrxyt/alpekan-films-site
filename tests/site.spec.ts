import { test, expect } from "@playwright/test";
// Deterministic thumbnail fixture: external media availability is checked separately on deployment.
test.beforeEach(async ({ page }) => {
  await page.route("https://i.ytimg.com/**", (route) =>
    route.fulfill({
      path: "public/images/film.svg",
      contentType: "image/svg+xml",
    }),
  );
});

test("all main pages render with no overflow or missing images", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const path of [
    "/",
    "/work",
    "/services",
    "/social-media-production",
    "/about",
    "/contact",
  ]) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    for (const image of await page.locator("img").all()) {
      await image.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          image.evaluate(
            (element) =>
              element instanceof HTMLImageElement &&
              element.complete &&
              element.naturalWidth > 0,
          ),
        )
        .toBe(true);
    }
  }
  expect(errors).toEqual([]);
});

test("work filters show actual projects and honest empty categories", async ({
  page,
}) => {
  await page.goto("/work");
  await expect(page.locator(".project-card")).toHaveCount(7);
  for (const [category, count] of [
    ["Films", 6],
    ["Music Videos", 1],
    ["Commercials", 0],
    ["Theatre/Audiovisual", 0],
  ] as const) {
    await page.getByRole("button", { name: category, exact: true }).click();
    await expect(page.locator(".project-card")).toHaveCount(count);
    await expect(page.getByRole("status")).toContainText(category);
    if (count === 0) await expect(page.locator(".empty-work")).toBeVisible();
  }
  await page.getByRole("button", { name: "All" }).click();
  await expect(page.locator(".project-card")).toHaveCount(7);
});

test("each supplied project has its own metadata, credits and click-to-play embed", async ({
  page,
}) => {
  const items = [
    ["chronicles-of-sonatine", "Uhpz6Jbs9zE", "2025", "39 minutes"],
    ["fortress-mp4", "IvD9FJ4sjuw", "2024", "4 minutes"],
    ["moonshine", "JfQ4jzuNwiE", "2022", "16 minutes"],
    ["isekai", "4iaGSJeEDdg", "2021", "13 minutes"],
    ["goditja", "-Cm3vjTCNvk", "2020", "6 minutes"],
    ["abdullah-gerguri", "Knf3F2iNDPE", "2022", "15 minutes"],
    ["fiona-abdullahu-dardha-tbuta", "hUmk85wkCS4", "2026", null],
  ];
  // Test the embed integration without depending on YouTube availability or playback.
  await page.route("https://www.youtube-nocookie.com/**", (route) =>
    route.fulfill({
      contentType: "text/html",
      body: "<p>Embed integration test</p>",
    }),
  );
  for (const [slug, id, year, runtime] of items) {
    expect((await page.goto(`/work/${slug}`))?.status()).toBe(200);
    await expect(page.locator(".project-info")).toContainText(year!);
    if (runtime)
      await expect(page.locator(".project-info")).toContainText(runtime);
    await expect(page.locator(".project-info")).toContainText("Alper Zilgir");
    await expect(page.locator("iframe")).toHaveCount(0);
    await page.getByRole("button", { name: /^Play / }).click();
    await expect(page.locator("iframe")).toHaveAttribute(
      "src",
      `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`,
    );
    await expect(
      page.getByRole("link", { name: "Watch on YouTube" }),
    ).toHaveAttribute("href", `https://www.youtube.com/watch?v=${id}`);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  }
  await expect(page.locator(".project-info")).toContainText("Alpekan Films");
});

test("unavailable YouTube thumbnails fall back to the project title", async ({
  page,
}) => {
  await page.route("https://i.ytimg.com/**", (route) => route.abort());
  await page.goto("/work");
  for (const card of await page.locator(".project-card").all()) {
    await card.scrollIntoViewIfNeeded();
    await expect(card.locator(".thumbnail-fallback")).toBeVisible();
  }
  await expect(page.locator(".thumbnail-fallback")).toHaveCount(7);
  await expect(page.locator(".project-card").first()).toContainText(
    "Chronicles of Sonatine",
  );
});

test("all package requests prefill contact with correct selection", async ({
  page,
}) => {
  for (const [name, price] of [
    ["Essential", "€280"],
    ["Growth", "€600"],
    ["Premium", "€970"],
    ["Custom", "From €1,000"],
  ]) {
    await page.goto("/social-media-production");
    const card = page
      .locator(".package-card")
      .filter({ has: page.getByRole("heading", { name, exact: true }) });
    await expect(card).toContainText(price);
    await card.getByRole("link", { name: "Request This Package" }).click();
    await expect(page.getByLabel("Interested in")).toHaveValue(name);
  }
});

test("inquiry validation and downloadable draft preserve entered data", async ({
  page,
}) => {
  await page.goto("/contact?package=Growth");
  await page.getByRole("button", { name: "Prepare inquiry" }).click();
  await expect(
    page.getByRole("heading", { name: "Your inquiry is ready." }),
  ).toHaveCount(0);
  await page.getByLabel("Your name").fill("Test Person");
  await page.getByLabel("Email address").fill("test@example.com");
  await page
    .getByLabel("Your project")
    .fill("We would like to discuss a short film.");
  await page.getByRole("button", { name: "Prepare inquiry" }).click();
  await expect(page.getByLabel("Prepared inquiry")).toHaveValue(
    /Package: Growth/,
  );
  await expect(page.getByLabel("Prepared inquiry")).toHaveValue(/Test Person/);
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download .txt" }).click();
  expect((await downloadPromise).suggestedFilename()).toBe(
    "alpekan-films-inquiry.txt",
  );
  await expect(page.getByRole("status")).toContainText(
    "Nothing has been sent.",
  );
  await page.goto("/contact?package=Unknown");
  await expect(page.getByLabel("Interested in")).toHaveValue("");
});

test("navigation works, including the mobile menu", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  if (isMobile) {
    await page.getByRole("button", { name: "Menu +" }).click();
    await expect(page.getByRole("button", { name: "Close −" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
  }
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "About", exact: true })
    .click();
  await expect(page).toHaveURL(/\/about$/);
  if (isMobile)
    await expect(page.getByRole("button", { name: "Menu +" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  await page.getByRole("link", { name: "Alpekan Films home" }).click();
  await expect(page).toHaveURL("/");
});

test("unknown projects return a real 404", async ({ page }) => {
  const response = await page.goto("/work/not-a-project");
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { name: "A missing scene." }),
  ).toBeVisible();
});
