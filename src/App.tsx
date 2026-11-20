import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { CountdownSection } from './components/CountdownSection';
import { EventBillboards } from './components/EventBillboards';
import { MusicPlayer } from './components/MusicPlayer';
import { PhotoGallery } from './components/PhotoGallery';
import { RsvpSectionModal } from './components/RsvpSectionModal';
import { TopBar } from './components/TopBar';
import { VenueMapSection } from './components/VenueMapSection';
import {
  BengaliCNG,
  BuntingGarland,
  PatternCardFrame,
  PineTreeCluster,
  TwilightCoupleFinale,
  VintageWeddingCar,
} from './components/WeddingScenery';
import { COUPLE_INFO } from './data/weddingData';
import type { EventId, Language, RsvpRecord, RsvpSummary } from './types/wedding';

export default function App() {
  const [lang, setLang] = useState<Language>('bn');
  const [selectedEventId, setSelectedEventId] = useState<EventId>('biye');
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const [musicPlaySignal, setMusicPlaySignal] = useState(0);
  const [quotaExceeded, setQuotaExceeded] = useState(false);

  const [rsvps, setRsvps] = useState<RsvpRecord[]>([]);
  const [rsvpSummary, setRsvpSummary] = useState<RsvpSummary>({
    totalResponses: 0,
    attendingResponses: 0,
    declinedResponses: 0,
    totalConfirmedGuests: 0,
  });
  const [rsvpLoading, setRsvpLoading] = useState(true);

  const journeyRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll();
  const carDriveX = useTransform(scrollYProgress, [0, 0.45, 0.85], [-40, 28, -16]);
  const cngDriveX = useTransform(scrollYProgress, [0.1, 0.65], [60, -80]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const onQuotaExceeded = () => setQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', onQuotaExceeded);
    return () => window.removeEventListener('gmp-quota-exceeded', onQuotaExceeded);
  }, []);

  const fetchRsvps = useCallback(async () => {
    try {
      setRsvpLoading(true);
      const res = await fetch('/api/rsvps');
      if (!res.ok) throw new Error('Failed to fetch RSVPs');
      const data = (await res.json()) as { rsvps: RsvpRecord[]; summary: RsvpSummary };
      setRsvps(data.rsvps);
      setRsvpSummary(data.summary);
    } catch {
      // Keep graceful empty state if API is unreachable
    } finally {
      setRsvpLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRsvps();
  }, [fetchRsvps]);

  const handleSubmitRsvp = async (payload: {
    guestName: string;
    phone: string;
    attending: 'yes' | 'no';
    guestCount: number;
    events: EventId[];
    message: string;
  }): Promise<boolean> => {
    try {
      const res = await fetch('/api/rsvps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) return false;
      const data = (await res.json()) as { rsvp: RsvpRecord; summary: RsvpSummary };
      setRsvps((prev) => [data.rsvp, ...prev]);
      setRsvpSummary(data.summary);
      return true;
    } catch {
      return false;
    }
  };

  const handleStartJourney = () => {
    setMusicPlaySignal((n) => n + 1);
    const el = document.getElementById('invitation-letter');
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleViewMapForEvent = (eventId: EventId) => {
    setSelectedEventId(eventId);
    const el = document.getElementById('map');
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div id="top" className="min-h-screen bg-[#FAF7F2] text-stone-900 relative overflow-x-hidden">
      {/* Google Maps Quota Exceeded Banner (Case A) */}
      {quotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      {/* 3-Zone Top Bar */}
      <TopBar lang={lang} onOpenRsvp={() => setIsRsvpOpen(true)} />

      {/* Continuous Illustrated Highway Backdrop Spine */}
      <div ref={journeyRef} className="relative">
        {/* Vertical Central Highway Stripe behind cards on desktop/mobile */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-y-0 left-1/2 -translate-x-1/2 w-24 sm:w-32 bg-stone-700/10 border-x border-stone-400/20 z-0"
        >
          <div className="h-full w-1 mx-auto border-r-2 border-dashed border-amber-500/40" />
        </div>

        {/* HERO STAGE — Matching the opening invitation card from the video */}
        <section className="relative z-10 pt-6 sm:pt-10 pb-12 px-4">
          <div className="max-w-3xl mx-auto">
            {/* Bilingual Language Toggle matching the video's top-right EN | বাংলা switcher */}
            <div className="flex justify-end mb-4">
              <div
                role="group"
                aria-label="Language switcher"
                className="inline-flex items-center p-1 bg-white border border-stone-300 rounded-xl shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => setLang('en')}
                  className={`min-h-[38px] px-3.5 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                    lang === 'en'
                      ? 'bg-stone-900 text-white'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => setLang('bn')}
                  className={`min-h-[38px] px-3.5 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                    lang === 'bn'
                      ? 'bg-[#157347] text-white'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  বাংলা
                </button>
              </div>
            </div>

            {/* Framed Hero Card */}
            <PatternCardFrame className="max-w-xl mx-auto text-center">
              <p className="text-xs sm:text-sm font-medium text-stone-600">
                {lang === 'bn' ? 'দুটি পরিবারের পক্ষ থেকে' : 'Together with Our Families'}
              </p>

              <h1 className="mt-3 font-serif-bn text-4xl sm:text-6xl font-bold text-[#C83232] leading-tight [text-wrap:balance]">
                {COUPLE_INFO.groom.name[lang]}
                <span className="block text-2xl sm:text-3xl font-serif-en italic text-stone-700 my-1">
                  {lang === 'bn' ? 'ও' : '&'}
                </span>
                {COUPLE_INFO.bride.name[lang]}
              </h1>

              <p className="mt-4 text-sm sm:text-base text-stone-700 font-medium">
                {lang === 'bn'
                  ? 'তাদের শুভ বিবাহ আসরে সাদর আমন্ত্রণ'
                  : 'Cordially Invite You to Celebrate Their Wedding'}
              </p>

              <div className="mt-5 pt-4 border-t border-stone-200 space-y-1">
                <p className="font-serif-bn text-lg sm:text-xl font-bold text-stone-900">
                  {COUPLE_INFO.mainDateLabel[lang]}
                </p>
                <p className="text-xs sm:text-sm text-stone-600">
                  {COUPLE_INFO.mainVenueName[lang]} · {COUPLE_INFO.mainCity[lang]}
                </p>
              </div>

              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleStartJourney}
                  className="min-h-[48px] px-6 py-3 rounded-xl bg-[#157347] hover:bg-[#115E3A] active:scale-[0.98] text-white font-semibold text-sm sm:text-base inline-flex items-center gap-2 shadow-md transition-all cursor-pointer whitespace-nowrap"
                >
                  {lang === 'bn' ? 'শুভ বিয়ের যাত্রা শুরু' : 'Begin the Wedding Journey'}
                  <ArrowDown className="w-4 h-4" />
                </button>
              </div>
            </PatternCardFrame>

            {/* Festive Road Scenery + Animated Vintage Wedding Car */}
            <div className="relative mt-8 max-w-2xl mx-auto">
              <BuntingGarland className="max-w-xl mx-auto" />

              <div className="relative flex items-end justify-between px-2 sm:px-6 -mt-2">
                <PineTreeCluster side="left" />

                {/* Asphalt Highway Strip with Driving Vintage Car */}
                <div className="flex-1 mx-2 sm:mx-4 pb-2 relative">
                  <div className="h-14 sm:h-16 bg-stone-700 rounded-xl border-y-4 border-stone-300 relative overflow-hidden flex items-center justify-center">
                    <div className="w-full border-t-2 border-dashed border-amber-300/80" />
                  </div>
                  <motion.div
                    style={{ x: carDriveX }}
                    className="w-44 sm:w-56 mx-auto -mt-20 sm:-mt-24 relative z-10"
                  >
                    <VintageWeddingCar />
                  </motion.div>
                </div>

                <PineTreeCluster side="right" />
              </div>
            </div>
          </div>
        </section>

        {/* BISMILLAH & FORMAL INVITATION LETTER CARD */}
        <section id="invitation-letter" className="relative z-10 py-10 sm:py-16 px-4">
          <div className="max-w-xl mx-auto">
            <PatternCardFrame className="text-center">
              <p
                className="text-2xl sm:text-3xl font-semibold text-stone-900 tracking-wide"
                dir="rtl"
                lang="ar"
              >
                بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
              </p>
              <p className="mt-2 text-xs sm:text-sm text-stone-600">
                {lang === 'bn'
                  ? 'পরম করুণাময় আল্লাহর নামে'
                  : 'In the Name of Allah, the Most Gracious, the Most Merciful'}
              </p>

              <p className="mt-5 text-xs font-semibold tracking-wider text-amber-800">
                {lang === 'bn' ? 'আন্তরিক আমন্ত্রণ' : 'A Heartfelt Invitation'}
              </p>
              <h2 className="mt-1 font-serif-bn text-3xl sm:text-4xl font-bold text-[#C83232]">
                {lang === 'bn' ? 'সাদর নিমন্ত্রণ' : 'Cordial Invitation'}
              </h2>

              <p className="mt-4 text-sm sm:text-base text-stone-700 leading-relaxed max-w-md mx-auto">
                {lang === 'bn'
                  ? 'মহান আল্লাহর অশেষ মেহেরবানীতে আমাদের পরিবারদ্বয়ের পক্ষ থেকে মেহেবুব ও সারিকার শুভ বিবাহ আসরে আপনার সানুগ্রহ উপস্থিতি ও আন্তরিক দোয়া কামনা করছি। আপনার আগমনে আমাদের এই আনন্দঘন মুহূর্ত আরও পরিপূর্ণ হয়ে উঠবে।'
                  : 'By the grace of Almighty Allah, our families warmly invite you to join us and bless Mehebub & Sarika as they begin their life together. Your presence and prayers will make our celebration complete.'}
              </p>

              <p className="mt-5 text-xs sm:text-sm font-semibold text-emerald-800">
                {lang === 'bn'
                  ? 'বিনীত — উভয় পরিবারের সকল সদস্যবৃন্দ'
                  : 'With Love — Both Families'}
              </p>
            </PatternCardFrame>

            {/* Passing Bengali CNG + Car Highway Interlude */}
            <div className="mt-8 relative h-24 bg-stone-700 rounded-2xl border-y-4 border-stone-300 overflow-hidden flex items-center justify-between px-4">
              <div className="absolute inset-x-0 top-1/2 border-t-2 border-dashed border-amber-300/80" />
              <motion.div style={{ x: cngDriveX }} className="w-24 sm:w-28 relative z-10">
                <BengaliCNG />
              </motion.div>
              <motion.div style={{ x: carDriveX }} className="w-36 sm:w-44 relative z-10">
                <VintageWeddingCar />
              </motion.div>
            </div>
          </div>
        </section>

        {/* TWO FAMILIES, ONE CELEBRATION — GROOM & BRIDE DIRECTIONAL SIGNS */}
        <section className="relative z-10 py-10 sm:py-14 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-xs sm:text-sm font-medium text-stone-600">
              {lang === 'bn' ? 'দুটি পরিবারের মেলবন্ধন' : 'Two Families United'}
            </p>
            <h2 className="mt-1 font-serif-bn text-3xl sm:text-4xl font-bold text-stone-900">
              {lang === 'bn' ? 'দুই ঘর, এক উৎসব' : 'Two Homes, One Celebration'}
            </h2>

            <div className="mt-8 space-y-6">
              {/* Groom Green Highway Signboard */}
              <div className="bg-[#157347] text-white rounded-2xl p-2 shadow-lg border-2 border-[#0F5132] max-w-lg mx-auto">
                <div className="border-2 border-white/80 rounded-xl px-5 py-6">
                  <p className="text-xs font-semibold text-emerald-100">
                    {lang === 'bn' ? 'বর পরিচিতি' : 'The Groom'}
                  </p>
                  <h3 className="mt-1 font-serif-bn text-3xl sm:text-4xl font-bold">
                    {COUPLE_INFO.groom.fullName[lang]}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-emerald-50/95">
                    {COUPLE_INFO.groom.parents[lang]}
                  </p>
                </div>
              </div>

              {/* Bride Crimson Highway Signboard */}
              <div className="bg-[#C83232] text-white rounded-2xl p-2 shadow-lg border-2 border-[#991B1B] max-w-lg mx-auto">
                <div className="border-2 border-white/80 rounded-xl px-5 py-6">
                  <p className="text-xs font-semibold text-rose-100">
                    {lang === 'bn' ? 'কনে পরিচিতি' : 'The Bride'}
                  </p>
                  <h3 className="mt-1 font-serif-bn text-3xl sm:text-4xl font-bold">
                    {COUPLE_INFO.bride.fullName[lang]}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-rose-50/95">
                    {COUPLE_INFO.bride.parents[lang]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EVENT BILLBOARDS (GAYE HOLUD, BIYE, BOUBHAT) */}
        <EventBillboards lang={lang} onViewMap={handleViewMapForEvent} />

        {/* LIVE COUNTDOWN TIMER */}
        <CountdownSection lang={lang} />

        {/* BESPOKE WEDDING PHOTO GALLERY */}
        <PhotoGallery lang={lang} />

        {/* INTERACTIVE GOOGLE MAPS LOCATION HUB */}
        <VenueMapSection
          lang={lang}
          selectedEventId={selectedEventId}
          onSelectEvent={setSelectedEventId}
          quotaExceeded={quotaExceeded}
        />

        {/* GUEST RSVP & ATTENDANCE CONFIRMATION */}
        <RsvpSectionModal
          lang={lang}
          rsvps={rsvps}
          summary={rsvpSummary}
          loading={rsvpLoading}
          isModalOpen={isRsvpOpen}
          onOpenModal={() => setIsRsvpOpen(true)}
          onCloseModal={() => setIsRsvpOpen(false)}
          onSubmitRsvp={handleSubmitRsvp}
        />

        {/* NIGHT SKY TWILIGHT FINALE — MATCHING THE END OF THE VIDEO */}
        <footer className="relative z-10 bg-gradient-to-b from-[#FAF7F2] via-[#27216B] to-[#161347] text-white pt-16 pb-20 px-4">
          <div className="max-w-3xl mx-auto">
            <TwilightCoupleFinale />

            <PatternCardFrame className="max-w-lg mx-auto text-center mt-2">
              <h2 className="font-serif-bn text-2xl sm:text-3xl font-bold text-[#C83232] [text-wrap:balance]">
                {lang === 'bn'
                  ? 'আপনার উপস্থিতির অপেক্ষায় রইলাম'
                  : 'We Await Your Gracious Presence'}
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-stone-600">
                {lang === 'bn'
                  ? 'আপনার উপস্থিতি আমাদের আনন্দকে পূর্ণ করবে'
                  : 'Your blessings and company will make our day unforgettable'}
              </p>

              <p className="mt-5 font-serif-bn text-2xl sm:text-3xl font-bold text-stone-900">
                {COUPLE_INFO.groom.name[lang]} {lang === 'bn' ? 'ও' : '&'}{' '}
                {COUPLE_INFO.bride.name[lang]}
              </p>
              <p className="mt-1.5 text-sm font-semibold text-amber-800 tabular-nums">
                {COUPLE_INFO.shortDateLabel[lang]} · {COUPLE_INFO.mainCity[lang]}
              </p>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => setIsRsvpOpen(true)}
                  className="min-h-[44px] px-6 py-2.5 rounded-xl bg-[#157347] hover:bg-[#115E3A] text-white font-semibold text-sm transition-colors cursor-pointer"
                >
                  {lang === 'bn' ? 'এখনই RSVP করুন' : 'Confirm RSVP'}
                </button>
              </div>
            </PatternCardFrame>

            <p className="mt-10 text-center text-xs text-indigo-200/80">
              {lang === 'bn'
                ? 'সাদর আমন্ত্রণে — মেহেবুব ও সারিকার পরিবারবর্গ'
                : 'Warmly Invited — Families of Mehebub & Sarika'}
            </p>
          </div>
        </footer>
      </div>

      {/* Floating YouTube Music Player (Alfaaz - Hamza Malik, Zain Zohaib) */}
      <MusicPlayer lang={lang} externalPlaySignal={musicPlaySignal} />
    </div>
  );
}
