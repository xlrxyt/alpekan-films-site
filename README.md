# Alpekan Films

A responsive, monochrome public website for an independent film and audiovisual production company in Prishtina, Kosovo. Built with Next.js App Router, TypeScript and plain responsive CSS. All artwork is original SVG placeholder artwork included in this repository; no external image or font service is required.

## Local preview

Use Node.js 24 LTS and npm (Node.js 20.9+ is supported by Next.js).

```sh
npm ci
npm run dev
```

Open `http://localhost:3000` in your local browser. In a cloud workspace, use the editor's forwarded port / preview for port **3000** if available. The server binds to `0.0.0.0`. No environment variables, credentials or database are required.

If the default npm cache isn't writable, use `npm ci --cache /tmp/alpekan-npm-cache`.

For a production preview:

```sh
npm run build
npm start
```

## Checks

```sh
npm run lint
npm run typecheck
npm run build
npx playwright install chromium
npm test
```

Browser tests start a production server on port 3100 and require a completed build. If Chromium is already installed, use `CHROMIUM_PATH=/usr/bin/chromium npm test` instead of downloading a browser. Tests cover six main routes, desktop/mobile layout, navigation, all work filters and project pages, all four package links, form validation, inquiry downloads and true 404 responses.

## Content and pages

- `/` — company introduction, placeholder portfolio preview and production packages link
- `/work` — filterable project grid: Films, Music Videos, Commercials, Theatre/Audiovisual
- `/work/[slug]` — individual placeholder project pages with video space, image, description and credits
- `/services` — film, music video, commercial, theatre/audiovisual and social video production
- `/social-media-production` — Essential (€280 / 4 videos monthly), Growth (€600 / 8), Premium (€970 / 12), Custom (from €1,000)
- `/about` — supplied company information, clearly identified slots for future content
- `/contact` — package-prefilled inquiry draft form

Edit `lib/content.ts` to update portfolio entries, packages and services. Artwork lives in `public/images/`; replace it with official media and update image dimensions/alt text as appropriate. The project template in `app/work/[slug]/page.tsx` contains deliberately unfilled descriptions, video and credits. Add verified project-specific data and a licensed video source before replacing these placeholders. Placeholder project pages have `noindex` metadata.

## Contact behavior and launch checklist

No email address, phone number, client, project credit or team member has been invented. The contact form explicitly **does not send**. It validates required fields, preserves a selected package from `?package=Essential` (or Growth, Premium, Custom), and prepares an inquiry that can be copied or downloaded. Form data stays in browser memory and is not stored or transmitted. Clipboard support depends on browser permissions; downloading and manual copying remain available.

Before public launch, provide official company assets, portfolio projects and rights-cleared media, contact details, and confirmed company copy. To receive inquiries, supply a verified recipient and implement a delivery service with server-side validation, spam protection, privacy disclosures and a tested success/error flow. Confirm tax treatment and package scope with the business; neither is assumed by this site. Shooting schedules depend on production requirements. Social media account management is not offered.

The UnderWonder reference could not be reached from the build environment. The design interprets the requested cinematic, minimalist black-and-white direction with oversized typography and a conventional scrolling grid.
