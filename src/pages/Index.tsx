import { useState, useEffect } from 'react';
import { TitleBar } from '@/components/TitleBar';
import { ParticleBackground } from '@/components/ParticleBackground';
import { VideoBackground } from '@/components/VideoBackground';
import { EnterScreen } from '@/components/EnterScreen';
import { MainContent } from '@/components/MainContent';

const Index = () => {
  const [hasEntered, setHasEntered] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  useEffect(() => {
    // Initialize audio context
    const initAudio = () => {
      if (!audioContext) {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        setAudioContext(ctx);
      }
    };

    document.addEventListener('click', initAudio, { once: true });
    return () => document.removeEventListener('click', initAudio);
  }, [audioContext]);

  const handleEnter = async () => {
    if (audioContext && audioContext.state === 'suspended') {
      await audioContext.resume();
    }
    setHasEntered(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      <TitleBar />
      <ParticleBackground />
      <VideoBackground 
        isPlaying={hasEntered} 
        onLoadComplete={() => setVideoLoaded(true)}
      />
      
      {!hasEntered && <EnterScreen onEnter={handleEnter} />}
      <MainContent isVisible={hasEntered} />
    </div>
  );
};

export default Index;
