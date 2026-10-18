# Alpekan Films

A responsive, monochrome public website for an independent film and audiovisual production company in Prishtina, Kosovo. Built with Next.js App Router, TypeScript and plain responsive CSS. The homepage landscape is original SVG placeholder artwork. Project thumbnails load from YouTube, and videos load the YouTube privacy-enhanced player only after a visitor presses Play. No external font service is required.

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

- `/` — company introduction, selected films/music video and production packages link
- `/work` — filterable project grid: Films, Music Videos, Commercials, Theatre/Audiovisual
- `/work/[slug]` — individual project pages with a click-to-play YouTube video, description, year, runtime where supplied, and credits
- `/services` — film, music video, commercial, theatre/audiovisual and social video production
- `/social-media-production` — Essential (€280 / 4 videos monthly), Growth (€600 / 8), Premium (€970 / 12), Custom (from €1,000)
- `/about` — company profile, founder biography, professional experience and registered business details
- `/contact` — official contact links and package-prefilled inquiry draft with an email-app handoff

Edit `lib/content.ts` to update portfolio entries, packages and services. Artwork lives in `public/images/`; replace it with official media and update image dimensions/alt text as appropriate. Seven supplied projects are defined in `lib/content.ts`: six films and one music video. The supplied roles are credited to Alper Zilgir; Alpekan Films is credited for production and post-production on the Fiona Abdullahu music video only. English descriptions translate the supplied Albanian project notes. Commercials and Theatre/Audiovisual currently show an honest empty state. Add further verified credits and rights-cleared stills as available.

## Contact behavior and launch checklist

No email address, phone number, client or credit has been invented. The contact form explicitly **does not send automatically**. It validates required fields, preserves a selected package from `?package=Essential` (or Growth, Premium, Custom), and prepares an inquiry that can be copied, downloaded or opened in the visitor’s email app addressed to filmsalpekan@gmail.com. The visitor reviews and sends it in their email app. Preparing a draft stays local; choosing the email action hands the draft to the configured mail client. Long drafts or devices without a configured mail client can use copy/download and the published email address. Clipboard support depends on browser permissions; downloading and manual copying remain available.

Before public launch, provide the original downloadable logo file and additional rights-cleared images. For automatic submission directly from the website, configure an email delivery service with server-side validation, spam protection, privacy disclosures and a tested success/error flow. Confirm tax treatment and package scope with the business; neither is assumed by this site. Shooting schedules depend on production requirements. Social media account management is not offered.

The UnderWonder reference could not be reached from the build environment. The design interprets the requested cinematic, minimalist black-and-white direction with oversized typography and a conventional scrolling grid.

## Vercel deployment

`vercel.json` explicitly selects the Next.js framework, installs with `npm ci`, builds with `npm run build`, and uses `.next` as its output. This overrides stale framework/build/output defaults from a project created before the repository contained an application.

Connect this repository's `main` branch and leave the Vercel **Root Directory** at the repository root (blank or `.`). After a push, open the newest deployment and use its **Visit** button; an older deployment URL continues to reference the older build. A Ready status confirms deployment processing, but check the actual homepage and navigation before treating a deployment as working.

## YouTube media

Each project stores only its YouTube video ID, without share-tracking parameters. Thumbnail images load from `i.ytimg.com`; if unavailable, the card displays the project title on a neutral background. Pressing Play loads `www.youtube-nocookie.com/embed/<id>` with fullscreen support. A direct YouTube link remains available if the owner disallows embedding or playback is restricted. Playing videos connects to YouTube; thumbnail requests also connect to YouTube’s image service. No video binaries are stored in Git.

Browser tests verify all seven routes, supplied years/runtimes and Alper Zilgir credits, each embed URL, click-to-load behavior, direct YouTube links, thumbnail fallback, category counts and empty states. Embed responses are mocked in those tests; actual YouTube playback, ownership and embedding permissions must be checked on the deployed website. The development environment blocks access to YouTube’s thumbnail host, so real thumbnails and playback could not be verified here.

## Company copy and contact details

`lib/company.ts` is the single source for official email, phone, Instagram, registered name, fiscal number and address. About translates the supplied Albanian biography and company profile into English. Alper Zilgir’s collaborations through Imagine Films, Onima and Tatamata are described as his professional experience and are not presented as Alpekan Films clients. The registered trade name **Aplekan Films** is deliberately preserved, alongside the public name **Alpekan Films**. The registration date is rendered as 12 July 2024. No portrait or logo has been recreated; the chat image must be supplied as an accessible original file before replacing the header wordmark.
