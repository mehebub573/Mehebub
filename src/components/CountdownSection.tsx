import React, { useEffect, useState } from 'react';
import { COUPLE_INFO } from '../data/weddingData';
import type { Language } from '../types/wedding';
import { formatNumberLocale } from '../utils/calendar';

interface CountdownSectionProps {
  lang: Language;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

function getTimeRemaining(targetIso: string): TimeRemaining {
  const targetMs = new Date(targetIso).getTime();
  const nowMs = Date.now();
  const diff = targetMs - nowMs;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, completed: true };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds, completed: false };
}

export function CountdownSection({ lang }: CountdownSectionProps) {
  const [remaining, setRemaining] = useState<TimeRemaining>(() =>
    getTimeRemaining(COUPLE_INFO.weddingTargetIso)
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setRemaining(getTimeRemaining(COUPLE_INFO.weddingTargetIso));
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const units = [
    {
      key: 'days',
      value: remaining.days,
      label: lang === 'bn' ? 'দিন' : 'Days',
      archColor: 'bg-[#EAB308]',
      pad: false,
    },
    {
      key: 'hours',
      value: remaining.hours,
      label: lang === 'bn' ? 'ঘণ্টা' : 'Hours',
      archColor: 'bg-[#157347]',
      pad: true,
    },
    {
      key: 'minutes',
      value: remaining.minutes,
      label: lang === 'bn' ? 'মিনিট' : 'Minutes',
      archColor: 'bg-[#C83232]',
      pad: true,
    },
    {
      key: 'seconds',
      value: remaining.seconds,
      label: lang === 'bn' ? 'সেকেন্ড' : 'Seconds',
      archColor: 'bg-[#2563EB]',
      pad: true,
    },
  ];

  return (
    <section id="countdown" className="relative z-10 py-14 sm:py-20 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-xs sm:text-sm font-medium tracking-wide text-stone-600">
          {lang === 'bn' ? 'ক্ষণগণনা · ৩০ মার্চ ২০৩০' : 'Counting Down · 30 March 2030'}
        </p>
        <h2 className="mt-1.5 font-serif-bn text-3xl sm:text-4xl font-bold text-stone-900 [text-wrap:balance]">
          {lang === 'bn' ? 'দিন গুনছি' : 'Counting the Days'}
        </h2>

        {remaining.completed ? (
          <div className="mt-8 bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
            <p className="font-serif-bn text-2xl font-bold text-emerald-800">
              {lang === 'bn' ? 'শুভ বিবাহের দিন এসে গেছে!' : 'The Wedding Day Has Arrived!'}
            </p>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
            {units.map((unit) => (
              <div
                key={unit.key}
                className="flex flex-col items-center bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm"
              >
                <div className={`w-full py-2.5 ${unit.archColor} text-white font-semibold text-sm`}>
                  {unit.label}
                </div>
                <div className="py-5 px-3 w-full flex items-center justify-center">
                  <span className="font-serif-bn text-3xl sm:text-4xl font-bold text-stone-900 tabular-nums">
                    {formatNumberLocale(unit.value, lang, unit.pad)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
