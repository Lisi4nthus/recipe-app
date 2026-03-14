import { createContext, useContext, useState } from "react"

const RecipeContext = createContext()

export function RecipeProvider({ children }) {
  const [recipes, setRecipes] = useState([])

  const addRecipe = (recipe) => {
    setRecipes((prev) => [...prev, { ...recipe, id: Date.now().toString() }])
  }

  const updateRecipe = (id, updated) => {
    setRecipes((prev) => prev.map((r) => (r.id === id ? { ...r, ...updated } : r)))
  }

  const deleteRecipe = (id) => {
    setRecipes((prev) => prev.filter((r) => r.id !== id))
  }

  const toggleFavorite = (id) => {
    setRecipes((prev) =>
      prev.map((r) => (r.id === id ? { ...r, favorite: !r.favorite } : r))
    )
  }

  return (
    <RecipeContext.Provider value={{ recipes, addRecipe, updateRecipe, deleteRecipe, toggleFavorite }}>
      {children}
    </RecipeContext.Provider>
  )
}

export function useRecipes() {
  return useContext(RecipeContext)
}