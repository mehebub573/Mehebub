import type { Language, WeddingEvent } from '../types/wedding';

const BENGALI_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];

export function formatNumberLocale(value: number | string, lang: Language, padTwo = false): string {
  const str = padTwo ? String(value).padStart(2, '0') : String(value);
  if (lang === 'en') {
    return str;
  }
  return str.replace(/\d/g, (digit) => BENGALI_DIGITS[Number(digit)] ?? digit);
}

function formatIcsUtc(isoDate: string): string {
  const d = new Date(isoDate);
  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    d.getUTCFullYear().toString() +
    pad(d.getUTCMonth() + 1) +
    pad(d.getUTCDate()) +
    'T' +
    pad(d.getUTCHours()) +
    pad(d.getUTCMinutes()) +
    pad(d.getUTCSeconds()) +
    'Z'
  );
}

export function downloadEventCalendar(event: WeddingEvent, lang: Language): void {
  const title = `${event.title[lang]} — ${lang === 'bn' ? 'মেহেবুব ও সারিকার বিয়ে' : 'Mehebub & Sarika Wedding'}`;
  const location = `${event.venueName[lang]}, ${event.venueAddress[lang]}`;
  const description = `${event.subtitle[lang]} | ${event.dateLabel[lang]} · ${event.timeLabel[lang]}`;

  const icsLines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//MehebubSarikaWedding//InvitationHub//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${event.id}-2030@mehebub-sarika-wedding`,
    `DTSTAMP:${formatIcsUtc(new Date().toISOString())}`,
    `DTSTART:${formatIcsUtc(event.startIso)}`,
    `DTEND:${formatIcsUtc(event.endIso)}`,
    `SUMMARY:${title}`,
    `LOCATION:${location}`,
    `DESCRIPTION:${description}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  const blob = new Blob([icsLines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `mehebub-sarika-${event.id}-2030.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function getGoogleMapsDirectionsUrl(lat: number, lng: number, venueQuery: string): string {
  const encodedQuery = encodeURIComponent(venueQuery);
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=&query=${encodedQuery}`;
}
