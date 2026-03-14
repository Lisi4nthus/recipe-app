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
      <header style={styles.header}>
        <h1 style={styles.heading}>내 레시피</h1>
        <button
          style={styles.favoriteToggle}
          className="hover-subtle-btn"
          onClick={() => setOnlyFavorite((v) => !v)}
        >
          {onlyFavorite ? "★ 즐겨찾기" : "☆ 즐겨찾기"}
        </button>
      </header>

      <div style={styles.searchContainer} className="list-search">
        <input
          style={styles.search}
          placeholder="레시피 검색..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div style={styles.categories} className="list-categories">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            style={{
              ...styles.categoryBtn,
              ...(category === c ? styles.categoryBtnActive : {}),
            }}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div style={styles.empty}>
          <p>레시피가 없습니다.</p>
          <p style={styles.emptyHint}>아래 + 버튼으로 추가해보세요!</p>
        </div>
      ) : (
        <div style={styles.gridContainer} className="list-grid-container">
          <div style={styles.grid}>
            {filtered.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} onSelect={() => onSelect(recipe.id)} />
            ))}
          </div>
        </div>
      )}

      <button style={styles.fab} className="fab-btn" onClick={onAdd}>+</button>
    </div>
  )
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 24px",
    background: "rgba(250, 250, 250, 0.85)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    position: "sticky",
    top: 0,
    zIndex: 10,
    borderBottom: "1px solid var(--border-color)",
  },
  heading: {
    margin: 0,
    fontSize: 26,
    fontWeight: 800,
    letterSpacing: "-0.5px",
    color: "var(--text-main)",
  },
  favoriteToggle: {
    background: "var(--bg-card)",
    border: "1px solid var(--primary)",
    borderRadius: "var(--radius-pill)",
    padding: "6px 16px",
    fontSize: 14,
    fontWeight: 600,
    color: "var(--primary)",
    cursor: "pointer",
    transition: "all var(--transition-fast)",
    boxShadow: "var(--shadow-sm)",
  },
  searchContainer: {
    padding: "16px 24px 8px",
  },
  search: {
    width: "100%",
    padding: "14px 20px",
    borderRadius: "var(--radius-lg)",
    border: "1px solid var(--border-color)",
    fontSize: 16,
    boxSizing: "border-box",
    background: "var(--bg-input)",
    transition: "box-shadow var(--transition-fast)",
    color: "var(--text-main)",
  },
  categories: {
    display: "flex",
    gap: 10,
    padding: "8px 24px 24px",
    overflowX: "auto",
    WebkitOverflowScrolling: "touch",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  },
  categoryBtn: {
    flexShrink: 0,
    background: "var(--bg-card)",
    border: "1px solid var(--border-color)",
    borderRadius: "var(--radius-pill)",
    padding: "8px 18px",
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
    color: "var(--text-muted)",
    transition: "all var(--transition-normal)",
  },
  categoryBtnActive: {
    background: "var(--text-main)",
    color: "var(--bg-card)",
    borderColor: "var(--text-main)",
    boxShadow: "var(--shadow-sm)",
  },
  gridContainer: {
    padding: "0 24px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: 20,
  },
  empty: {
    textAlign: "center",
    marginTop: 80,
    color: "var(--text-light)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
  },
  emptyHint: {
    fontSize: 14,
  },
  fab: {
    position: "fixed",
    bottom: 32,
    right: 32,
    width: 64,
    height: 64,
    borderRadius: "50%",
    background: "linear-gradient(135deg, var(--primary), var(--primary-hover))",
    color: "#fff",
    fontSize: 32,
    fontWeight: 300,
    border: "none",
    cursor: "pointer",
    boxShadow: "var(--shadow-lg)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
}
