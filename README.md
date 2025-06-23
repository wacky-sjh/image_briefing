# Image Briefing

AI 기반 이미지 설명 생성기 (Next.js + Google Gemini API)

---

## 소개

**Image Briefing**은 이미지를 업로드하면 Google Gemini API를 활용해 해당 이미지에 대한 상세한 설명을 자동으로 생성해주는 웹 서비스입니다.

---

## 주요 기능

- 이미지 업로드 및 미리보기
- Gemini API를 통한 이미지 설명 자동 생성

---

## 환경 변수 설정

1. [Google AI Studio](https://aistudio.google.com/app/apikey)에서 Gemini API 키를 발급받으세요.
2. 프로젝트 루트에 `.env.local` 파일을 생성하고 아래와 같이 입력하세요:

```
GEMINI_API_KEY=발급받은_본인_API_KEY_여기에_입력
```

---

## 실행 방법

```bash
npm install   # 의존성 설치
npm run dev   # 개발 서버 실행
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

---

## 기술 스택

- Next.js (App Router, TypeScript)
- Tailwind CSS
- lucide-react (아이콘)
- Google Gemini API (Vision)

---

## 참고 링크

- [Gemini API 공식 문서](https://ai.google.dev/gemini-api/docs/quickstart?hl=ko)
- [Next.js 공식 문서](https://nextjs.org/docs)

---

## 라이선스

본 프로젝트는 학습 및 데모 목적입니다.
