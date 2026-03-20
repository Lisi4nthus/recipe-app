import { useRecipes } from "../context/RecipeContext"
import styles from "./RecipeCard.module.css"

const difficultyLabel = { easy: "쉬움", medium: "보통", hard: "어려움" }

export default function RecipeCard({ recipe, onSelect }) {
  const { toggleFavorite, deleteRecipe } = useRecipes()

  return (
    <div className={`${styles.card} hover-card`} onClick={onSelect} role="button" tabIndex={0}>
      {recipe.image && (
        <img src={recipe.image} alt={recipe.title} className={styles.image} />
      )}
      <div className={styles.body}>
        <div className={styles.header}>
          <h3 className={styles.title}>{recipe.title}</h3>
          <button
            onClick={(e) => { e.stopPropagation(); toggleFavorite(recipe.id) }}
            className={`${styles.favoriteBtn} hover-icon-btn`}
            aria-label="즐겨찾기"
          >
            {recipe.favorite ? "★" : "☆"}
          </button>
        </div>

        <div className={styles.tags}>
          {recipe.category && <span className={styles.tag}>{recipe.category}</span>}
          {recipe.difficulty && (
            <span className={styles.tag}>{difficultyLabel[recipe.difficulty] ?? recipe.difficulty}</span>
          )}
          {recipe.cookingTime && <span className={styles.tag}>{recipe.cookingTime}분</span>}
          {recipe.servings && <span className={styles.tag}>{recipe.servings}인분</span>}
        </div>

        {recipe.notes && <p className={styles.notes}>{recipe.notes}</p>}

        <button
          onClick={(e) => { e.stopPropagation(); deleteRecipe(recipe.id) }}
          className={`${styles.deleteBtn} hover-subtle-btn`}
        >
          삭제
        </button>
      </div>
    </div>
  )
}
