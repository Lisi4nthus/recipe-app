# 레시피 앱 프로젝트

## 기술 스택
- Vite + React
- Context API (상태관리)
- localStorage (데이터 저장) → Firebase로 마이그레이션 예정
- 모바일 퍼스트 + 반응형

## 데이터 구조
Recipe {
  id, title, category(한식/양식/중식/일식),
  cookingTime, difficulty, servings,
  ingredients: [{ name, amount, unit }],
  steps: [],
  image, favorite, lastCooked, notes
}

## 필수/선택 필드
- 필수: 제목, 재료, 조리법
- 선택: 사진, 카테고리, 시간, 난이도, 메모

---

## 페이지 흐름
```
RecipeListPage
  ├── 카드 클릭 → RecipeDetailPage
  │     ├── 수정 버튼 → EditRecipePage → RecipeDetailPage
  │     ├── 삭제 버튼 → RecipeListPage
  │     └── 조리 시작 → CookingModePage
  └── FAB(+) → AddRecipePage → RecipeListPage
```

---

## 작업 이력

### Phase 1 — 완료

- Vite 프로젝트 세팅
- 폴더 구조 (pages, components, context, hooks)
- RecipeContext 구현 (recipes, addRecipe, updateRecipe, deleteRecipe, toggleFavorite)
- useRecipes 커스텀 훅
- RecipeListPage (목록 + 검색 + 카테고리 필터 + 즐겨찾기 토글 + FAB)
- RecipeCard (제목, 태그, 메모 미리보기, 삭제)
- RecipeDetailPage (이미지, 재료, 조리법, 메모, 헤더 버튼)
- RecipeForm 공용 컴포넌트 (추가/수정 공용)
- AddRecipePage / EditRecipePage
- localStorage 연동 (새로고침 후 데이터 유지)
- 이미지 업로드 기능

---

## Phase 2 — 진행 중

- [x] CookingModePage (주방 모드)
  - 단계별 한 화면에 하나씩 표시
  - 큰 글씨 + 이전/다음 버튼
  - 진행 표시 (1/5 단계)
- [x] lastCooked 기록 기능
  - 조리 완료 시 날짜 자동 저장
  - 상세 페이지에서 마지막 조리일 표시

---

## Phase 3 — 예정

### Firebase 마이그레이션
- localStorage → Firebase Firestore
- 클라우드 저장 + 멀티기기 동기화

### AI 재료 인식 → 레시피 추천
- 재료 사진 촬영 → Anthropic API로 이미지 전송
- AI가 재료 인식 후 레시피 반환
- 인식 결과 확인/수정 단계 포함 (정확도 보완)
- 내 레시피 DB 매칭 우선 표시 + 새 레시피 제안
- Firebase 연동 이후 구현 예정

### AI 레시피 개선 제안
- 요리 후 메모 ("간장 너무 짰음") → AI가 레시피 분석
- 구체적인 수정안 제시 ("간장 2T → 1.5T")
- 레시피에 바로 반영할지 선택 가능

### 자연어 검색
- "얼큰하고 간단한 거" 같은 자연어로 레시피 검색
- AI가 조건 해석해서 매칭

### 기타 후보
- 난이도/시간 자동 분석
- 오늘 뭐 먹지 추천 (조리 기록 + 계절 기반)
- 쇼핑 리스트 자동 추출 + 네이버 쇼핑 연결