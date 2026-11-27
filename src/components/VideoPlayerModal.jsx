import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  Volume2,
  Volume1,
  VolumeX,
  Maximize,
  Minimize,
  Languages,
  ChevronDown,
  X,
  Film,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

const VIDEO_LANGUAGES = [
  { code: 'uz', label: "O'zbek", src: '/media/videos/uz.mp4' },
  { code: 'en', label: 'English', src: '/media/videos/en.mp4' },
  { code: 'ru', label: 'Русский', src: '/media/videos/ru.mp4' },
  { code: 'tr', label: 'Türkçe', src: '/media/videos/tr.mp4' },
  { code: 'ar', label: 'العربية', src: '/media/videos/ar.mp4' },
  { code: 'zh', label: '中文', src: '/media/videos/zh.mp4' },
  { code: 'de', label: 'Deutsch', src: '/media/videos/de.mp4' },
  { code: 'es', label: 'Español', src: '/media/videos/es.mp4' },
  { code: 'fr', label: 'Français', src: '/media/videos/fr.mp4' },
  { code: 'ja', label: '日本語', src: '/media/videos/ja.mp4' },
  { code: 'ko', label: '한국어', src: '/media/videos/ko.mp4' },
];

const PLAYBACK_SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2];

const formatTime = (seconds) => {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const totalSec = Math.floor(seconds);
  const hrs = Math.floor(totalSec / 3600);
  const mins = Math.floor((totalSec % 3600) / 60);
  const secs = totalSec % 60;
  if (hrs > 0) {
    return `${hrs}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
  return `${mins}:${String(secs).padStart(2, '0')}`;
};

export const VideoPlayerModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();

  const videoRef = useRef(null);
  const playerWrapperRef = useRef(null);
  const langMenuRef = useRef(null);
  const speedMenuRef = useRef(null);
  const pendingRestoreRef = useRef(null);

  const [selectedLangCode, setSelectedLangCode] = useState('en');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isSpeedOpen, setIsSpeedOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const activeLang =
    VIDEO_LANGUAGES.find((l) => l.code === selectedLangCode) || VIDEO_LANGUAGES[1];

  // Lock background scroll while modal is open
  useEffect(() => {
    if (!isOpen) return;
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;
    };
  }, [isOpen]);

  // Reset transient state when closing modal
  useEffect(() => {
    if (!isOpen) {
      if (videoRef.current) {
        videoRef.current.pause();
      }
      setIsPlaying(false);
      setIsLangOpen(false);
      setIsSpeedOpen(false);
    }
  }, [isOpen]);

  // Escape key closes dropdowns first, otherwise closes modal
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isLangOpen || isSpeedOpen) {
          setIsLangOpen(false);
          setIsSpeedOpen(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isLangOpen, isSpeedOpen, onClose]);

  // Close language / speed popovers on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target)) {
        setIsLangOpen(false);
      }
      if (speedMenuRef.current && !speedMenuRef.current.contains(e.target)) {
        setIsSpeedOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Track fullscreen changes
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Sync volume, mute and speed to <video>
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.volume = volume;
    video.muted = isMuted;
    video.playbackRate = playbackSpeed;
  }, [volume, isMuted, playbackSpeed, selectedLangCode]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video || videoError) return;
    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  };

  const handleSeek = (e) => {
    const nextTime = Number(e.target.value);
    setCurrentTime(nextTime);
    if (videoRef.current) {
      videoRef.current.currentTime = nextTime;
    }
  };

  const handleVolumeChange = (e) => {
    const nextVol = Number(e.target.value);
    setVolume(nextVol);
    setIsMuted(nextVol === 0);
  };

  const toggleMute = () => {
    if (isMuted || volume === 0) {
      setIsMuted(false);
      if (volume === 0) setVolume(0.7);
    } else {
      setIsMuted(true);
    }
  };

  const handleSelectLanguage = (code) => {
    if (code === selectedLangCode) {
      setIsLangOpen(false);
      return;
    }
    const video = videoRef.current;
    pendingRestoreRef.current = {
      time: video ? video.currentTime : 0,
      wasPlaying: video ? !video.paused : false,
    };
    setVideoError(false);
    setSelectedLangCode(code);
    setIsLangOpen(false);
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;
    setDuration(video.duration || 0);
    video.volume = volume;
    video.muted = isMuted;
    video.playbackRate = playbackSpeed;

    if (pendingRestoreRef.current) {
      const { time, wasPlaying } = pendingRestoreRef.current;
      pendingRestoreRef.current = null;
      if (Number.isFinite(time) && time > 0 && time < (video.duration || Infinity)) {
        video.currentTime = time;
        setCurrentTime(time);
      }
      if (wasPlaying) {
        video.play().catch(() => {});
      }
    }
  };

  const toggleFullscreen = () => {
    const el = playerWrapperRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  const progressPercent = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;
  const volumePercent = isMuted ? 0 : Math.round(volume * 100);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={t('hero.about_festival', 'Festival haqida')}
        >
          <motion.div
            ref={playerWrapperRef}
            initial={{ opacity: 0, scale: 0.97, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 12 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full bg-card border border-border overflow-visible shadow-2xl flex flex-col ${
              isFullscreen
                ? 'max-w-none h-screen rounded-none border-0 justify-between'
                : 'max-w-4xl rounded-2xl'
            }`}
          >
            {/* Modal Header */}
            <div
              className={`flex items-center justify-between px-4 sm:px-5 py-3 border-b border-border bg-card ${
                isFullscreen ? '' : 'rounded-t-2xl'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-accent text-accent-foreground flex items-center justify-center shrink-0">
                  <Play className="w-4 h-4 fill-current" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-content leading-tight">
                    {t('hero.about_festival', 'Festival haqida')}
                  </h3>
                  <span className="text-[11px] text-muted">
                    {activeLang.label}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl bg-body border border-border text-muted hover:text-content transition-colors cursor-pointer focus-ring"
                aria-label={t('section.close', 'Yopish')}
                title={t('section.close', 'Yopish')}
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>

            {/* Video Screen */}
            <div
              className={`relative w-full bg-[#14180F] overflow-hidden ${
                isFullscreen ? 'flex-1' : 'aspect-video'
              }`}
            >
              <video
                ref={videoRef}
                key={activeLang.src}
                src={activeLang.src}
                playsInline
                preload="metadata"
                onClick={togglePlay}
                onLoadedMetadata={handleLoadedMetadata}
                onTimeUpdate={() => setCurrentTime(videoRef.current?.currentTime || 0)}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onEnded={() => setIsPlaying(false)}
                onError={() => {
                  setVideoError(true);
                  setIsPlaying(false);
                }}
                className="w-full h-full object-contain cursor-pointer"
              />

              {/* Center Play Button Overlay when Paused */}
              {!isPlaying && !videoError && (
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label="Videoni ijro etish"
                  className="absolute inset-0 flex items-center justify-center bg-black/25 hover:bg-black/35 transition-colors cursor-pointer"
                >
                  <span className="w-16 h-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center shadow-lg">
                    <Play className="w-7 h-7 fill-current ml-0.5" aria-hidden="true" />
                  </span>
                </button>
              )}

              {/* Missing Video Fallback Notice */}
              {videoError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-[#14180F]/95">
                  <Film className="w-12 h-12 text-accent mb-3" aria-hidden="true" />
                  <p className="text-sm sm:text-base font-bold text-white">
                    {activeLang.label} tilidagi video hali yuklanmagan
                  </p>
                  <p className="text-xs text-white/65 mt-1">
                    {activeLang.src}
                  </p>
                </div>
              )}
            </div>

            {/* Custom Video Player Control Bar */}
            <div
              className={`px-3 sm:px-4 py-2.5 bg-card border-t border-border flex flex-wrap sm:flex-nowrap items-center gap-2.5 sm:gap-3 ${
                isFullscreen ? '' : 'rounded-b-2xl'
              }`}
            >
              {/* Language Selector Dropdown (opens upward) */}
              <div className="relative" ref={langMenuRef}>
                <button
                  type="button"
                  onClick={() => {
                    setIsLangOpen((prev) => !prev);
                    setIsSpeedOpen(false);
                  }}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-body border border-border text-xs font-semibold text-content hover:border-primary/50 transition-colors cursor-pointer focus-ring"
                  aria-expanded={isLangOpen}
                  aria-haspopup="listbox"
                  title="Video tilini tanlash"
                >
                  <Languages className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                  <span className="whitespace-nowrap">{activeLang.label}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-muted transition-transform ${
                      isLangOpen ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>

                {isLangOpen && (
                  <div
                    role="listbox"
                    aria-label="Video tillari"
                    className="absolute left-0 bottom-full mb-2 w-40 max-h-64 overflow-y-auto p-1 rounded-xl bg-card border border-border shadow-2xl z-30"
                  >
                    {VIDEO_LANGUAGES.map((lang) => {
                      const isActive = lang.code === selectedLangCode;
                      return (
                        <button
                          key={lang.code}
                          type="button"
                          role="option"
                          aria-selected={isActive}
                          onClick={() => handleSelectLanguage(lang.code)}
                          className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                            isActive
                              ? 'bg-primary text-primary-foreground font-bold'
                              : 'text-content hover:bg-body'
                          }`}
                        >
                          {lang.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Play / Pause */}
              <button
                type="button"
                onClick={togglePlay}
                className="p-1.5 rounded-lg text-content hover:bg-body hover:text-primary transition-colors cursor-pointer focus-ring shrink-0"
                aria-label={isPlaying ? "To'xtatish" : 'Ijro etish'}
                title={isPlaying ? "To'xtatish" : 'Ijro etish'}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 fill-current" aria-hidden="true" />
                ) : (
                  <Play className="w-4 h-4 fill-current" aria-hidden="true" />
                )}
              </button>

              {/* Current Time */}
              <span className="text-xs font-timer text-content tabular-nums shrink-0">
                {formatTime(currentTime)}
              </span>

              {/* Seek / Progress Slider */}
              <div className="relative flex-1 min-w-[100px] flex items-center">
                <input
                  type="range"
                  min={0}
                  max={duration || 0}
                  step="0.1"
                  value={Math.min(currentTime, duration || 0)}
                  onChange={handleSeek}
                  aria-label="Video vaqtini boshqarish"
                  style={{
                    background: `linear-gradient(to right, var(--primary) ${progressPercent}%, var(--border) ${progressPercent}%)`,
                  }}
                  className="video-range w-full"
                />
              </div>

              {/* Total Duration */}
              <span className="text-xs font-timer text-muted tabular-nums shrink-0">
                {formatTime(duration)}
              </span>

              {/* Playback Speed Selector (opens upward) */}
              <div className="relative shrink-0" ref={speedMenuRef}>
                <button
                  type="button"
                  onClick={() => {
                    setIsSpeedOpen((prev) => !prev);
                    setIsLangOpen(false);
                  }}
                  className="px-2 py-1 rounded-lg bg-body border border-border text-xs font-bold text-content hover:border-primary/50 transition-colors cursor-pointer focus-ring"
                  aria-expanded={isSpeedOpen}
                  aria-haspopup="listbox"
                  title="Ijro tezligi"
                >
                  {playbackSpeed}x
                </button>

                {isSpeedOpen && (
                  <div
                    role="listbox"
                    aria-label="Ijro tezligi"
                    className="absolute right-0 bottom-full mb-2 w-24 p-1 rounded-xl bg-card border border-border shadow-2xl z-30"
                  >
                    {PLAYBACK_SPEEDS.map((speed) => {
                      const isActive = speed === playbackSpeed;
                      return (
                        <button
                          key={speed}
                          type="button"
                          role="option"
                          aria-selected={isActive}
                          onClick={() => {
                            setPlaybackSpeed(speed);
                            setIsSpeedOpen(false);
                          }}
                          className={`w-full text-center px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                            isActive
                              ? 'bg-primary text-primary-foreground font-bold'
                              : 'text-content hover:bg-body'
                          }`}
                        >
                          {speed}x
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Volume Mute Button + Slider */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={toggleMute}
                  className="p-1.5 rounded-lg text-content hover:bg-body hover:text-primary transition-colors cursor-pointer focus-ring"
                  aria-label={isMuted || volume === 0 ? 'Ovozni yoqish' : "Ovozni o'chirish"}
                  title={isMuted || volume === 0 ? 'Ovozni yoqish' : "Ovozni o'chirish"}
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4" aria-hidden="true" />
                  ) : volume < 0.5 ? (
                    <Volume1 className="w-4 h-4" aria-hidden="true" />
                  ) : (
                    <Volume2 className="w-4 h-4" aria-hidden="true" />
                  )}
                </button>

                <input
                  type="range"
                  min={0}
                  max={1}
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  aria-label="Ovoz balandligi"
                  style={{
                    background: `linear-gradient(to right, var(--primary) ${volumePercent}%, var(--border) ${volumePercent}%)`,
                  }}
                  className="video-range hidden sm:block w-16 md:w-20"
                />
              </div>

              {/* Fullscreen Toggle */}
              <button
                type="button"
                onClick={toggleFullscreen}
                className="p-1.5 rounded-lg text-content hover:bg-body hover:text-primary transition-colors cursor-pointer focus-ring shrink-0"
                aria-label={isFullscreen ? "To'liq ekrandan chiqish" : "To'liq ekran"}
                title={isFullscreen ? "To'liq ekrandan chiqish" : "To'liq ekran"}
              >
                {isFullscreen ? (
                  <Minimize className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <Maximize className="w-4 h-4" aria-hidden="true" />
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
