import { useState } from "react"
import { useRecipes } from "../context/RecipeContext"
import RecipeCard from "../components/RecipeCard"

const CATEGORIES = ["전체", "한식", "양식", "중식", "일식"]

export default function RecipeListPage({ onAdd, onSelect }) {
  const { recipes } = useRecipes()
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("전체")
  const [onlyFavorite, setOnlyFavorite] = useState(false)

  const filtered = recipes.filter((r) => {
    const matchSearch = r.title.includes(search)
    const matchCategory = category === "전체" || r.category === category
    const matchFavorite = !onlyFavorite || r.favorite
    return matchSearch && matchCategory && matchFavorite
  })

  return (
    <div className="page-list">
      <header className="list-header">
        <h1 className="list-heading">내 레시피</h1>
        <button
          className="list-favorite-toggle hover-subtle-btn"
          onClick={() => setOnlyFavorite((v) => !v)}
        >
          {onlyFavorite ? "★ 즐겨찾기" : "☆ 즐겨찾기"}
        </button>
      </header>

      <div className="list-search">
        <input
          className="list-search-input"
          placeholder="레시피 검색..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="list-categories">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            className={`list-category-btn${category === c ? " list-category-btn--active" : ""}`}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="list-empty">
          <p>레시피가 없습니다.</p>
          <p className="list-empty-hint">아래 + 버튼으로 추가해보세요!</p>
        </div>
      ) : (
        <div className="list-grid-container">
          <div className="list-grid">
            {filtered.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} onSelect={() => onSelect(recipe.id)} />
            ))}
          </div>
        </div>
      )}

      <button className="list-fab fab-btn" onClick={onAdd}>+</button>
    </div>
  )
}
