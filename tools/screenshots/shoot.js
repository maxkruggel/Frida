const { chromium } = require('playwright');
const { buildSeed } = require('./seed');
const path = require('path');
const fs = require('fs');

/* Fährt Frida durch alle Zustände und schießt die Bereichs-Screenshots.
   Voraussetzung: die App liegt unter BASE (z. B. python3 -m http.server 8765).
   Aufruf:  node tools/screenshots/shoot.js [zielordner]                       */

const OUT = process.argv[2] || path.join(__dirname, '..', '..', 'docs', 'screenshots');
const BASE = process.env.BASE || 'http://127.0.0.1:8765/index.html';
/* PW_CHROMIUM setzen, wenn Playwright den Browser nicht selbst findet */
const EXE = process.env.PW_CHROMIUM || undefined;
const DEVICE = { width: 390, height: 844 };

fs.mkdirSync(OUT, { recursive: true });

const DAY = new Date('2026-07-29T10:20:00+02:00');
const EVENING = new Date('2026-07-29T19:40:00+02:00');

async function newCtx(browser, { seed, time = DAY, height = DEVICE.height, patchSeed } = {}) {
  const ctx = await browser.newContext({
    viewport: { width: DEVICE.width, height },
    deviceScaleFactor: 3,
    isMobile: true,
    hasTouch: true,
    locale: 'de-DE',
    timezoneId: 'Europe/Berlin',
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1',
    reducedMotion: 'no-preference'
  });
  const page = await ctx.newPage();
  await page.clock.setFixedTime(time);
  if (seed) {
    const data = buildSeed();
    if (patchSeed) patchSeed(data);
    await page.addInitScript(payload => {
      localStorage.setItem('frida_v1', JSON.stringify(payload));
    }, data);
  } else {
    await page.addInitScript(() => localStorage.clear());
  }
  return { ctx, page };
}

async function boot(page, { skipSplash = true } = {}) {
  await page.goto(BASE, { waitUntil: 'load' });
  if (skipSplash) await page.waitForTimeout(1700);
}

async function shot(page, name, opts = {}) {
  await page.waitForTimeout(opts.settle ?? 350);
  const file = path.join(OUT, name + '.png');
  await page.screenshot({ path: file, ...(opts.clip ? { clip: opts.clip } : {}) });
  console.log('✓', name);
}

