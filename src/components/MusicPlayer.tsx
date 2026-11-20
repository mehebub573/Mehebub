import React, { useEffect, useRef, useState } from 'react';
import { ExternalLink, Music2, Pause, Play, Volume2, VolumeX, X } from 'lucide-react';
import { COUPLE_INFO } from '../data/weddingData';
import type { Language } from '../types/wedding';

interface YouTubePlayerInstance {
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  destroy: () => void;
}

declare global {
  interface Window {
    YT?: {
      Player: new (
        elementId: string | HTMLElement,
        options: {
          height?: string | number;
          width?: string | number;
          videoId: string;
          playerVars?: Record<string, string | number>;
          events?: {
            onReady?: () => void;
            onStateChange?: (event: { data: number }) => void;
            onError?: () => void;
          };
        }
      ) => YouTubePlayerInstance;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface MusicPlayerProps {
  lang: Language;
  externalPlaySignal: number;
}

export function MusicPlayer({ lang, externalPlaySignal }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);

  const playerRef = useRef<YouTubePlayerInstance | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let cancelled = false;

    const initPlayer = () => {
      if (cancelled || !containerRef.current || !window.YT?.Player || playerRef.current) return;
      playerRef.current = new window.YT.Player(containerRef.current, {
        height: '1',
        width: '1',
        videoId: COUPLE_INFO.musicTrack.youtubeId,
        playerVars: {
          autoplay: 0,
          controls: 0,
          loop: 1,
          playlist: COUPLE_INFO.musicTrack.youtubeId,
          playsinline: 1,
          rel: 0,
        },
        events: {
          onReady: () => {
            if (!cancelled) setPlayerReady(true);
          },
          onStateChange: (event) => {
            if (cancelled) return;
            // 1 = playing, 2 = paused, 0 = ended
            if (event.data === 1) setIsPlaying(true);
            if (event.data === 2 || event.data === 0) setIsPlaying(false);
          },
          onError: () => {
            if (!cancelled) setLoadFailed(true);
          },
        },
      });
    };

    if (window.YT?.Player) {
      initPlayer();
    } else {
      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        prevCallback?.();
        initPlayer();
      };
      if (!document.getElementById('yt-iframe-api-script')) {
        const tag = document.createElement('script');
        tag.id = 'yt-iframe-api-script';
        tag.src = 'https://www.youtube.com/iframe_api';
        tag.async = true;
        tag.onerror = () => {
          if (!cancelled) setLoadFailed(true);
        };
        document.body.appendChild(tag);
      }
    }

    return () => {
      cancelled = true;
    };
  }, []);

  // Trigger play when user taps "Start the Wedding Journey"
  useEffect(() => {
    if (externalPlaySignal > 0 && playerReady && playerRef.current && !isPlaying) {
      try {
        playerRef.current.unMute();
        playerRef.current.playVideo();
        setIsMuted(false);
        setIsPlaying(true);
      } catch {
        // Browser blocked programmatic playback without direct tap
      }
    }
  }, [externalPlaySignal, playerReady, isPlaying]);

  const togglePlay = () => {
    if (!playerRef.current || !playerReady) {
      setIsExpanded(true);
      return;
    }
    if (isPlaying) {
      playerRef.current.pauseVideo();
      setIsPlaying(false);
    } else {
      playerRef.current.unMute();
      playerRef.current.playVideo();
      setIsMuted(false);
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!playerRef.current || !playerReady) return;
    if (isMuted) {
      playerRef.current.unMute();
      setIsMuted(false);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2">
      {/* Hidden 1x1 YouTube IFrame host */}
      <div className="sr-only" aria-hidden="true">
        <div ref={containerRef} />
      </div>

      {isExpanded && (
        <div className="w-72 sm:w-80 bg-[#FFFDF8]/95 backdrop-blur-md border border-stone-200 rounded-2xl p-3.5 shadow-xl">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-[#C83232] text-white flex items-center justify-center shrink-0">
                <Music2 className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-stone-900 truncate">
                  {COUPLE_INFO.musicTrack.title}
                </p>
                <p className="text-xs text-stone-600 truncate">
                  {COUPLE_INFO.musicTrack.artist}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              aria-label={lang === 'bn' ? 'মিনি প্লেয়ার বন্ধ করুন' : 'Collapse player'}
              className="min-h-[36px] min-w-[36px] rounded-lg text-stone-500 hover:bg-stone-100 flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-3 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={togglePlay}
                className="min-h-[40px] px-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                {isPlaying
                  ? lang === 'bn'
                    ? 'বিরতি'
                    : 'Pause'
                  : lang === 'bn'
                    ? 'চালান'
                    : 'Play'}
              </button>

              <button
                type="button"
                onClick={toggleMute}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
                className="min-h-[40px] min-w-[40px] rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center cursor-pointer"
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>

            <a
              href={COUPLE_INFO.musicTrack.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[40px] px-2.5 rounded-xl text-xs font-medium text-red-700 hover:bg-red-50 inline-flex items-center gap-1"
            >
              YouTube
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {loadFailed && (
            <p className="mt-2 text-[11px] text-amber-800">
              {lang === 'bn'
                ? 'ব্রাউজার অডিও ব্লক করলে উপরের YouTube লিংকে ট্যাপ করুন।'
                : 'If embedded audio is blocked, open directly via YouTube.'}
            </p>
          )}
        </div>
      )}

      {/* Crimson circular audio button matching the video's bottom-right speaker icon */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          aria-label={lang === 'bn' ? 'মিউজিক প্লেয়ার খুলুন' : 'Toggle music player'}
          className="min-h-[44px] px-3 rounded-full bg-white/90 backdrop-blur-md border border-stone-200 text-stone-800 text-xs font-semibold shadow-md hover:bg-white transition-colors hidden sm:inline-flex items-center gap-2 cursor-pointer"
        >
          <Music2 className="w-3.5 h-3.5 text-[#C83232]" />
          <span>Alfaaz · Hamza Malik</span>
        </button>

        <button
          type="button"
          onClick={togglePlay}
          aria-label={
            isPlaying
              ? lang === 'bn'
                ? 'মিউজিক থামান'
                : 'Pause music'
              : lang === 'bn'
                ? 'আলফাজ গান চালান'
                : 'Play Alfaaz song'
          }
          className="w-12 h-12 rounded-full bg-[#C83232] hover:bg-[#A62626] text-white shadow-lg flex items-center justify-center transition-transform active:scale-95 cursor-pointer"
        >
          {isPlaying ? <Volume2 className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
        </button>
      </div>
    </div>
  );
}
