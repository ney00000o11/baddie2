import { useState } from 'react';

interface EnterScreenProps {
  onEnter: () => void;
}

export const EnterScreen = ({ onEnter }: EnterScreenProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center backdrop-blur-md">
      <div className="text-center space-y-8 animate-fade-in">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-white mb-2 tracking-wider">
            ney000o
          </h1>
          <p className="text-xl text-white/80">
            Welcome
          </p>
        </div>
        
        <button
          onClick={onEnter}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="enter-button group"
        >
          <div className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/783bf614-c8b9-4ea7-b95d-e55cffe5e029.png" 
              alt="Click to enter" 
              className={`w-6 h-6 object-contain transition-transform duration-300 ${
                isHovered ? 'scale-110 animate-bounce' : ''
              }`}
            />
            <span className="font-medium">Click to Enter</span>
          </div>
          
          {isHovered && (
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 animate-pulse"></div>
          )}
        </button>
      </div>
    </div>
  );
};