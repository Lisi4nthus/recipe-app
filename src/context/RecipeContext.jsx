import { createContext, useContext, useState, useEffect } from "react"
import { db } from "../firebase"
import {
  collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc,
} from "firebase/firestore"

const RecipeContext = createContext()

export function RecipeProvider({ children }) {
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "recipes"), (snapshot) => {
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }))
      setRecipes(data)
    })
    return unsub
  }, [])

  const addRecipe = (recipe) => {
    return addDoc(collection(db, "recipes"), recipe)
  }

  const updateRecipe = (id, updated) => {
    return updateDoc(doc(db, "recipes", id), updated)
  }

  const deleteRecipe = (id) => {
    return deleteDoc(doc(db, "recipes", id))
  }

  const toggleFavorite = (id) => {
    const recipe = recipes.find((r) => r.id === id)
    if (recipe) return updateDoc(doc(db, "recipes", id), { favorite: !recipe.favorite })
  }

  const recordCooking = (id) => {
    return updateDoc(doc(db, "recipes", id), { lastCooked: new Date().toISOString() })
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