(async () => {
  const browser = await chromium.launch({ executablePath: EXE });

  /* ───────── 1. Erstkontakt: Splash + Onboarding ───────── */
  {
    const { ctx, page } = await newCtx(browser, { seed: false });
    await page.goto(BASE, { waitUntil: 'load' });
    await page.waitForTimeout(400);
    await shot(page, '01-splash-erststart', { settle: 0 });

    await page.waitForTimeout(1600);
    await shot(page, '02-onboarding-1-willkommen');

    await page.fill('#obName', 'Lena');
    await shot(page, '03-onboarding-1-name');

    await page.click('.ob-step[data-step="1"] [data-next]');
    await shot(page, '04-onboarding-2-themen');

    await page.click('.ob-step[data-step="2"] [data-next]');
    await shot(page, '05-onboarding-3-daten');

    await page.click('#onboarding [data-finish]');
    await page.waitForTimeout(700);
    await shot(page, '06-willkommens-animation', { settle: 0 });

    await page.waitForTimeout(2600);
    await shot(page, '07-heute-leer-erster-tag');
    await ctx.close();
  }

  /* ───────── 2. Splash personalisiert (mit Daten) ───────── */
  {
    const { ctx, page } = await newCtx(browser, { seed: true });
    await page.goto(BASE, { waitUntil: 'load' });
    await page.waitForTimeout(400);
    await shot(page, '08-splash-personalisiert', { settle: 0 });
    await ctx.close();
  }

  /* ───────── 3. Heute: offener Check-in ───────── */
  {
    const { ctx, page } = await newCtx(browser, {
      seed: true,
      patchSeed: d => {
        d.entries['2026-07-27'] = { ...(d.entries['2026-07-27'] || { gefuehle: 'g', schlaf: 'y' }), sport: true };
        d.entries['2026-07-28'] = { ...(d.entries['2026-07-28'] || { gefuehle: 'g', schlaf: 'g' }), sport: true };
      }
    });
    await boot(page);
    await shot(page, '09-heute-checkin-offen');

    // Ampel + Chips tippen
    await page.click('.scale-row:nth-child(1) .scale-btn[data-v="g"]');
    await page.click('.scale-row:nth-child(2) .scale-btn[data-v="y"]');
    for (const label of ['Sport', 'Soziale Kontakte', 'Obst & Gemüse']) {
      await page.click(`#checkChips .chip:has-text("${label}")`);
    }
    await page.fill('#noteInput', 'Früh raus, Kopf klar. Abends noch eine Runde gelaufen.');
    await page.waitForTimeout(500);
    await shot(page, '10-heute-checkin-ausgefuellt');

    await page.click('#saveEntry');
    await page.waitForTimeout(400);
    await shot(page, '11-heute-zusammenfassung-impulse');

    // gleiche Ansicht in voller Höhe
    await page.setViewportSize({ width: 390, height: 1250 });
    await page.waitForTimeout(300);
    await shot(page, '11b-heute-zusammenfassung-voll');
    await page.setViewportSize(DEVICE);

    // Nachtrag über den 14-Tage-Streifen
    await page.click('.day-strip .day-dot:nth-child(6)');
    await page.waitForTimeout(300);
    await shot(page, '12-heute-nachtrag-tag');
    await ctx.close();
  }

  /* ───────── 4. Heute abends: Erinnerung + Backup-Banner ───────── */
  {
    const { ctx, page } = await newCtx(browser, {
      seed: true,
      time: EVENING,
      patchSeed: d => { d.profile.lastExport = '2026-07-02T09:00:00.000Z'; }
    });
    await boot(page);
    await shot(page, '13-heute-abend-erinnerung-backup');
    await ctx.close();
  }

  /* ───────── 5. Monat ───────── */
  {
    const { ctx, page } = await newCtx(browser, { seed: true });
    await boot(page);
    await page.click('#tabbar button[data-tab="month"]');
    await page.waitForTimeout(400);
    await shot(page, '14-monat-raster');

    // horizontal ans Monatsende scrollen
    await page.evaluate(() => {
      const s = document.querySelector('.grid-scroller');
      s.scrollLeft = s.scrollWidth;
    });
    await shot(page, '15-monat-raster-monatsende');

    await page.evaluate(() => { document.querySelector('.grid-scroller').scrollLeft = 0; });
    await page.evaluate(() => { document.querySelector('#screen-month').scrollTop = 99999; });
    await shot(page, '16-monat-review-und-notizen');

    await page.setViewportSize({ width: 390, height: 1500 });
    await page.evaluate(() => { document.querySelector('#screen-month').scrollTop = 0; });
    await page.waitForTimeout(300);
    await shot(page, '16b-monat-voll');
    await page.setViewportSize(DEVICE);

    /* Jahr */
    await page.click('#tabbar button[data-tab="year"]');
    await page.waitForTimeout(400);
    await shot(page, '17-jahr-in-farben');
    await page.evaluate(() => { document.querySelector('#screen-year').scrollTop = 99999; });
    await shot(page, '18-jahr-monatsstatistik');

    /* Mehr */
    await page.click('#tabbar button[data-tab="more"]');
    await page.waitForTimeout(400);
    await shot(page, '19-mehr-backup');
    await page.evaluate(() => { document.querySelector('#screen-more').scrollTop = 620; });
    await shot(page, '20-mehr-themen-verwalten');

    // Thema aufgeklappt (Umbenennen / Löschen), mittig in den Blick geholt
    await page.evaluate(() => {
      const item = [...document.querySelectorAll('#habitManager .habit-item')]
        .find(i => i.dataset.id === 'sport');
      if (!item) return;
      item.querySelector('.habit-main').click();
      item.scrollIntoView({ block: 'center' });
    });
    await page.waitForTimeout(400);
    await shot(page, '21-mehr-thema-bearbeiten');

    await page.evaluate(() => { document.querySelector('#screen-more').scrollTop = 99999; });
    await shot(page, '22-mehr-profil-disclaimer');

    await page.setViewportSize({ width: 390, height: 2400 });
    await page.evaluate(() => { document.querySelector('#screen-more').scrollTop = 0; });
    await page.waitForTimeout(300);
    await shot(page, '22b-mehr-voll');
    await ctx.close();
  }

  /* ───────── 6. Monatsreview-Dialog ───────── */
  {
    const { ctx, page } = await newCtx(browser, {
      seed: true,
      time: new Date('2026-07-31T20:15:00+02:00'),
      patchSeed: d => {
        d.profile.lastReviewPrompt = '2026-06';
        delete d.reviews['2026-07'];
        d.entries['2026-07-31'] = { gefuehle: 'g', schlaf: 'g', soziales: true };
      }
    });
    await boot(page);
    await page.waitForTimeout(600);
    await shot(page, '23-monatsreview-dialog');

    await page.setViewportSize({ width: 390, height: 1200 });
    await page.waitForTimeout(300);
    await shot(page, '23b-monatsreview-voll');
    await ctx.close();
  }

  /* ───────── 7. Leerer Zustand: Monat & Jahr ohne Daten ───────── */
  {
    const { ctx, page } = await newCtx(browser, {
      seed: true,
      patchSeed: d => { d.entries = {}; d.reviews = {}; d.profile.lastExport = null; }
    });
    await boot(page);
    await page.click('#tabbar button[data-tab="month"]');
    await page.waitForTimeout(400);
    await shot(page, '24-monat-leer');
    await page.click('#tabbar button[data-tab="year"]');
    await page.waitForTimeout(400);
    await shot(page, '25-jahr-leer');
    await ctx.close();
  }

  await browser.close();
  console.log('\nFertig →', OUT);
})().catch(e => { console.error(e); process.exit(1); });
