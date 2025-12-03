# Todo List Frontend

React(Next.js) 기반 Todo-List 프론트엔드입니다. 주간 캘린더(월요일 시작), 날짜별 필터링, Drag & Drop 정렬, 공휴일/주말 표시, 시계/로딩 오버레이를 제공합니다.

## 주요 기능

- 주간 캘린더 WeeklyView
  - 날짜 버튼에 일자 표시
  - 이전/다음 주 이동(월요일 왼쪽 ◀, 일요일 오른쪽 ▶)
  - 선택된 날짜 상단 중앙에 🍋 표시
  - 선택 배경: 연노랑(개나리) `#fff3a1` 유지
  - 토요일 배경 파랑 `#a1c5ff`, 일요일/공휴일 배경 빨강 `#ff5f54`
  - 주 범위 라벨: `YYYY/MM/DD - YYYY/MM/DD`
- Todo 목록
  - 날짜 필터: 선택한 날짜(`target_date === YYYY-MM-DD`)만 표시
  - 완료 토글, 삭제, 타이틀 편집(Edit → Save/Cancel)
  - Drag & Drop으로 순서 변경 및 로컬 저장(새로고침 후 유지)
- 로딩 오버레이
  - 시계/공휴일/DB 로드가 준비될 때까지 레몬/민트 테마 로딩 화면 표시
- 디지털 시계
  - 현재 시간/날짜 표시(`HH:mm:ss`, `YYYY.MM.DD (ddd)`)
- 테마 토글
  - 🌙 Dark / ☀️ Light 토글
  - 다크 모드 시 배경 블랙, 텍스트 화이트

## 기술 스택

- Next.js (React), TypeScript
- Tailwind CSS (커스텀 테마/애니메이션 포함)
- dayjs (시간 포맷)
- date-holidays (KR 공휴일)
- 로컬스토리지(순서 저장)

## 설치 및 실행

PowerShell 기준 명령입니다.

- 프론트엔드

```powershell
cd C:\Users\Yuna\Desktop\Todo_List\front
npm install
npm run dev
```

- 백엔드(API)

```powershell
cd C:\Users\Yuna\Desktop\Todo_List\back
npm install
npm run dev
```

- 브라우저에서 접속
  - 프론트: http://localhost:3000
  - API: http://localhost:4000/todos

## 설정

- API CORS 허용 오리진은 백엔드에서 설정합니다.

  - back/src/app.js
    - origin: ["https://todo-list-front-end-mrvs.vercel.app", "http://localhost:3000"]

- 프론트 API 베이스(URL)는 `front/lib/api.ts`에서 관리합니다.

  - 기본: `http://localhost:4000`

- Tailwind 테마/애니메이션
  - `front/tailwind.config.ts`에 colors, keyframes, animation 확장
  - 사용 색상: lemon, mint, navyDeep
  - 애니메이션: lemonFloat, lemonGlow, shimmer

## 사용 방법

- 날짜 선택

  - WeeklyView에서 원하는 날짜를 클릭하면 해당 날짜의 투두만 표시됩니다.
  - 🍋 아이콘으로 선택 상태를 표시하고 배경은 연노랑으로 강조됩니다.

- 할 일 추가

  - TodoInput에 제목 입력 → 추가
  - 새 항목은 현재 선택된 날짜를 `target_date`로 저장합니다.

- 완료/삭제/편집

  - 완료: 원형 토글 클릭
  - 삭제: Delete 클릭(이미 삭제된 글이면 알림 후 새로고침)
  - 편집: Edit → Save/Cancel 또는 Enter/Escape

- 순서 변경

  - 목록에서 항목을 드래그하여 원하는 위치로 이동
  - 변경된 순서는 로컬스토리지에 저장되어 새로고침 후에도 유지됩니다

- 로딩
  - 시간/공휴일/DB 데이터가 준비될 때까지 레몬/민트 로딩 오버레이가 표시됩니다.

## 파일 개요

- front/components/WeeklyView.tsx

  - 주간 캘린더 렌더링, 날짜 선택/주간 이동, 공휴일/주말 배경, 🍋 표시, tasks 막대 색

- front/components/TodoList.tsx

  - 목록 렌더링, 완료/삭제/편집, Drag & Drop 이벤트 처리

- front/components/TodoInput.tsx

  - 제목 입력 후 추가(선택 날짜가 target_date로 설정)

- front/components/DigitalClock.tsx

  - 디지털 시계 렌더링(dayjs)

- front/components/LoadingOverlay.tsx

  - 레몬/민트 로딩 오버레이.(키프레임 애니메이션)

- front/hooks/useTodos.ts

  - 목록 로드, 추가/토글/편집/삭제, 재정렬, 로컬 저장

- front/hooks/useTimeReady.ts

  - 초기 시간 준비 플래그(지연 후 true)

- front/hooks/useHolidaysReady.ts

  - KR 공휴일 프리로드 후 준비 플래그

- front/lib/date.ts

  - toIsoDate, todayIso 유틸

- front/lib/todoUtils.ts
  - replaceById, toggleInList 등 리스트 유틸

## 트러블슈팅

- CORS 에러

  - 증상: 브라우저 콘솔에 CORS 관련 오류
  - 해결: 백엔드 `app.js` CORS 설정에 프론트 오리진 추가 후 서버 재시작

- 연결 거부(net::ERR_CONNECTION_REFUSED)

  - 증상: GET http://localhost:4000/todos 실패
  - 해결: 백엔드 서버 실행 상태 확인(`npm run dev`), 포트 4000 대기 확인

- 500 Internal Server Error (생성/삭제)

  - 생성: `target_date` 누락 시 500 발생할 수 있음 → 프론트에서 `{ title, target_date }` 전송
  - 삭제: 이미 삭제된 항목일 수 있음 → 알림 “이미 삭제된 글입니다” 후 새로고침

- 하이드레이션 에러(<li> 중첩)

  - 원인: li 내부에 li 렌더
  - 해결: 내부 최상위 요소를 div로 변경

- React 경고: “Cannot update a component while rendering a different component”
  - 원인: WeeklyView 렌더 중 부모 상태 업데이트
  - 해결: onSelectDate 호출을 setTimeout(…, 0)로 지연

## 라이선스

내부 사용 프로젝트(임의).
