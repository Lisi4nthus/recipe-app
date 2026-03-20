import { createContext, useContext, useState, useEffect } from "react"

const RecipeContext = createContext()
const STORAGE_KEY = "recipes"

export function RecipeProvider({ children }) {
  const [recipes, setRecipes] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes))
  }, [recipes])

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

  const recordCooking = (id) => {
    setRecipes((prev) =>
      prev.map((r) => (r.id === id ? { ...r, lastCooked: new Date().toISOString() } : r))
    )
  }

  return (
    <RecipeContext.Provider value={{ recipes, addRecipe, updateRecipe, deleteRecipe, toggleFavorite, recordCooking }}>
      {children}
    </RecipeContext.Provider>
  )
}

export function useRecipes() {
  return useContext(RecipeContext)
}