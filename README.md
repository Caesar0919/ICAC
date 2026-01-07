# 그룹 내부거래 관리 시스템

그룹 내부거래 관리 고도화 방안을 수립하고 경영진에게 보고하기 위한 웹 애플리케이션입니다.

## 기술 스택

- **프레임워크**: Next.js 14 (App Router)
- **언어**: TypeScript
- **UI 라이브러리**: shadcn/ui
- **스타일링**: Tailwind CSS
- **아이콘**: Lucide React
- **차트**: Recharts

## 설치 및 실행

### 1. 의존성 설치

\`\`\`bash
npm install
\`\`\`

### 2. 개발 서버 실행

\`\`\`bash
npm run dev
\`\`\`

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 3. 프로덕션 빌드

\`\`\`bash
npm run build
npm start
\`\`\`

## 프로젝트 구조

\`\`\`
.
├── app/                  # Next.js App Router 페이지
│   ├── layout.tsx       # 루트 레이아웃
│   ├── page.tsx         # 메인 페이지
│   └── globals.css      # 전역 스타일
├── components/          # React 컴포넌트
│   └── ui/             # shadcn/ui 컴포넌트
├── lib/                # 유틸리티 함수
│   └── utils.ts        # 공통 유틸리티
└── public/             # 정적 파일
\`\`\`

## 주요 기능

- 내부거래 현황 대시보드
- 거래 분석 및 통계
- 개선 방안 제시
- 경영진 보고서 생성

## shadcn/ui 컴포넌트 추가

새로운 shadcn/ui 컴포넌트를 추가하려면:

\`\`\`bash
npx shadcn-ui@latest add [component-name]
\`\`\`

예: \`npx shadcn-ui@latest add dialog\`
