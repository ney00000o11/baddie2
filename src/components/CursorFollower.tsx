import { useEffect, useState } from 'react';

interface CursorPosition {
  x: number;
  y: number;
}

export const CursorFollower = () => {
  const [cursorPos, setCursorPos] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      setIsMoving(true);
      
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsMoving(false), 150);
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, []);

  // Generate floating elements that follow cursor
  const floatingElements = Array.from({ length: 8 }, (_, i) => {
    const delay = i * 100;
    const distance = 50 + i * 20;
    const angle = (i * 45) * (Math.PI / 180);
    
    const x = cursorPos.x + Math.cos(angle) * distance;
    const y = cursorPos.y + Math.sin(angle) * distance;

    return (
      <div
        key={i}
        className={`fixed pointer-events-none z-20 transition-all duration-300 ${
          isMoving ? 'opacity-60 scale-110' : 'opacity-30 scale-100'
        }`}
        style={{
          left: x - 4,
          top: y - 4,
          transitionDelay: `${delay}ms`,
          transform: `translate(-50%, -50%) rotate(${i * 45}deg)`,
        }}
      >
        <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse" />
      </div>
    );
  });

  // Cursor trail effect
  const trailElements = Array.from({ length: 12 }, (_, i) => {
    const delay = i * 50;
    const opacity = 1 - (i * 0.08);
    const scale = 1 - (i * 0.05);

    return (
      <div
        key={`trail-${i}`}
        className="fixed pointer-events-none z-10 w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"
        style={{
          left: cursorPos.x - 6,
          top: cursorPos.y - 6,
          opacity: isMoving ? opacity : 0,
          transform: `scale(${scale})`,
          transition: `all ${300 + delay}ms ease-out`,
          transitionDelay: `${delay}ms`,
        }}
      />
    );
  });

  return (
    <>
      {floatingElements}
      {trailElements}
      
      {/* Ripple effect on cursor position */}
      <div
        className={`fixed pointer-events-none z-30 w-8 h-8 border-2 border-white/30 rounded-full transition-all duration-300 ${
          isMoving ? 'scale-150 opacity-100' : 'scale-100 opacity-0'
        }`}
        style={{
          left: cursorPos.x - 16,
          top: cursorPos.y - 16,
        }}
      />
      
      {/* Outer ripple */}
      <div
        className={`fixed pointer-events-none z-25 w-12 h-12 border border-purple-400/20 rounded-full transition-all duration-500 ${
          isMoving ? 'scale-200 opacity-0' : 'scale-100 opacity-100'
        }`}
        style={{
          left: cursorPos.x - 24,
          top: cursorPos.y - 24,
        }}
      />
    </>
  );
};