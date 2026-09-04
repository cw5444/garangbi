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
    <div className="w-full bg-black">
      {/* ═══════════ 섹션 1: 축하 랜딩 ═══════════ */}
      <section className="w-full h-screen flex items-center justify-center overflow-hidden relative">
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
          <h1 className="text-6xl md:text-8xl font-light tracking-widest text-white mb-8 animate-fade-in">
            가랑비
          </h1>
          <p className="text-lg md:text-2xl text-gray-300 font-light tracking-widest mb-4 animate-fade-in-delay">
            20주년 결혼 축하 기념
          </p>
          <p className="text-sm md:text-base text-gray-400 font-light tracking-wider mb-16 animate-fade-in-delay">
            사랑과 함께 흘러내리는 가랑비처럼
          </p>

          <button
            onClick={() => {
              document.getElementById('main-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-3 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 tracking-widest text-sm"
          >
            계속 보기
          </button>
        </div>

        {/* 스크롤 유도 */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="animate-bounce text-white text-sm">↓</div>
        </div>
      </section>

      {/* ═══════════ 섹션 2: 메인 메시지 ═══════════ */}
      <section id="main-section" className="w-full min-h-screen flex items-center justify-center py-20 px-4">
        <div className="max-w-4xl w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="text-white order-2 md:order-1">
              <h2 className="text-4xl md:text-5xl font-light tracking-wider mb-6">
                가랑비
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                20주년 결혼 축하 기념
              </p>
              <p className="text-gray-400 text-base leading-relaxed">
                사랑과 함께 흘러내리는 가랑비처럼,
                <br />
                조용하지만 깊고 따뜻한 사랑으로
                <br />
                함께 만들어가는 우리 가족의 이야기입니다.
              </p>
            </div>

            <div className="relative h-96 md:h-full order-1 md:order-2 rounded-lg overflow-hidden">
              <Image
                src="/image/family-main.jpg"
                alt="가족 기념사진"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>



      {/* ═══════════ 섹션 4: 축하 메시지 ═══════════ */}
      <section className="w-full min-h-screen flex items-center justify-center py-20 px-4">
        <div className="max-w-2xl w-full text-center">
          <h2 className="text-4xl md:text-5xl font-light tracking-wider text-white mb-16">
            축하의 말씀
          </h2>

          {/* 메시지 카드 */}
          <div className="bg-white rounded-2xl p-12 shadow-2xl">
            <Image
              src="/image/message.jpg"
              alt="축하 메시지"
              width={500}
              height={600}
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* ═══════════ 섹션 3: 움직이는 가족 GIF ═══════════ */}
      <section className="w-full min-h-screen flex items-center justify-center py-20 px-4 bg-gray-900">
        <div className="max-w-2xl w-full text-center">
          <h2 className="text-4xl md:text-5xl font-light tracking-wider text-white mb-12">
            함께한 순간들
          </h2>

          {/* GIF 카드 */}
          <div className="bg-black rounded-2xl p-8 shadow-2xl">
            <div className="relative w-full h-96">
              <Image
                src="/image/family-animated.gif"
                alt="가족 GIF"
                fill
                className="object-cover rounded-lg"
                unoptimized
              />
            </div>
          </div>
        </div>
      </section>


      {/* 배경 음악 */}
      <audio ref={audioRef} loop>
        <source src="/audio/HOLY PERFECT STORM-거룩한 폭풍 - LEVISTANCE.mp3" type="audio/mpeg" />
      </audio>

      {/* 스타일 */}
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
