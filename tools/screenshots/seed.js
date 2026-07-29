// Deterministische Demo-Daten für Frida-Screenshots (Stichtag 29.07.2026)
function buildSeed() {
  const pad = n => String(n).padStart(2, '0');
  const key = d => d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());

  // deterministischer PRNG
  let s = 20260729;
  const rnd = () => (s = (s * 1103515245 + 12345) % 2147483648) / 2147483648;

  const entries = {};
  const start = new Date(2026, 0, 1);
  const end = new Date(2026, 6, 29);
  let periodeStart = new Date(2026, 0, 4);

  const notizen = [
    'Langer Tag, aber der Spaziergang am Abend hat alles gerettet.',
    'Endlich wieder mit Jana telefoniert. Tut gut.',
    'Zu wenig geschlafen und es gemerkt.',
    'Erster richtig warmer Tag – Kaffee draußen.',
    'Viel gegrübelt heute. Morgen früher ins Bett.',
    'Shooting lief besser als gedacht.',
    'Kopf voll, Herz leicht.',
    'Der Tag hat nichts von mir gewollt. Angenehm.',
    'Streit mit M. – geklärt, aber es hängt nach.',
    'Zwei Stunden im Park gelesen.',
    'Krank im Bett, Tee und Serien.',
    'Guter Tag. Nichts Besonderes, und genau deshalb gut.'
  ];
  let notizIdx = 0;

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    const k = key(d);
    const dow = d.getDay();
    const r = rnd();

    // ~12 % Lücken – bewusst, Frida kennt keine Streaks
    if (r < 0.12) continue;

    const e = {};
    const mood = rnd();
    e.gefuehle = mood < 0.52 ? 'g' : mood < 0.83 ? 'y' : 'r';
    const sl = rnd();
    e.schlaf = sl < 0.45 ? 'g' : sl < 0.8 ? 'y' : 'r';

    if (rnd() < (dow === 0 || dow === 6 ? 0.55 : 0.3)) e.sport = true;
    if (rnd() < 0.4) e.soziales = true;
    if (rnd() < 0.55) e.obst = true;
    if (e.gefuehle === 'r' && rnd() < 0.45) e.geweint = true;
    if (rnd() < 0.28) e.overthinking = true;
    if (rnd() < 0.08) e.streit = true;
    if (rnd() < (dow === 5 || dow === 6 ? 0.35 : 0.12)) e.alkohol = true;
    if (rnd() < 0.3) e.intim = true;

    // Zyklus: 5 Tage, alle 28 Tage
    const diff = Math.floor((d - periodeStart) / 86400000);
    if (diff >= 0 && diff % 28 < 5) e.periode = true;

    // Erkältungswelle Mitte Februar
    if (d.getMonth() === 1 && d.getDate() >= 12 && d.getDate() <= 17) e.erkaeltung = true;

    if (rnd() < 0.09 && notizIdx < notizen.length * 3) {
      e.note = notizen[notizIdx % notizen.length];
      notizIdx++;
    }
    entries[k] = e;
  }

  // Heute (29.07.) bewusst leer – für den „offener Check-in"-Screenshot
  delete entries['2026-07-29'];

  // Juli-Notizen garantieren (Notiz-Verlauf im Monats-Screen)
  const julNotes = {
    '2026-07-03': 'Shooting lief besser als gedacht.',
    '2026-07-11': 'Zwei Stunden im Park gelesen.',
    '2026-07-19': 'Viel gegrübelt heute. Morgen früher ins Bett.',
    '2026-07-25': 'Guter Tag. Nichts Besonderes, und genau deshalb gut.'
  };
  for (const [k, n] of Object.entries(julNotes)) {
    if (!entries[k]) entries[k] = { gefuehle: 'g', schlaf: 'y' };
    entries[k].note = n;
  }

  return {
    version: 1,
    profile: {
      name: 'Lena',
      onboarded: true,
      createdAt: '2026-01-01T08:12:00.000Z',
      lastExport: '2026-07-25T09:00:00.000Z',
      lastReviewPrompt: '2026-06'
    },
    habits: [
      { id: 'gefuehle', label: 'Gefühle', type: 'scale', color: 'green', order: 1, active: true },
      { id: 'schlaf', label: 'Schlaf', type: 'scale', color: 'green', order: 2, active: true },
      { id: 'sport', label: 'Sport', type: 'check', color: 'green', order: 3, active: true },
      { id: 'soziales', label: 'Soziale Kontakte', type: 'check', color: 'green', order: 4, active: true },
      { id: 'obst', label: 'Obst & Gemüse', type: 'check', color: 'green', order: 5, active: true },
      { id: 'geweint', label: 'Geweint', type: 'check', color: 'blue', order: 6, active: true },
      { id: 'overthinking', label: 'Overthinking', type: 'check', color: 'blue', order: 7, active: true },
      { id: 'streit', label: 'Streit', type: 'check', color: 'red', order: 8, active: true },
      { id: 'alkohol', label: 'Alkohol', type: 'check', color: 'yellow', order: 9, active: true },
      { id: 'erkaeltung', label: 'Erkältung', type: 'check', color: 'yellow', order: 10, active: true },
      { id: 'intim', label: 'Intimität', type: 'check', color: 'pink', order: 11, active: true },
      { id: 'periode', label: 'Periode', type: 'check', color: 'red', order: 12, active: true }
    ],
    entries,
    reviews: {
      '2026-05': { gefuehl: 'g', note: 'Voller Monat, aber ein guter. Viel draußen gewesen.', createdAt: '2026-05-31T20:10:00.000Z' },
      '2026-06': { gefuehl: 'y', note: 'Durchwachsen. Die zweite Hälfte war deutlich leichter.', createdAt: '2026-06-30T21:04:00.000Z' },
      '2026-07': { gefuehl: 'g', note: 'Der Sommer hat mir gutgetan – mehr Sport, mehr Menschen.', createdAt: '2026-07-28T20:30:00.000Z' }
    }
  };
}
module.exports = { buildSeed };
