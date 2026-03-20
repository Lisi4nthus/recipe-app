import { useRecipes } from "../context/RecipeContext"

const difficultyLabel = { easy: "쉬움", medium: "보통", hard: "어려움" }

export default function RecipeCard({ recipe, onSelect }) {
  const { toggleFavorite, deleteRecipe } = useRecipes()

  return (
    <div className="card hover-card" onClick={onSelect} role="button" tabIndex={0}>
      {recipe.image && (
        <img src={recipe.image} alt={recipe.title} className="card-image" />
      )}
      <div className="card-body">
        <div className="card-header">
          <h3 className="card-title">{recipe.title}</h3>
          <button
            onClick={(e) => { e.stopPropagation(); toggleFavorite(recipe.id) }}
            className="card-favorite-btn hover-icon-btn"
            aria-label="즐겨찾기"
          >
            {recipe.favorite ? "★" : "☆"}
          </button>
        </div>

        <div className="card-tags">
          {recipe.category && <span className="card-tag">{recipe.category}</span>}
          {recipe.difficulty && (
            <span className="card-tag">{difficultyLabel[recipe.difficulty] ?? recipe.difficulty}</span>
          )}
          {recipe.cookingTime && <span className="card-tag">{recipe.cookingTime}분</span>}
          {recipe.servings && <span className="card-tag">{recipe.servings}인분</span>}
        </div>

        {recipe.notes && <p className="card-notes">{recipe.notes}</p>}

        <button
          onClick={(e) => { e.stopPropagation(); deleteRecipe(recipe.id) }}
          className="card-delete-btn hover-subtle-btn"
        >
          삭제
        </button>
      </div>
    </div>
  )
}
