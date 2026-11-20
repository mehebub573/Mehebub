import React, { useEffect } from 'react';
import {
  APIProvider,
  AdvancedMarker,
  InfoWindow,
  Map as GoogleMap,
  Pin,
  useAdvancedMarkerRef,
  useMap,
} from '@vis.gl/react-google-maps';
import { CalendarPlus, ExternalLink, MapPin, Navigation } from 'lucide-react';
import { WEDDING_EVENTS } from '../data/weddingData';
import type { EventId, Language, WeddingEvent } from '../types/wedding';
import { downloadEventCalendar, getGoogleMapsDirectionsUrl } from '../utils/calendar';

interface VenueMapSectionProps {
  lang: Language;
  selectedEventId: EventId;
  onSelectEvent: (id: EventId) => void;
  quotaExceeded: boolean;
}

function VenueMarkerItem({
  event,
  lang,
  isSelected,
  onSelect,
}: {
  event: WeddingEvent;
  lang: Language;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const [markerRef, marker] = useAdvancedMarkerRef();

  const pinColors =
    event.theme === 'holud'
      ? { background: '#EAB308', borderColor: '#854D0E', glyphColor: '#422006' }
      : event.theme === 'biye'
        ? { background: '#157347', borderColor: '#052E16', glyphColor: '#FFFFFF' }
        : { background: '#C83232', borderColor: '#7F1D1D', glyphColor: '#FFFFFF' };

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={event.coordinates}
        title={event.venueName[lang]}
        onClick={onSelect}
      >
        <Pin
          background={pinColors.background}
          borderColor={pinColors.borderColor}
          glyphColor={pinColors.glyphColor}
          scale={isSelected ? 1.25 : 1}
        />
      </AdvancedMarker>

      {isSelected && marker && (
        <InfoWindow anchor={marker} maxWidth={260}>
          <div className="p-1 text-stone-900">
            <p className="text-xs font-semibold text-emerald-800">{event.title[lang]}</p>
            <p className="text-sm font-bold mt-0.5">{event.venueName[lang]}</p>
            <p className="text-xs text-stone-600 mt-0.5">{event.venueAddress[lang]}</p>
            <p className="text-xs text-stone-500 mt-1">
              {event.dateLabel[lang]} · {event.timeLabel[lang]}
            </p>
          </div>
        </InfoWindow>
      )}
    </>
  );
}

function MapCameraSync({ activeEvent }: { activeEvent: WeddingEvent }) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    map.panTo(activeEvent.coordinates);
    map.setZoom(14);
  }, [map, activeEvent]);

  return null;
}

export function VenueMapSection({
  lang,
  selectedEventId,
  onSelectEvent,
  quotaExceeded,
}: VenueMapSectionProps) {
  const apiKey = (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined) || '';
  const activeEvent =
    WEDDING_EVENTS.find((ev) => ev.id === selectedEventId) ?? WEDDING_EVENTS[1];
  const directionsUrl = getGoogleMapsDirectionsUrl(
    activeEvent.coordinates.lat,
    activeEvent.coordinates.lng,
    `${activeEvent.venueName.en}, ${activeEvent.venueAddress.en}`
  );

  const canRenderGoogleMap = Boolean(apiKey) && !quotaExceeded;

  return (
    <section id="map" className="relative z-10 py-14 sm:py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Green Highway Venue Signboard matching the video */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="bg-[#157347] text-white rounded-2xl p-2 shadow-lg border-2 border-[#0F5132]">
            <div className="border-2 border-white/80 rounded-xl px-5 py-6 text-center">
              <p className="text-xs font-medium text-emerald-100">
                {lang === 'bn' ? 'অনুষ্ঠানস্থল ও লোকেশন ম্যাপ' : 'Wedding Venues & Location Map'}
              </p>
              <h2 className="mt-1 font-serif-bn text-2xl sm:text-3xl font-bold [text-wrap:balance]">
                {activeEvent.venueName[lang]}
              </h2>
              <p className="mt-1.5 text-sm text-emerald-50/90">{activeEvent.venueAddress[lang]}</p>

              <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-emerald-900 font-semibold text-xs sm:text-sm hover:bg-amber-50 transition-colors whitespace-nowrap shrink-0"
                >
                  <Navigation className="w-4 h-4" />
                  {lang === 'bn' ? 'দিকনির্দেশনা দেখুন' : 'Get Directions'}
                </a>
                <button
                  type="button"
                  onClick={() => downloadEventCalendar(activeEvent, lang)}
                  className="min-h-[44px] inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-950/50 border border-white/40 text-white font-semibold text-xs sm:text-sm hover:bg-emerald-950/75 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <CalendarPlus className="w-4 h-4" />
                  {lang === 'bn' ? 'ক্যালেন্ডারে সেভ করুন' : 'Save to Calendar'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Venue Selector Tabs + Map Surface */}
        <div className="bg-white border border-stone-200 rounded-2xl p-4 sm:p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-100 rounded-xl">
              {WEDDING_EVENTS.map((ev) => {
                const active = ev.id === activeEvent.id;
                return (
                  <button
                    key={ev.id}
                    type="button"
                    onClick={() => onSelectEvent(ev.id)}
                    className={`min-h-[44px] sm:min-h-[38px] px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-white text-stone-900 shadow-sm'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    {ev.title[lang]}
                  </button>
                );
              })}
            </div>

            <div className="text-xs sm:text-sm text-stone-600 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>{activeEvent.dateLabel[lang]}</span>
              <span aria-hidden="true">·</span>
              <span>{activeEvent.timeLabel[lang]}</span>
            </div>
          </div>

          <div className="w-full h-[360px] sm:h-[430px] rounded-xl overflow-hidden border border-stone-200 bg-stone-100 relative">
            {canRenderGoogleMap ? (
              <APIProvider
                apiKey={apiKey}
                libraries={['marker']}
                language={lang === 'bn' ? 'bn' : 'en'}
                region="BD"
              >
                <GoogleMap
                  mapId="DEMO_MAP_ID"
                  defaultCenter={activeEvent.coordinates}
                  defaultZoom={13}
                  gestureHandling="greedy"
                  internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                  style={{ width: '100%', height: '100%' }}
                >
                  <MapCameraSync activeEvent={activeEvent} />
                  {WEDDING_EVENTS.map((ev) => (
                    <VenueMarkerItem
                      key={ev.id}
                      event={ev}
                      lang={lang}
                      isSelected={ev.id === activeEvent.id}
                      onSelect={() => onSelectEvent(ev.id)}
                    />
                  ))}
                </GoogleMap>
              </APIProvider>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-emerald-50 via-[#FAF7F2] to-amber-50">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
                  <MapPin className="w-7 h-7" />
                </div>
                <h3 className="font-serif-bn text-xl font-bold text-stone-900">
                  {activeEvent.venueName[lang]}
                </h3>
                <p className="mt-1 text-sm text-stone-600 max-w-md">
                  {activeEvent.venueAddress[lang]}
                </p>
                <p className="mt-2 text-xs text-stone-500 tabular-nums">
                  {activeEvent.coordinates.lat.toFixed(4)}° N, {activeEvent.coordinates.lng.toFixed(4)}° E
                </p>
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#157347] text-white font-semibold text-sm hover:bg-[#115E3A] transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  {lang === 'bn' ? 'Google Maps-এ খুলুন' : 'Open in Google Maps'}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
