import React from 'react';
import { CalendarPlus, MapPin } from 'lucide-react';
import { WEDDING_EVENTS } from '../data/weddingData';
import type { EventId, Language, WeddingEvent } from '../types/wedding';
import { downloadEventCalendar } from '../utils/calendar';

interface EventBillboardsProps {
  lang: Language;
  onViewMap: (eventId: EventId) => void;
}

function BillboardActions({
  event,
  lang,
  onViewMap,
  variant = 'light',
}: {
  event: WeddingEvent;
  lang: Language;
  onViewMap: (id: EventId) => void;
  variant?: 'dark' | 'light';
}) {
  const btnClass =
    variant === 'dark'
      ? 'bg-white/10 hover:bg-white/20 text-white border border-white/25'
      : 'bg-stone-900 hover:bg-stone-800 text-white border border-stone-900';

  const secondaryClass =
    variant === 'dark'
      ? 'bg-amber-400 hover:bg-amber-300 text-stone-950 font-semibold'
      : 'bg-white hover:bg-stone-100 text-stone-900 border border-stone-300 font-semibold';

  return (
    <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
      <button
        type="button"
        onClick={() => onViewMap(event.id)}
        className={`min-h-[44px] px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${secondaryClass}`}
      >
        <MapPin className="w-4 h-4" />
        {lang === 'bn' ? 'ম্যাপে দেখুন' : 'View on Map'}
      </button>
      <button
        type="button"
        onClick={() => downloadEventCalendar(event, lang)}
        className={`min-h-[44px] px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0 ${btnClass}`}
      >
        <CalendarPlus className="w-4 h-4" />
        {lang === 'bn' ? 'ক্যালেন্ডারে সেভ করুন' : 'Save to Calendar'}
      </button>
    </div>
  );
}

