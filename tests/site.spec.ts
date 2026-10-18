import { test, expect } from "@playwright/test";

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

test("work filters isolate each category and project pages work", async ({
  page,
}) => {
  await page.goto("/work");
  await expect(page.locator(".project-card")).toHaveCount(4);
  for (const category of [
    "Films",
    "Music Videos",
    "Commercials",
    "Theatre/Audiovisual",
  ]) {
    await page.getByRole("button", { name: category, exact: true }).click();
    await expect(page.locator(".project-card")).toHaveCount(1);
    await expect(page.getByRole("status")).toContainText(category);
    await page.locator(".project-card").click();
    await expect(
      page.getByRole("heading", { name: "Space for the film." }),
    ).toBeVisible();
    await expect(page.getByText("CREDITS / TO BE CONFIRMED")).toBeVisible();
    await page.getByRole("link", { name: "← Back to work" }).click();
  }
  await page.getByRole("button", { name: "All" }).click();
  await expect(page.locator(".project-card")).toHaveCount(4);
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
