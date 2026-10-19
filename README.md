# Alpekan Films

A responsive, monochrome public website for an independent film and audiovisual production company in Prishtina, Kosova. Built with Next.js App Router, TypeScript and plain responsive CSS. The homepage features the supplied behind-the-scenes photograph from Chronicles of Sonatine, with a link to its project page. Project thumbnails load from YouTube, and videos load the YouTube privacy-enhanced player only after a visitor presses Play. No external font service is required.

## Local preview

Use Node.js 24 LTS and npm (Node.js 20.9+ is supported by Next.js).

```sh
npm ci
npm run dev
```

Open `http://localhost:3000` in your local browser. In a cloud workspace, use the editor's forwarded port / preview for port **3000** if available. The server binds to `0.0.0.0`. No credentials or database are required to browse and develop the site. Direct inquiry delivery needs an activated Formspree form as described below.

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

Browser tests start production servers on ports 3100 (unconfigured fallback) and 3101 (configured form using mocked submission responses), and require a completed build. If Chromium is already installed, use `CHROMIUM_PATH=/usr/bin/chromium npm test` instead of downloading a browser. Tests cover six main routes, desktop/mobile layout, navigation, all work filters and project pages, all four package links, form validation, inquiry downloads, direct submission success/error handling, duplicate-send prevention, server validation, provider failures and true 404 responses. No real email is sent by tests.

## Content and pages

- `/` — company introduction, selected films/music video and production packages link
- `/work` — filterable project grid: Films, Music Videos, Commercials, Theatre/Audiovisual
- `/work/[slug]` — individual project pages with a click-to-play YouTube video, description, year, runtime where supplied, and credits
- `/services` — film, music video, commercial, theatre/audiovisual and social video production
- `/social-media-production` — Essential (€280 / 4 videos monthly), Growth (€600 / 8), Premium (€970 / 12), Custom (from €1,000)
- `/about` — company profile, founder biography, professional experience and registered business details
- `/contact` — official contact links and package-prefilled inquiry form; sends directly when delivery is configured, with the existing email draft mode retained until then

Edit `lib/content.ts` to update portfolio entries, packages and services. Artwork lives in `public/images/`; replace it with official media and update image dimensions/alt text as appropriate. Seven supplied projects are defined in `lib/content.ts`: six films and one music video. The supplied roles are credited to Alper Zilgir; Alpekan Films is credited for production and post-production on the Fiona Abdullahu music video only. English descriptions translate the supplied Albanian project notes. Commercials and Theatre/Audiovisual currently show an honest empty state. Add further verified credits and rights-cleared stills as available.

## Contact behavior and launch checklist

No email address, client or credit has been invented. The contact form preserves a selected social media package and supports individual productions and optional budgets. Once an activated Formspree form is configured, it sends an AJAX request to the same-origin `/api/contact` endpoint, which validates and forwards the inquiry to the configured Formspree form. Formspree delivers notifications to the recipient selected in its dashboard. The visitor remains on the website; an email app does not open. The sender’s `email` field is passed so replies can be addressed to the client.

The owner-supplied form `mgaobllp` is now configured in `lib/contact-config.ts`, so deployed clients see “Send inquiry.” If delivery is explicitly disabled (an empty `FORMSPREE_FORM_ID`) or the ID is removed, the form retains its existing draft, copy/download and email-app handoff behavior. Unconfigured API requests fail with HTTP 503 instead of claiming delivery. In direct mode, the form displays a sending state, blocks duplicate clicks, preserves input on failure, and clears it only after the server receives an explicit provider acknowledgement. Provider acceptance is not a guarantee of inbox placement. A pending/failed request never triggers an automatic retry.
Before public launch, provide additional rights-cleared images. Direct delivery needs the Formspree account setup below. Confirm tax treatment and package scope with the business; neither is assumed by this site. Shooting schedules depend on production requirements. Social media account management is not offered.

The UnderWonder reference could not be reached from the build environment. The design interprets the requested cinematic, minimalist black-and-white direction with oversized typography and a conventional scrolling grid.

## Vercel deployment

`vercel.json` explicitly selects the Next.js framework, installs with `npm ci`, builds with `npm run build`, and uses `.next` as its output. This overrides stale framework/build/output defaults from a project created before the repository contained an application.

Connect this repository's `main` branch and leave the Vercel **Root Directory** at the repository root (blank or `.`). After a push, open the newest deployment and use its **Visit** button; an older deployment URL continues to reference the older build. A Ready status confirms deployment processing, but check the actual homepage and navigation before treating a deployment as working.

## YouTube media

Each project stores only its YouTube video ID, without share-tracking parameters. Thumbnail images load from `i.ytimg.com`; if unavailable, the card displays the project title on a neutral background. Pressing Play loads `www.youtube-nocookie.com/embed/<id>` with fullscreen support. A direct YouTube link remains available if the owner disallows embedding or playback is restricted. Playing videos connects to YouTube; thumbnail requests also connect to YouTube’s image service. No video binaries are stored in Git.

