import React, { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Image as ImageIcon, Maximize2, X } from 'lucide-react';
import { GALLERY_PHOTOS } from '../data/weddingData';
import type { GalleryPhoto, Language } from '../types/wedding';

interface PhotoGalleryProps {
  lang: Language;
}

function GalleryTile({
  photo,
  lang,
  onSelect,
}: {
  photo: GalleryPhoto;
  lang: Language;
  onSelect: () => void;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group relative overflow-hidden rounded-2xl bg-stone-200 border border-stone-900/10 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 ${photo.spanClass} min-h-[240px] sm:min-h-[270px]`}
    >
      {imgError ? (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-amber-50 to-stone-200 text-stone-700">
          <ImageIcon className="w-8 h-8 mb-2 text-amber-700" />
          <p className="text-sm font-medium text-center">{photo.caption[lang]}</p>
        </div>
      ) : (
        <img
          src={photo.src}
          alt={photo.alt[lang]}
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      )}

      {/* Measured contrast scrim for legible overlay text */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent flex flex-col justify-end p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-200/95 font-medium">
              <span>{photo.category[lang]}</span>
              <span aria-hidden="true">·</span>
              <span>{photo.dateLabel[lang]}</span>
            </div>
            <p className="mt-1 text-sm sm:text-base font-medium text-white line-clamp-2">
              {photo.caption[lang]}
            </p>
          </div>
          <span
            aria-hidden="true"
            className="w-10 h-10 rounded-full bg-white/15 backdrop-blur-sm text-white flex items-center justify-center shrink-0 opacity-90 group-hover:bg-white group-hover:text-stone-900 transition-colors"
          >
            <Maximize2 className="w-4 h-4" />
          </span>
        </div>
      </div>
    </button>
  );
}

export function PhotoGallery({ lang }: PhotoGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const handleClose = useCallback(() => setActiveIndex(null), []);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) =>
      prev === null ? null : (prev - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length
    );
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev === null ? null : (prev + 1) % GALLERY_PHOTOS.length));
  }, []);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeIndex, handleClose, handlePrev, handleNext]);

  const activePhoto = activeIndex !== null ? GALLERY_PHOTOS[activeIndex] : null;

  return (
    <section id="gallery" className="relative z-10 py-14 sm:py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs sm:text-sm font-medium text-stone-600">
            {lang === 'bn' ? 'স্মৃতির অ্যালবাম · ফটো গ্যালারি' : 'Moments Together · Photo Gallery'}
          </p>
          <h2 className="mt-1.5 font-serif-bn text-3xl sm:text-4xl font-bold text-stone-900 [text-wrap:balance]">
            {lang === 'bn' ? 'মেহেবুব ও সারিকার বিশেষ মুহূর্ত' : 'A Glimpse of Our Celebration'}
          </h2>
        </div>

        {/* Media-first Bento Grid */}
        <div className="mt-9 grid grid-cols-1 md:grid-cols-3 auto-rows-[250px] sm:auto-rows-[270px] gap-4">
          {GALLERY_PHOTOS.map((photo, index) => (
            <GalleryTile
              key={photo.id}
              photo={photo}
              lang={lang}
              onSelect={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox */}
      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.alt[lang]}
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-sm flex flex-col justify-between p-4 sm:p-6"
          onTouchStart={(e) => setTouchStartX(e.touches[0]?.clientX ?? null)}
          onTouchEnd={(e) => {
            if (touchStartX === null) return;
            const endX = e.changedTouches[0]?.clientX ?? touchStartX;
            const delta = endX - touchStartX;
            if (delta > 45) handlePrev();
            if (delta < -45) handleNext();
            setTouchStartX(null);
          }}
        >
          <div className="flex items-center justify-between text-white">
            <div className="text-xs sm:text-sm text-stone-300">
              <span>{activePhoto.category[lang]}</span>
              <span className="mx-2" aria-hidden="true">·</span>
              <span>{activePhoto.dateLabel[lang]}</span>
            </div>
            <button
              type="button"
              onClick={handleClose}
              aria-label={lang === 'bn' ? 'বন্ধ করুন' : 'Close'}
              className="min-h-[44px] min-w-[44px] rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="relative flex-1 flex items-center justify-center my-4 min-h-0">
            <button
              type="button"
              onClick={handlePrev}
              aria-label={lang === 'bn' ? 'আগের ছবি' : 'Previous photo'}
              className="min-h-[44px] min-w-[44px] rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center mr-2 sm:mr-4 cursor-pointer shrink-0"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <img
              src={activePhoto.src}
              alt={activePhoto.alt[lang]}
              referrerPolicy="no-referrer"
              className="max-h-full max-w-full object-contain rounded-xl shadow-2xl"
            />

            <button
              type="button"
              onClick={handleNext}
              aria-label={lang === 'bn' ? 'পরের ছবি' : 'Next photo'}
              className="min-h-[44px] min-w-[44px] rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center ml-2 sm:ml-4 cursor-pointer shrink-0"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <p className="text-center text-sm sm:text-base text-stone-200 max-w-2xl mx-auto">
            {activePhoto.caption[lang]}
          </p>
        </div>
      )}
    </section>
  );
}
