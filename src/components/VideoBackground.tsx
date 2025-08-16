import { useRef, useEffect } from 'react';

interface VideoBackgroundProps {
  isPlaying: boolean;
  onLoadComplete?: () => void;
}

export const VideoBackground = ({ isPlaying, onLoadComplete }: VideoBackgroundProps) => {
  const videoRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (onLoadComplete) {
      const timer = setTimeout(() => {
        onLoadComplete();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [onLoadComplete]);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      <div 
        className={`w-full h-full transition-opacity duration-1000 ${
          isPlaying ? 'opacity-30' : 'opacity-0'
        }`}
      >
        <iframe
          ref={videoRef}
          className="w-[150%] h-[150%] -translate-x-[16.67%] -translate-y-[16.67%] pointer-events-none"
          src={`https://www.youtube.com/embed/-bRBjd4dREc?autoplay=${isPlaying ? 1 : 0}&mute=0&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&fs=0&cc_load_policy=0&start=0&end=0&loop=1&playlist=-bRBjd4dREc&disablekb=1&playsinline=1&enablejsapi=1&origin=${window.location.origin}`}
          title="Background Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
};