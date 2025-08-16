import { useState, useEffect } from 'react';
import { Github, Instagram, MessageCircle, Youtube } from 'lucide-react';

interface MainContentProps {
  isVisible: boolean;
}

export const MainContent = ({ isVisible }: MainContentProps) => {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [typewriterText, setTypewriterText] = useState('');
  
  const fullText = 'Gaming for passion and developer as reason';
  
  useEffect(() => {
    if (!isVisible) return;
    
    let currentIndex = 0;
    const timer = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypewriterText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    
    return () => clearInterval(timer);
  }, [isVisible]);

  const socialLinks = [
    {
      name: 'YouTube',
      icon: Youtube,
      url: 'https://www.youtube.com/@neyoogaming9692',
      color: 'hover:border-red-500/50 hover:shadow-red-500/20'
    },
    {
      name: 'Instagram', 
      icon: Instagram,
      url: 'https://www.instagram.com/ney0000o/',
      color: 'hover:border-pink-500/50 hover:shadow-pink-500/20'
    },
    {
      name: 'Discord',
      icon: MessageCircle,
      url: 'https://discord.gg/enyAVTkr',
      color: 'hover:border-blue-500/50 hover:shadow-blue-500/20'
    },
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/Adhil1201',
      color: 'hover:border-white/50 hover:shadow-white/20'
    }
  ];

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center animate-fade-in bg-black/20 backdrop-blur-sm">
      <div className="text-center space-y-12">
        <div className="space-y-6">
          <h1 className="text-7xl font-bold text-white mb-4 tracking-wider animate-scale-in split-text">
            {'ney000o'.split('').map((char, index) => (
              <span 
                key={index} 
                className="inline-block animate-fade-in"
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: 'both'
                }}
              >
                {char}
              </span>
            ))}
          </h1>
          <p className="text-2xl text-white/90 max-w-md mx-auto leading-relaxed min-h-[2rem]">
            {typewriterText}
            <span className="animate-pulse">|</span>
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <button
                key={link.name}
                onMouseEnter={() => setHoveredButton(link.name)}
                onMouseLeave={() => setHoveredButton(null)}
                onClick={() => window.open(link.url, '_blank')}
                className={`glow-button ${link.color} group`}
              >
                <div className="flex items-center gap-3">
                  <img 
                    src="/lovable-uploads/783bf614-c8b9-4ea7-b95d-e55cffe5e029.png" 
                    alt="Mouse mascot" 
                    className={`w-5 h-5 object-contain transition-transform duration-300 ${
                      hoveredButton === link.name ? 'scale-110 animate-bounce' : ''
                    }`}
                  />
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{link.name}</span>
                </div>
                
                {hoveredButton === link.name && (
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 animate-pulse"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};