Browser tests verify all seven routes, supplied years/runtimes and Alper Zilgir credits, each embed URL, click-to-load behavior, direct YouTube links, thumbnail fallback, category counts and empty states. Embed responses are mocked in those tests; actual YouTube playback, ownership and embedding permissions must be checked on the deployed website. The development environment blocks access to YouTube’s thumbnail host, so real thumbnails and playback could not be verified here.

## Company copy and contact details

`lib/company.ts` is the single source for official email, public location, Instagram, registered name and fiscal number. About translates the supplied Albanian biography and company profile into English. Alper Zilgir’s collaborations through Imagine Films, Onima and Tatamata are described as his professional experience and are not presented as Alpekan Films clients. The registered trade name **Aplekan Films** is deliberately preserved, alongside the public name **Alpekan Films**. The registration date is rendered as 12 July 2024. The header uses the original uploaded logo at `public/images/4a3bae79-6592-4578-981f-64e7ccaef663.png`. A responsive CSS viewport trims its surrounding black space for display and screen blending integrates the black background with the header. The source PNG is unchanged; the artwork has not been recreated. No founder portrait has been supplied.

## Contact privacy and production pricing

The public location is Prishtina, Kosova. No phone number, telephone link, street address or map coordinates are published. Email is the preferred contact route. Fixed prices and monthly packages are exclusively for social media content production, including videography and photography for posts; listed video counts are unchanged, and photo quantities are scoped individually. Films, music videos, commercials and other audiovisual productions have no fixed public rate: their approach, scope and quote are agreed around the brief and available budget. The inquiry form distinguishes project-based services from social media packages and includes an optional budget field. Social media account management is not offered.

The homepage photograph is `public/images/image00001.jpeg` (1280 × 848). Its original color is retained; the desktop banner uses a wide CSS crop while mobile shows its full proportions. The caption identifies it as behind the scenes of Chronicles of Sonatine.

## Cast and crew sources

Cast and additional crew for Isekai, Moonshine, Chronicles of Sonatine and Goditja (also known as Knockout) were transcribed from Letterboxd screenshots supplied by Alper Zilgir. Source metadata is recorded on the corresponding entries in `lib/content.ts`. Cast order follows the screenshots; no character names or unlisted roles are inferred. Other projects retain the previously supplied filmmaker/production credits. These are supplied listings, not a claim of complete end credits or independent IMDb verification. Sonatine retains the filmmaker-supplied runtime of 39 minutes; the supplied Letterboxd screenshot lists 40 minutes.


## Activate direct email delivery

1. Create a Formspree account at https://formspree.io/ using `filmsalpekan@gmail.com`, confirm the account email and create a form for Alpekan Films with notifications going to that address.
2. Copy its public endpoint, such as `https://formspree.io/f/abcdefgh`. The form ID is public configuration, not a secret or API key. The example ID is not a working endpoint.
3. This site already has the supplied ID `mgaobllp` configured in `lib/contact-config.ts`, so no Vercel environment change is required. To change it via environment settings instead, set the final path component as `FORMSPREE_FORM_ID` in Vercel project environment variables for the desired environments and redeploy. For local development, set it in an ignored `.env.local` file and restart. Alternatively, set the public `formspreeFormId` constant in `lib/contact-config.ts` and deploy; this avoids needing Vercel environment settings.
4. Verify in Formspree that the account/form is activated, the recipient is correct and the plan allows submissions. If using a domain restriction, allow `alpekanfilms.vercel.app` (and any preview domain used for testing). Keep Formspree’s spam protection enabled. Any provider challenge or account restriction must be resolved in Formspree before readiness is claimed.
5. Submit one identifiable test inquiry through the deployed Contact page. Confirm it appears in the Formspree dashboard and arrives in the Gmail inbox (check Spam). Test Reply targets the visitor’s email. Only then consider delivery verified.

No Gmail password, Gmail app password, mail API key or custom domain is needed by this integration. Never put credentials in this repository or chat. Use Formspree’s current pricing and quota information to choose a suitable plan; quota or provider rejection is surfaced as a form error, without deleting the visitor’s message.

`lib/contact-delivery.ts` enforces same-host browser origin, JSON-only requests, a bounded 24 KB request body, field types/lengths, email/message validation, single-line headers and a honeypot. It forwards only approved fields to the fixed Formspree hostname and configured form ID; a client cannot choose recipients, sender headers or a different endpoint. Requests time out; responses without explicit JSON `ok: true` are not treated as success. No message bodies are logged by the application. This is not a durable application rate limiter; Formspree’s account spam controls and usage limits remain necessary. The form explains that Formspree processes the submitted contact details and inquiry.

Tests exercise delivery with injected provider responses and simulate browser submission responses; they do not demonstrate actual account activation, recipient ownership, inbox delivery or production availability. A real endpoint has been provided, but the development environment’s egress proxy blocks `formspree.io` (HTTP CONNECT 403), including an elevated read-only connectivity attempt. No live test email was sent. Actual Formspree acknowledgement, recipient configuration, inbox delivery and Reply behavior must therefore be verified through the deployed website.
