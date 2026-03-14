import { useRecipes } from "../context/RecipeContext"
import RecipeForm from "../components/RecipeForm"

export default function AddRecipePage({ onBack }) {
  const { addRecipe } = useRecipes()

  const handleSubmit = (data) => {
    addRecipe({ ...data, favorite: false, lastCooked: null, image: null })
    onBack()
  }

  return <RecipeForm heading="레시피 추가" onBack={onBack} onSubmit={handleSubmit} />
}
