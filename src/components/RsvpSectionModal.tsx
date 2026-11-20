import React, { useState } from 'react';
import { CheckCircle2, HeartHandshake, Send, Users, X } from 'lucide-react';
import { WEDDING_EVENTS } from '../data/weddingData';
import type { EventId, Language, RsvpRecord, RsvpSummary } from '../types/wedding';
import { formatNumberLocale } from '../utils/calendar';

interface RsvpSectionModalProps {
  lang: Language;
  rsvps: RsvpRecord[];
  summary: RsvpSummary;
  loading: boolean;
  isModalOpen: boolean;
  onOpenModal: () => void;
  onCloseModal: () => void;
  onSubmitRsvp: (payload: {
    guestName: string;
    phone: string;
    attending: 'yes' | 'no';
    guestCount: number;
    events: EventId[];
    message: string;
  }) => Promise<boolean>;
}

export function RsvpSectionModal({
  lang,
  rsvps,
  summary,
  loading,
  isModalOpen,
  onOpenModal,
  onCloseModal,
  onSubmitRsvp,
}: RsvpSectionModalProps) {
  const [guestName, setGuestName] = useState('');
  const [phone, setPhone] = useState('');
  const [attending, setAttending] = useState<'yes' | 'no'>('yes');
  const [guestCount, setGuestCount] = useState<number>(2);
  const [selectedEvents, setSelectedEvents] = useState<EventId[]>(['holud', 'biye', 'boubhat']);
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const toggleEvent = (id: EventId) => {
    setSelectedEvents((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (guestName.trim().length < 2) {
      setFormError(
        lang === 'bn' ? 'অনুগ্রহ করে আপনার নাম লিখুন।' : 'Please enter your full name.'
      );
      return;
    }
    if (attending === 'yes' && selectedEvents.length === 0) {
      setFormError(
        lang === 'bn'
          ? 'অন্তত একটি অনুষ্ঠান নির্বাচন করুন।'
          : 'Please select at least one event to attend.'
      );
      return;
    }

    setSubmitting(true);
    const ok = await onSubmitRsvp({
      guestName: guestName.trim(),
      phone: phone.trim(),
      attending,
      guestCount: attending === 'yes' ? guestCount : 0,
      events: attending === 'yes' ? selectedEvents : [],
      message: message.trim(),
    });
    setSubmitting(false);

    if (ok) {
      setSubmittedSuccess(true);
      setGuestName('');
      setPhone('');
      setMessage('');
    } else {
      setFormError(
        lang === 'bn'
          ? 'উপস্থিতি সংরক্ষণ করা যায়নি, অনুগ্রহ করে আবার চেষ্টা করুন।'
          : 'Could not save your RSVP. Please try again.'
      );
    }
  };

  const blessings = rsvps.filter((r) => r.message || r.attending === 'yes').slice(0, 6);

  return (
    <>
      <section id="rsvp" className="relative z-10 py-14 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto bg-white border border-stone-200 rounded-2xl p-6 sm:p-10 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <p className="text-xs sm:text-sm font-medium text-emerald-800">
                {lang === 'bn' ? 'আপনার উপস্থিতি আমাদের আনন্দ' : 'Kindly Confirm Your Presence'}
              </p>
              <h2 className="mt-1 font-serif-bn text-2xl sm:text-3xl font-bold text-stone-900 [text-wrap:balance]">
                {lang === 'bn' ? 'উপস্থিতি নিশ্চিত করুন (RSVP)' : 'Confirm Your Attendance'}
              </h2>
              <p className="mt-2 text-sm text-stone-600 max-w-xl">
                {lang === 'bn'
                  ? 'আয়োজন ও আপ্যায়নের সুব্যবস্থার জন্য অনুগ্রহ করে আপনার উপস্থিতি ও অতিথি সংখ্যা জানিয়ে দিন।'
                  : 'Let us know which ceremonies you will join so our families can welcome you warmly.'}
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setSubmittedSuccess(false);
                onOpenModal();
              }}
              className="min-h-[48px] px-6 py-3 rounded-xl bg-[#C83232] hover:bg-[#A62626] active:scale-[0.98] text-white font-semibold text-sm sm:text-base transition-all whitespace-nowrap shrink-0 cursor-pointer flex items-center justify-center gap-2 shadow-sm"
            >
              <HeartHandshake className="w-5 h-5" />
              {lang === 'bn' ? 'আরএসভিপি (RSVP) করুন' : 'Confirm RSVP'}
            </button>
          </div>

          {/* Live RSVP Summary Metrics */}
          <div className="mt-8 pt-6 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#FAF7F2] rounded-xl p-4 border border-stone-200/80">
              <p className="text-xs text-stone-600">
                {lang === 'bn' ? 'নিশ্চিতকৃত অতিথি' : 'Confirmed Guests'}
              </p>
              <p className="mt-1 font-serif-bn text-2xl font-bold text-stone-900 tabular-nums">
                {loading ? '—' : formatNumberLocale(summary.totalConfirmedGuests, lang)}
              </p>
            </div>
            <div className="bg-[#FAF7F2] rounded-xl p-4 border border-stone-200/80">
              <p className="text-xs text-stone-600">
                {lang === 'bn' ? 'উপস্থিত পরিবার / সাড়া' : 'Attending Families'}
              </p>
              <p className="mt-1 font-serif-bn text-2xl font-bold text-emerald-800 tabular-nums">
                {loading ? '—' : formatNumberLocale(summary.attendingResponses, lang)}
              </p>
            </div>
            <div className="bg-[#FAF7F2] rounded-xl p-4 border border-stone-200/80">
              <p className="text-xs text-stone-600">
                {lang === 'bn' ? 'মোট শুভেচ্ছা ও উত্তর' : 'Total Responses'}
              </p>
              <p className="mt-1 font-serif-bn text-2xl font-bold text-stone-900 tabular-nums">
                {loading ? '—' : formatNumberLocale(summary.totalResponses, lang)}
              </p>
            </div>
          </div>

          {/* Guest Blessings & Confirmations List */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-stone-800 flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-700" />
                {lang === 'bn' ? 'অতিথিদের দোয়া ও নিশ্চিতকরণ' : 'Recent Guest Blessings & RSVPs'}
              </h3>
            </div>

            {loading ? (
              <p className="text-sm text-stone-500 py-4">
                {lang === 'bn' ? 'তথ্য লোড হচ্ছে...' : 'Loading guest responses...'}
              </p>
            ) : blessings.length === 0 ? (
              <div className="rounded-xl bg-[#FAF7F2] border border-dashed border-stone-300 p-6 text-center">
                <p className="text-sm text-stone-600">
                  {lang === 'bn'
                    ? 'এখনো কোনো অতিথি উপস্থিতি জানাননি — প্রথম শুভকামনা ও উপস্থিতি জানানোর আমন্ত্রণ রইল!'
                    : 'No RSVPs recorded yet — be the first to share your confirmation and blessings!'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {blessings.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-xl bg-[#FAF7F2] border border-stone-200/80 p-4"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-semibold text-stone-900 text-sm truncate">
                        {item.guestName}
                      </p>
                      <span
                        className={`text-xs font-medium shrink-0 ${
                          item.attending === 'yes' ? 'text-emerald-800' : 'text-stone-500'
                        }`}
                      >
                        {item.attending === 'yes'
                          ? lang === 'bn'
                            ? `উপস্থিত (${formatNumberLocale(item.guestCount, lang)} জন)`
                            : `Attending (${item.guestCount})`
                          : lang === 'bn'
                            ? 'উপস্থিত হতে পারছেন না'
                            : 'Unable to attend'}
                      </span>
                    </div>
                    {item.message && (
                      <p className="mt-2 text-xs sm:text-sm text-stone-700 leading-relaxed">
                        “{item.message}”
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Interactive RSVP Bottom Sheet / Modal */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lang === 'bn' ? 'আরএসভিপি ফরম' : 'RSVP Form'}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
        >
          <div className="w-full sm:max-w-lg bg-[#FFFDF8] rounded-t-3xl sm:rounded-2xl border border-stone-200 shadow-2xl max-h-[90vh] overflow-y-auto p-6">
            <div className="w-10 h-1.5 bg-stone-300 rounded-full mx-auto mb-4 sm:hidden" />

            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-serif-bn text-2xl font-bold text-stone-900">
                  {lang === 'bn' ? 'উপস্থিতি নিশ্চিত করুন' : 'Confirm Your Attendance'}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-stone-600">
                  {lang === 'bn'
                    ? 'মেহেবুব ও সারিকার শুভ বিবাহ · ৩০ মার্চ ২০৩০'
                    : 'Wedding of Mehebub & Sarika · 30 March 2030'}
                </p>
              </div>
              <button
                type="button"
                onClick={onCloseModal}
                aria-label={lang === 'bn' ? 'বন্ধ করুন' : 'Close'}
                className="min-h-[44px] min-w-[44px] rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submittedSuccess ? (
              <div className="py-8 text-center">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-serif-bn text-xl font-bold text-stone-900">
                  {lang === 'bn' ? 'জাযাকাল্লাহু খাইরান! আপনার উত্তর সংরক্ষিত হয়েছে' : 'Thank You! Your RSVP Is Confirmed'}
                </h4>
                <p className="mt-2 text-sm text-stone-600">
                  {lang === 'bn'
                    ? 'আপনার মূল্যবান উপস্থিতি ও দোয়া আমাদের জন্য পরম আনন্দের।'
                    : 'We truly appreciate your response and look forward to celebrating together.'}
                </p>
                <button
                  type="button"
                  onClick={onCloseModal}
                  className="mt-6 min-h-[44px] px-6 py-2.5 rounded-xl bg-[#157347] text-white font-semibold text-sm hover:bg-[#115E3A] cursor-pointer"
                >
                  {lang === 'bn' ? 'কার্ডে ফিরে যান' : 'Back to Invitation'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-stone-800 mb-1.5">
                    {lang === 'bn' ? 'আপনার পূর্ণ নাম *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder={lang === 'bn' ? 'যেমন: তানভীর আহমেদ' : 'e.g., Tanvir Ahmed'}
                    className="w-full min-h-[44px] px-3.5 py-2 rounded-xl border border-stone-300 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-stone-800 mb-1.5">
                    {lang === 'bn' ? 'ফোন নম্বর (ঐচ্ছিক)' : 'Phone Number (Optional)'}
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+880 1XXX-XXXXXX"
                    className="w-full min-h-[44px] px-3.5 py-2 rounded-xl border border-stone-300 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                <div>
                  <span className="block text-sm font-semibold text-stone-800 mb-1.5">
                    {lang === 'bn' ? 'আপনি কি উপস্থিত থাকবেন?' : 'Will you attend?'}
                  </span>
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setAttending('yes')}
                      className={`min-h-[44px] px-3 py-2 rounded-xl text-sm font-semibold border transition-colors cursor-pointer ${
                        attending === 'yes'
                          ? 'bg-[#157347] text-white border-[#157347]'
                          : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
                      }`}
                    >
                      {lang === 'bn' ? 'অবশ্যই আসব' : 'Yes, Attending'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setAttending('no')}
                      className={`min-h-[44px] px-3 py-2 rounded-xl text-sm font-semibold border transition-colors cursor-pointer ${
                        attending === 'no'
                          ? 'bg-stone-800 text-white border-stone-800'
                          : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
                      }`}
                    >
                      {lang === 'bn' ? 'আসতে পারব না' : 'Regretfully No'}
                    </button>
                  </div>
                </div>

                {attending === 'yes' && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-stone-800 mb-1.5">
                        {lang === 'bn' ? 'মোট অতিথি সংখ্যা' : 'Number of Guests'}
                      </label>
                      <div className="grid grid-cols-6 gap-2">
                        {[1, 2, 3, 4, 5, 6].map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => setGuestCount(num)}
                            className={`min-h-[44px] rounded-xl text-sm font-semibold border transition-colors cursor-pointer tabular-nums ${
                              guestCount === num
                                ? 'bg-amber-500 text-stone-950 border-amber-500'
                                : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
                            }`}
                          >
                            {formatNumberLocale(num, lang)}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="block text-sm font-semibold text-stone-800 mb-1.5">
                        {lang === 'bn' ? 'কোন অনুষ্ঠানগুলোতে যোগ দেবেন?' : 'Which events will you join?'}
                      </span>
                      <div className="space-y-2">
                        {WEDDING_EVENTS.map((ev) => {
                          const checked = selectedEvents.includes(ev.id);
                          return (
                            <label
                              key={ev.id}
                              className={`flex items-center justify-between min-h-[44px] px-3.5 py-2 rounded-xl border cursor-pointer transition-colors ${
                                checked
                                  ? 'bg-emerald-50 border-emerald-600 text-stone-900'
                                  : 'bg-white border-stone-300 text-stone-700'
                              }`}
                            >
                              <span className="text-sm font-medium">
                                {ev.title[lang]} · <span className="text-xs text-stone-500">{ev.dateLabel[lang]}</span>
                              </span>
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => toggleEvent(ev.id)}
                                className="w-4 h-4 accent-[#157347]"
                              />
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-semibold text-stone-800 mb-1.5">
                    {lang === 'bn' ? 'নবদম্পতির জন্য দোয়া বা শুভেচ্ছা বার্তা' : 'Blessings or Message for the Couple'}
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={
                      lang === 'bn'
                        ? 'মেহেবুব ও সারিকার নতুন জীবনের জন্য শুভকামনা...'
                        : 'Wishing Mehebub & Sarika a lifetime of joy...'
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  />
                </div>

                {formError && (
                  <p className="text-xs sm:text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-xl px-3.5 py-2.5">
                    {formError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full min-h-[48px] px-5 py-3 rounded-xl bg-[#157347] hover:bg-[#115E3A] disabled:opacity-60 text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  {submitting
                    ? lang === 'bn'
                      ? 'সংরক্ষণ করা হচ্ছে...'
                      : 'Submitting...'
                    : lang === 'bn'
                      ? 'উপস্থিতি নিশ্চিত করুন'
                      : 'Submit RSVP'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
