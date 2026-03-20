import { useRecipes } from "../context/RecipeContext"
import styles from "./RecipeDetailPage.module.css"

const difficultyLabel = { easy: "쉬움", medium: "보통", hard: "어려움" }

export default function RecipeDetailPage({ recipeId, onBack, onEdit, onCook }) {
  const { recipes, toggleFavorite, deleteRecipe } = useRecipes()
  const recipe = recipes.find((r) => r.id === recipeId)

  if (!recipe) {
    return (
      <div className={styles.page}>
        <button onClick={onBack} className={`${styles.backBtn} hover-subtle-btn`}>← 뒤로</button>
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
    <div className={styles.page}>
      <header className={styles.header}>
        <button onClick={onBack} className={`${styles.backBtn} hover-subtle-btn`}>← 뒤로</button>
        <div className={styles.headerActions}>
          <button onClick={() => toggleFavorite(recipe.id)} className={`${styles.iconBtn} hover-icon-btn`}>
            {recipe.favorite ? "★" : "☆"}
          </button>
          <button onClick={onEdit} className={`${styles.iconBtn} hover-icon-btn`}>✏️</button>
          <button onClick={handleDelete} className={`${styles.iconBtn} hover-icon-btn`}>🗑</button>
          <button onClick={onCook} className={`${styles.cookBtn} hover-subtle-btn`}>🍳 조리 시작</button>
        </div>
      </header>

      <div className={styles.body}>
        <div className={styles.left}>
          {recipe.image ? (
            <div className={styles.imageContainer}>
              <img src={recipe.image} alt={recipe.title} className={styles.image} />
              <div className={styles.imageGradient} />
            </div>
          ) : (
            <div className={styles.imagePlaceholder}>
              <span style={{ fontSize: 48, opacity: 0.5 }}>🍽</span>
            </div>
          )}

          <div className={styles.section}>
            <h1 className={styles.title}>{recipe.title}</h1>
            <div className={styles.tags}>
              {recipe.category && <span className={styles.tag}>{recipe.category}</span>}
              {recipe.difficulty && <span className={styles.tag}>{difficultyLabel[recipe.difficulty] ?? recipe.difficulty}</span>}
              {recipe.cookingTime && <span className={styles.tag}>⏱ {recipe.cookingTime}분</span>}
              {recipe.servings && <span className={styles.tag}>👤 {recipe.servings}인분</span>}
            </div>
            {recipe.lastCooked && (
              <p className={styles.lastCooked}>
                마지막 조리:{" "}
                {new Date(recipe.lastCooked).toLocaleDateString("ko-KR", {
                  year: "numeric", month: "long", day: "numeric",
                })}
              </p>
            )}
          </div>

          <hr className={styles.divider} />

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>재료</h2>
            <ul className={styles.ingredientList}>
              {recipe.ingredients.map((ing, i) => (
                <li key={i} className={styles.ingredientItem}>
                  <span className={styles.ingredientName}>{ing.name}</span>
                  <span className={styles.ingredientAmount}>{ing.amount} {ing.unit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>조리법</h2>
            <ol className={styles.stepList}>
              {recipe.steps.map((step, i) => (
                <li key={i} className={styles.stepItem}>
                  <div className={styles.stepNum}>{i + 1}</div>
                  <p className={styles.stepText}>{step}</p>
                </li>
              ))}
            </ol>
          </div>

          {recipe.notes && (
            <>
              <hr className={styles.divider} />
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>메모</h2>
                <p className={styles.notes}>{recipe.notes}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
