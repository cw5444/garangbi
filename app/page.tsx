'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [confetti, setConfetti] = useState<Array<{ id: number; left: number; delay: number }>>([]);

  useEffect(() => {
    // 음악 재생
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.play().catch(() => {});
    }

    // 축하 테이프 생성
    const newConfetti = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.5,
    }));
    setConfetti(newConfetti);
  }, []);

  return (
    <div className="w-full min-h-screen bg-black flex items-center justify-center overflow-hidden relative">
      {/* 배경 이미지 */}
      <div className="absolute inset-0">
        <Image
          src="/image/family.jpg"
          alt="가족 사진"
          fill
          className="object-cover opacity-30"
          priority
        />
      </div>

      {/* 축하 테이프 효과 */}
      {confetti.map((c) => (
        <div
          key={c.id}
          className="absolute animate-confetti"
          style={{
            left: `${c.left}%`,
            top: '-10px',
            animationDelay: `${c.delay}s`,
            opacity: Math.random() > 0.5 ? 0.7 : 1,
          }}
        >
          <div className={`w-1 h-8 ${['bg-red-500', 'bg-blue-500', 'bg-yellow-400', 'bg-green-500', 'bg-pink-500'][Math.floor(Math.random() * 5)]}`} />
        </div>
      ))}

      {/* 콘텐츠 */}
      <div className="relative z-10 text-center px-4">
        {/* 타이틀 */}
        <h1 className="text-6xl md:text-8xl font-light tracking-widest text-white mb-8 animate-fade-in">
          가랑비
        </h1>

        {/* 부제 */}
        <p className="text-lg md:text-2xl text-gray-300 font-light tracking-widest mb-4 animate-fade-in-delay">
          20주년 결혼 축하 기념
        </p>

        {/* 축하 문구 */}
        <p className="text-sm md:text-base text-gray-400 font-light tracking-wider mb-16 animate-fade-in-delay">
          사랑과 함께 흘러내리는 가랑비처럼
        </p>

        {/* CTA 버튼 */}
        <button
          onClick={() => {
            document.getElementById('main-content')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="px-8 py-3 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 tracking-widest text-sm"
        >
          계속 보기
        </button>
      </div>

      {/* 배경 음악 */}
      <audio ref={audioRef} loop>
        <source src="/audio/HOLY PERFECT STORM-거룩한 폭풍 - LEVISTANCE.mp3" type="audio/mpeg" />
      </audio>

      {/* 스크롤 유도 */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce text-white text-sm">↓ 스크롤</div>
      </div>

      {/* CSS 애니메이션 */}
      <style jsx>{`
        @keyframes confetti-fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }

        .animate-confetti {
          animation: confetti-fall 3s linear forwards;
        }
      `}</style>
    </div>
  );
}
