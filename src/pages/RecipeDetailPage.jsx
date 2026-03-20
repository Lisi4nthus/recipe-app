import { useRecipes } from "../context/RecipeContext"

const difficultyLabel = { easy: "쉬움", medium: "보통", hard: "어려움" }

export default function RecipeDetailPage({ recipeId, onBack, onEdit, onCook }) {
  const { recipes, toggleFavorite, deleteRecipe } = useRecipes()
  const recipe = recipes.find((r) => r.id === recipeId)

  if (!recipe) {
    return (
      <div className="page-detail">
        <button onClick={onBack} className="detail-back-btn hover-subtle-btn">← 뒤로</button>
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
      <header className="detail-header">
        <button onClick={onBack} className="detail-back-btn hover-subtle-btn">← 뒤로</button>
        <div className="detail-header-actions">
          <button onClick={() => toggleFavorite(recipe.id)} className="detail-icon-btn hover-icon-btn">
            {recipe.favorite ? "★" : "☆"}
          </button>
          <button onClick={onEdit} className="detail-icon-btn hover-icon-btn">✏️</button>
          <button onClick={handleDelete} className="detail-icon-btn hover-icon-btn">🗑</button>
          <button onClick={onCook} className="detail-cook-btn hover-subtle-btn">🍳 조리 시작</button>
        </div>
      </header>

      <div className="detail-body">
        <div className="detail-left">
          {recipe.image ? (
            <div className="detail-image-container">
              <img src={recipe.image} alt={recipe.title} className="detail-image" />
              <div className="detail-image-gradient" />
            </div>
          ) : (
            <div className="detail-image-placeholder">
              <span style={{ fontSize: 48, opacity: 0.5 }}>🍽</span>
            </div>
          )}

          <div className="detail-section">
            <h1 className="detail-title">{recipe.title}</h1>
            <div className="detail-tags">
              {recipe.category && <span className="detail-tag">{recipe.category}</span>}
              {recipe.difficulty && <span className="detail-tag">{difficultyLabel[recipe.difficulty] ?? recipe.difficulty}</span>}
              {recipe.cookingTime && <span className="detail-tag">⏱ {recipe.cookingTime}분</span>}
              {recipe.servings && <span className="detail-tag">👤 {recipe.servings}인분</span>}
            </div>
            {recipe.lastCooked && (
              <p className="detail-last-cooked">
                마지막 조리:{" "}
                {new Date(recipe.lastCooked).toLocaleDateString("ko-KR", {
                  year: "numeric", month: "long", day: "numeric",
                })}
              </p>
            )}
          </div>

          <hr className="detail-divider" />

          <div className="detail-section">
            <h2 className="detail-section-title">재료</h2>
            <ul className="detail-ingredient-list">
              {recipe.ingredients.map((ing, i) => (
                <li key={i} className="detail-ingredient-item">
                  <span className="detail-ingredient-name">{ing.name}</span>
                  <span className="detail-ingredient-amount">{ing.amount} {ing.unit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="detail-right">
          <div className="detail-section">
            <h2 className="detail-section-title">조리법</h2>
            <ol className="detail-step-list">
              {recipe.steps.map((step, i) => (
                <li key={i} className="detail-step-item">
                  <div className="detail-step-num">{i + 1}</div>
                  <p className="detail-step-text">{step}</p>
                </li>
              ))}
            </ol>
          </div>

          {recipe.notes && (
            <>
              <hr className="detail-divider" />
              <div className="detail-section">
                <h2 className="detail-section-title">메모</h2>
                <p className="detail-notes">{recipe.notes}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
