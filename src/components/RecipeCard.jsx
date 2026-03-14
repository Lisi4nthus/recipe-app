import { useRecipes } from "../context/RecipeContext"

export default function RecipeCard({ recipe, onSelect }) {
  const { toggleFavorite, deleteRecipe } = useRecipes()

  const difficultyLabel = { easy: "쉬움", medium: "보통", hard: "어려움" }

  return (
    <div style={styles.card} onClick={onSelect} role="button" tabIndex={0} className="hover-card">
      {recipe.image && (
        <img src={recipe.image} alt={recipe.title} style={styles.image} />
      )}
      <div style={styles.body}>
        <div style={styles.header}>
          <h3 style={styles.title}>{recipe.title}</h3>
          <button
            onClick={(e) => { e.stopPropagation(); toggleFavorite(recipe.id) }}
            style={styles.favoriteBtn}
            className="hover-icon-btn"
            aria-label="즐겨찾기"
          >
            {recipe.favorite ? "★" : "☆"}
          </button>
        </div>

        <div style={styles.tags}>
          {recipe.category && <span style={styles.tag}>{recipe.category}</span>}
          {recipe.difficulty && (
            <span style={styles.tag}>{difficultyLabel[recipe.difficulty] ?? recipe.difficulty}</span>
          )}
          {recipe.cookingTime && <span style={styles.tag}>{recipe.cookingTime}분</span>}
          {recipe.servings && <span style={styles.tag}>{recipe.servings}인분</span>}
        </div>

        {recipe.notes && <p style={styles.notes}>{recipe.notes}</p>}

        <button onClick={(e) => { e.stopPropagation(); deleteRecipe(recipe.id) }} style={styles.deleteBtn} className="hover-subtle-btn">
          삭제
        </button>
      </div>
    </div>
  )
}

const styles = {
  card: {
    background: "var(--bg-card)",
    borderRadius: "var(--radius-lg)",
    boxShadow: "var(--shadow-md)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    transition: "transform var(--transition-bounce), box-shadow var(--transition-bounce)",
    cursor: "pointer",
    border: "1px solid var(--border-color)",
    // Note: Inline styles don't support pseudo-classes like :hover perfectly without extra logic. 
    // We will apply a className for the hover effect and keep base styles here.
  },
  image: {
    width: "100%",
    height: 180,
    objectFit: "cover",
  },
  body: {
    padding: "16px 20px",
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  title: {
    margin: 0,
    fontSize: 18,
    fontWeight: 700,
    lineHeight: 1.3,
    color: "var(--text-main)",
  },
  favoriteBtn: {
    background: "none",
    border: "none",
    fontSize: 24,
    cursor: "pointer",
    color: "var(--primary)",
    padding: 0,
    lineHeight: 1,
    transition: "transform var(--transition-bounce)",
    // pseudo-classes handled via css
  },
  tags: {
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
  },
  tag: {
    background: "var(--primary-light)",
    color: "var(--primary)",
    borderRadius: "var(--radius-pill)",
    padding: "4px 12px",
    fontSize: 12,
    fontWeight: 600,
  },
  notes: {
    margin: 0,
    fontSize: 14,
    color: "var(--text-muted)",
    lineHeight: 1.5,
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    marginTop: 4,
  },
  deleteBtn: {
    alignSelf: "flex-end",
    background: "transparent",
    border: "1px solid var(--border-color)",
    borderRadius: "var(--radius-sm)",
    padding: "6px 14px",
    fontSize: 13,
    fontWeight: 500,
    color: "var(--text-light)",
    cursor: "pointer",
    transition: "all var(--transition-fast)",
    marginTop: 8,
  },
}
