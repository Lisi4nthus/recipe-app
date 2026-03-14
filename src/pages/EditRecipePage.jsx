import { useRecipes } from "../context/RecipeContext"
import RecipeForm from "../components/RecipeForm"

export default function EditRecipePage({ recipeId, onBack }) {
  const { recipes, updateRecipe } = useRecipes()
  const recipe = recipes.find((r) => r.id === recipeId)

  if (!recipe) {
    return (
      <div style={{ padding: 20 }}>
        <button onClick={onBack}>← 뒤로</button>
        <p>레시피를 찾을 수 없습니다.</p>
      </div>
    )
  }

  const handleSubmit = (data) => {
    updateRecipe(recipeId, data)
    onBack()
  }

  return (
    <RecipeForm
      heading="레시피 수정"
      initial={recipe}
      onBack={onBack}
      onSubmit={handleSubmit}
    />
  )
}
