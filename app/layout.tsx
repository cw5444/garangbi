import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '가랑비 | 20주년 결혼 축하',
  description: '사랑과 함께 흘러내리는 가랑비처럼, 조용하지만 깊고 따뜻한 사랑으로 함께 만들어가는 우리 가족의 이야기입니다.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
