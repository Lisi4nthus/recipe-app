import { useRecipes } from "../context/RecipeContext"

const difficultyLabel = { easy: "쉬움", medium: "보통", hard: "어려움" }

export default function RecipeDetailPage({ recipeId, onBack, onEdit, onCook }) {
  const { recipes, toggleFavorite, deleteRecipe } = useRecipes()
  const recipe = recipes.find((r) => r.id === recipeId)

  if (!recipe) {
    return (
      <div style={styles.page}>
        <button onClick={onBack} style={styles.backBtn} className="hover-subtle-btn">← 뒤로</button>
        <p style={{ textAlign: "center", color: "#aaa", marginTop: 80 }}>레시피를 찾을 수 없습니다.</p>
      </div>
    )
  }

  const handleDelete = () => {
    if (window.confirm("정말 삭제할까요?")) {
      deleteRecipe(recipe.id)
      onBack()
    }
  }

  return (
    <div className="page-detail">
      {/* 헤더 */}
      <header style={styles.header}>
        <button onClick={onBack} style={styles.backBtn} className="hover-subtle-btn">← 뒤로</button>
        <div style={styles.headerActions}>
          <button onClick={() => toggleFavorite(recipe.id)} style={styles.iconBtn} className="hover-icon-btn">
            {recipe.favorite ? "★" : "☆"}
          </button>
          <button onClick={onEdit} style={styles.iconBtn} className="hover-icon-btn">✏️</button>
          <button onClick={handleDelete} style={styles.iconBtn} className="hover-icon-btn">🗑</button>
          <button onClick={onCook} style={styles.cookBtn} className="hover-subtle-btn">🍳 조리 시작</button>
        </div>
      </header>

      <div className="detail-body">
        {/* 왼쪽: 이미지 + 제목 + 태그 + 재료 */}
        <div className="detail-left">
          {recipe.image ? (
            <div style={styles.imageContainer}>
              <img src={recipe.image} alt={recipe.title} style={styles.image} />
              <div style={styles.imageGradient} />
            </div>
          ) : (
            <div style={styles.imagePlaceholder}>
              <span style={{ fontSize: 48, opacity: 0.5 }}>🍽</span>
            </div>
          )}

          <div style={styles.section}>
            <h1 style={styles.title}>{recipe.title}</h1>
            <div style={styles.tags}>
              {recipe.category && <Tag>{recipe.category}</Tag>}
              {recipe.difficulty && <Tag>{difficultyLabel[recipe.difficulty] ?? recipe.difficulty}</Tag>}
              {recipe.cookingTime && <Tag>⏱ {recipe.cookingTime}분</Tag>}
              {recipe.servings && <Tag>👤 {recipe.servings}인분</Tag>}
            </div>
            {recipe.lastCooked && (
              <p style={styles.lastCooked}>
                마지막 조리:{" "}
                {new Date(recipe.lastCooked).toLocaleDateString("ko-KR", {
                  year: "numeric", month: "long", day: "numeric",
                })}
              </p>
            )}
          </div>

          <Divider />

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>재료</h2>
            <ul style={styles.ingredientList}>
              {recipe.ingredients.map((ing, i) => (
                <li key={i} style={styles.ingredientItem}>
                  <span style={styles.ingredientName}>{ing.name}</span>
                  <span style={styles.ingredientAmount}>{ing.amount} {ing.unit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 오른쪽: 조리법 + 메모 */}
        <div className="detail-right">
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>조리법</h2>
            <ol style={styles.stepList}>
              {recipe.steps.map((step, i) => (
                <li key={i} style={styles.stepItem}>
                  <div style={styles.stepNum}>{i + 1}</div>
                  <p style={styles.stepText}>{step}</p>
                </li>
              ))}
            </ol>
          </div>

          {recipe.notes && (
            <>
              <Divider />
              <div style={styles.section}>
                <h2 style={styles.sectionTitle}>메모</h2>
                <p style={styles.notes}>{recipe.notes}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function Tag({ children }) {
  return <span style={styles.tag}>{children}</span>
}

function Divider() {
  return <hr style={styles.divider} />
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 20px",
    position: "sticky",
    top: 0,
    background: "rgba(250, 250, 250, 0.85)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    zIndex: 10,
    borderBottom: "1px solid var(--border-color)",
  },
  backBtn: {
    background: "transparent",
    border: "none",
    fontSize: 16,
    fontWeight: 600,
    cursor: "pointer",
    color: "var(--text-main)",
    padding: "6px 12px",
    borderRadius: "var(--radius-sm)",
    transition: "background var(--transition-fast)",
  },
  headerActions: {
    display: "flex",
    gap: 4,
  },
  iconBtn: {
    background: "transparent",
    border: "none",
    fontSize: 22,
    cursor: "pointer",
    padding: "8px",
    color: "var(--primary)",
    borderRadius: "var(--radius-pill)",
    transition: "background var(--transition-fast), transform var(--transition-bounce)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
  },
  image: {
    width: "100%",
    height: 320,
    objectFit: "cover",
  },
  imageGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "100px",
    background: "linear-gradient(to top, var(--bg-main), transparent)",
  },
  imagePlaceholder: {
    width: "100%",
    height: 240,
    background: "linear-gradient(135deg, #f0f0f0, #e0e0e0)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  section: {
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  title: {
    margin: 0,
    fontSize: 28,
    fontWeight: 800,
    letterSpacing: "-0.5px",
    color: "var(--text-main)",
    lineHeight: 1.2,
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
    padding: "6px 14px",
    fontSize: 13,
    fontWeight: 600,
  },
  sectionTitle: {
    margin: 0,
    fontSize: 20,
    fontWeight: 700,
    color: "var(--text-main)",
  },
  ingredientList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  ingredientItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 18px",
    background: "var(--bg-card)",
    borderRadius: "var(--radius-md)",
    fontSize: 16,
    boxShadow: "var(--shadow-sm)",
    border: "1px solid var(--border-color)",
  },
  ingredientName: {
    fontWeight: 600,
    color: "var(--text-main)",
  },
  ingredientAmount: {
    color: "var(--text-muted)",
    fontWeight: 500,
  },
  stepList: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  stepItem: {
    display: "flex",
    gap: 16,
    alignItems: "flex-start",
    background: "var(--bg-card)",
    borderRadius: "var(--radius-lg)",
    padding: "20px",
    boxShadow: "var(--shadow-sm)",
    border: "1px solid var(--border-color)",
  },
  stepNum: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    background: "var(--primary)",
    color: "#fff",
    fontSize: 15,
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    boxShadow: "0 2px 6px rgba(255,107,107,0.3)",
  },
  stepText: {
    margin: 0,
    fontSize: 16,
    lineHeight: 1.7,
    color: "var(--text-main)",
  },
  notes: {
    margin: 0,
    fontSize: 15,
    color: "var(--text-muted)",
    lineHeight: 1.7,
    background: "var(--bg-card)",
    borderRadius: "var(--radius-lg)",
    padding: "20px",
    border: "1px dashed var(--border-color)",
  },
  divider: {
    border: "none",
    borderTop: "1px solid var(--border-color)",
    margin: "0 24px",
  },
  cookBtn: {
    background: "var(--primary)",
    border: "none",
    borderRadius: "var(--radius-pill)",
    padding: "8px 16px",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    color: "#fff",
    marginLeft: 4,
    boxShadow: "0 2px 8px rgba(255,107,107,0.35)",
    transition: "background var(--transition-fast)",
  },
  lastCooked: {
    margin: 0,
    fontSize: 13,
    color: "var(--text-muted)",
    fontWeight: 500,
  },
}
