import React from 'react';
import type { Language } from '../types/wedding';

interface TopBarProps {
  lang: Language;
  onOpenRsvp: () => void;
}

export function TopBar({ lang, onOpenRsvp }: TopBarProps) {
  const navItems =
    lang === 'bn'
      ? [
          { href: '#schedule', label: 'অনুষ্ঠানসূচি' },
          { href: '#countdown', label: 'দিন গুনছি' },
          { href: '#gallery', label: 'গ্যালারি' },
          { href: '#map', label: 'লোকেশন' },
        ]
      : [
          { href: '#schedule', label: 'Schedule' },
          { href: '#countdown', label: 'Countdown' },
          { href: '#gallery', label: 'Gallery' },
          { href: '#map', label: 'Venue Map' },
        ];

  return (
    <header className="sticky top-0 z-40 h-14 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-stone-900/10">
      <div className="max-w-6xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between gap-8">
        {/* Zone 1: Single-element brand wordmark */}
        <a
          href="#top"
          className="font-serif-bn text-base sm:text-lg font-bold tracking-tight text-stone-900 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 rounded"
        >
          {lang === 'bn' ? 'মেহেবুব ও সারিকা' : 'Mehebub & Sarika'}
        </a>

        {/* Zone 2: 4 concise single-line nav links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-700"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-emerald-800 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 py-1"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary CTA */}
        <div className="shrink-0">
          <button
            type="button"
            onClick={onOpenRsvp}
            className="min-h-[44px] sm:min-h-[40px] px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#157347] hover:bg-[#115E3A] active:scale-[0.98] rounded-xl transition-all whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-700"
          >
            {lang === 'bn' ? 'উপস্থিতি জানান (RSVP)' : 'RSVP Now'}
          </button>
        </div>
      </div>
    </header>
  );
}
