# 레시피 앱 프로젝트

## 기술 스택
- Vite + React
- Context API (상태관리)
- localStorage (데이터 저장)
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

## 작업 이력

### 2026-03-08

#### 완료된 작업

**기반 세팅 (이전)**
- Vite 프로젝트 세팅
- 폴더 구조 (pages, components, context, hooks)
- RecipeContext 구현 (recipes, addRecipe, updateRecipe, deleteRecipe, toggleFavorite)
- useRecipes 커스텀 훅

**RecipeListPage** (`src/pages/RecipeListPage.jsx`)
- 레시피 목록 표시
- 제목 검색 인풋
- 카테고리 필터 탭 (전체/한식/양식/중식/일식)
- 즐겨찾기만 보기 토글
- 빈 상태 안내 메시지
- 우하단 FAB(+) 버튼 → 추가 페이지 이동

**RecipeCard** (`src/components/RecipeCard.jsx`)
- 제목 + 즐겨찾기 토글 (★/☆)
- 카테고리, 난이도, 조리시간, 인분 태그
- 메모 2줄 미리보기
- 삭제 버튼 (이벤트 전파 차단)
- 카드 클릭 → 상세 페이지 이동

**RecipeDetailPage** (`src/pages/RecipeDetailPage.jsx`)
- 이미지 / 플레이스홀더
- 제목, 태그 (카테고리/난이도/시간/인분)
- 재료 목록 (이름 + 양/단위)
- 조리법 순서 (번호 원형 배지)
- 메모 (있을 때만 표시)
- 헤더: 즐겨찾기 토글 / 수정 / 삭제 버튼

**RecipeForm** (`src/components/RecipeForm.jsx`)
- AddRecipePage와 EditRecipePage가 공유하는 공통 폼 컴포넌트
- `initial` prop으로 초기값 주입 (수정 시 활용)

**AddRecipePage** (`src/pages/AddRecipePage.jsx`)
- RecipeForm 래퍼, addRecipe 호출 후 목록으로 복귀
- 유효성 검사: 제목 / 재료 1개 이상 / 조리법 1개 이상

**EditRecipePage** (`src/pages/EditRecipePage.jsx`)
- RecipeForm 래퍼, 기존 데이터 pre-fill
- updateRecipe 호출 후 상세 페이지로 복귀

#### 페이지 흐름
```
RecipeListPage
  ├── 카드 클릭 → RecipeDetailPage
  │     ├── 수정 버튼 → EditRecipePage → RecipeDetailPage
  │     └── 삭제 버튼 → RecipeListPage
  └── FAB(+) → AddRecipePage → RecipeListPage
```

#### 다음 작업 후보
- localStorage 연동 (새로고침해도 데이터 유지)
- 이미지 업로드 기능
- 마지막 조리일 기록 기능