export function EventBillboards({ lang, onViewMap }: EventBillboardsProps) {
  const [holud, biye, boubhat] = WEDDING_EVENTS;

  return (
    <section id="schedule" className="relative z-10 py-14 sm:py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs sm:text-sm font-medium text-stone-600">
            {lang === 'bn' ? 'আমন্ত্রণের দিন তিথি' : 'Wedding Itinerary'}
          </p>
          <h2 className="mt-1.5 font-serif-bn text-3xl sm:text-4xl font-bold text-stone-900 [text-wrap:balance]">
            {lang === 'bn' ? 'অনুষ্ঠানসূচি' : 'Schedule of Celebrations'}
          </h2>
        </div>

        <div className="space-y-14">
          {/* 1. Gaye Holud Yellow & Chalkboard Billboard (matching video) */}
          <div className="max-w-lg mx-auto">
            <div className="bg-[#EAB308] rounded-t-3xl rounded-b-2xl p-3 sm:p-4 shadow-xl border-2 border-amber-600">
              <div className="bg-amber-300/80 rounded-xl px-4 py-2 text-center mb-3">
                <p className="text-xs font-bold text-amber-950 tracking-wide">
                  {lang === 'bn' ? 'হলুদ সন্ধ্যা ও রঙের উৎসব' : 'Turmeric · Music · Marigold Blooms'}
                </p>
              </div>
              <div className="bg-[#1F2421] text-white rounded-xl px-5 py-7 sm:px-7 text-center border-2 border-amber-400/50">
                <h3 className="font-serif-bn text-3xl sm:text-4xl font-bold text-amber-300">
                  {holud.title[lang]}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-stone-300">{holud.subtitle[lang]}</p>
                <div className="mt-5 space-y-1 text-sm sm:text-base">
                  <p className="font-semibold text-white">{holud.dateLabel[lang]}</p>
                  <p className="text-amber-200 font-medium">{holud.timeLabel[lang]}</p>
                  <p className="pt-2 font-semibold text-stone-100">{holud.venueName[lang]}</p>
                  <p className="text-xs text-stone-400">{holud.venueAddress[lang]}</p>
                </div>
                <BillboardActions event={holud} lang={lang} onViewMap={onViewMap} variant="dark" />
              </div>
            </div>
            {/* Billboard wooden legs */}
            <div className="flex justify-center gap-36 sm:gap-48" aria-hidden="true">
              <div className="w-4 h-7 bg-amber-900 rounded-b" />
              <div className="w-4 h-7 bg-amber-900 rounded-b" />
            </div>
          </div>

          {/* 2. Biye / Wedding Colorful Pandal Billboard (matching video) */}
          <div className="max-w-lg mx-auto">
            {/* Semicircular sunburst crest */}
            <div className="w-44 h-20 mx-auto rounded-t-full bg-gradient-to-t from-amber-400 via-red-500 to-sky-500 border-4 border-b-0 border-stone-900 flex items-end justify-center pb-2 shadow-md">
              <span className="font-serif-bn text-xl font-bold text-white drop-shadow">
                {lang === 'bn' ? 'শুভ বিয়ে' : 'The Wedding'}
              </span>
            </div>
            <div className="bg-stone-900 rounded-2xl p-2.5 shadow-xl border-2 border-stone-900">
              <div className="grid grid-cols-4 gap-1.5 rounded-xl overflow-hidden">
                <div className="col-span-4 bg-[#EAB308] text-stone-950 px-4 py-3 text-center">
                  <p className="text-xs sm:text-sm font-semibold">{biye.subtitle[lang]}</p>
                </div>
                <div className="col-span-4 bg-[#C83232] text-white px-4 py-3.5 text-center">
                  <p className="font-serif-bn text-lg sm:text-xl font-bold">{biye.dateLabel[lang]}</p>
                </div>
                <div className="col-span-4 bg-[#2563EB] text-white px-4 py-3 text-center">
                  <p className="font-semibold text-sm sm:text-base">{biye.timeLabel[lang]}</p>
                </div>
                <div className="col-span-4 bg-[#157347] text-white px-4 py-5 text-center">
                  <p className="font-serif-bn text-xl sm:text-2xl font-bold">{biye.venueName[lang]}</p>
                  <p className="mt-1 text-xs sm:text-sm text-emerald-100">{biye.venueAddress[lang]}</p>
                  <BillboardActions event={biye} lang={lang} onViewMap={onViewMap} variant="dark" />
                </div>
              </div>
            </div>
          </div>

          {/* 3. Boubhat Reception Illustrated Gate Billboard (matching video) */}
          <div className="max-w-lg mx-auto">
            <div className="bg-[#FFFDF8] rounded-2xl border-2 border-stone-800 shadow-xl overflow-hidden">
              {/* Top illustrated reception window motif */}
              <div className="bg-sky-50 border-b border-stone-200 px-6 pt-5 pb-4 flex items-center justify-center gap-4">
                <div className="w-16 h-16 rounded-t-full bg-amber-100 border-2 border-amber-700/40 flex items-center justify-center text-xs font-serif-bn font-bold text-amber-900">
                  {lang === 'bn' ? 'স্বাগতম' : 'Welcome'}
                </div>
                <div className="w-20 h-20 rounded-t-full bg-emerald-100 border-2 border-emerald-700/40 flex items-center justify-center text-sm font-serif-bn font-bold text-emerald-900">
                  {lang === 'bn' ? 'দোয়া ও প্রীতি' : 'Blessings'}
                </div>
                <div className="w-16 h-16 rounded-t-full bg-rose-100 border-2 border-rose-700/40 flex items-center justify-center text-xs font-serif-bn font-bold text-rose-900">
                  {lang === 'bn' ? 'ভোজ' : 'Feast'}
                </div>
              </div>

              <div className="px-5 py-7 sm:px-8 text-center">
                <h3 className="font-serif-bn text-2xl sm:text-3xl font-bold text-[#C83232]">
                  {boubhat.title[lang]}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-stone-600">{boubhat.subtitle[lang]}</p>

                <div className="mt-5 space-y-2 text-sm sm:text-base text-stone-800">
                  <p className="font-semibold">{boubhat.dateLabel[lang]}</p>
                  <p className="text-emerald-800 font-semibold">{boubhat.timeLabel[lang]}</p>
                  <p className="pt-1 font-bold text-stone-900">{boubhat.venueName[lang]}</p>
                  <p className="text-xs sm:text-sm text-stone-600">{boubhat.venueAddress[lang]}</p>
                </div>

                <BillboardActions event={boubhat} lang={lang} onViewMap={onViewMap} variant="light" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
