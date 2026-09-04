'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

export default function Home() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // 페이지 로드 시 음악 자동 재생 (음소거 상태에서만 작동)
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.play().catch(() => {
        // 자동 재생 차단됨 (브라우저 정책)
      });
    }
  }, []);

  return (
    <div className="w-full h-screen bg-black flex items-center justify-center overflow-hidden">
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

      {/* 콘텐츠 */}
      <div className="relative z-10 text-center">
        {/* 타이틀 */}
        <h1 className="text-6xl md:text-8xl font-light tracking-widest text-white mb-8 animate-fade-in">
          가랑비
        </h1>

        {/* 부제 */}
        <p className="text-lg md:text-2xl text-gray-300 font-light tracking-widest mb-16 animate-fade-in-delay">
          20주년 결혼 축하 기념
        </p>

        {/* CTA 버튼 */}
        <button
          onClick={() => {
            document.getElementById('main-content')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="px-8 py-3 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 tracking-widest"
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
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1.2s ease-out;
        }

        .animate-fade-in-delay {
          animation: fade-in 1.2s ease-out 0.3s both;
        }
      `}</style>
    </div>
  );
}
