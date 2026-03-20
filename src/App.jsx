import { useState } from "react"
import { RecipeProvider } from "./context/RecipeContext"
import RecipeListPage from "./pages/RecipeListPage"
import AddRecipePage from "./pages/AddRecipePage"
import RecipeDetailPage from "./pages/RecipeDetailPage"
import EditRecipePage from "./pages/EditRecipePage"
import CookingModePage from "./pages/CookingModePage"

function App() {
  const [page, setPage] = useState("list")
  const [selectedId, setSelectedId] = useState(null)

  const goDetail = (id) => { setSelectedId(id); setPage("detail") }
  const goEdit = (id) => { setSelectedId(id); setPage("edit") }
  const goCooking = (id) => { setSelectedId(id); setPage("cooking") }

  return (
    <RecipeProvider>
      {page === "list" && (
        <RecipeListPage onAdd={() => setPage("add")} onSelect={goDetail} />
      )}
      {page === "add" && <AddRecipePage onBack={() => setPage("list")} />}
      {page === "detail" && (
        <RecipeDetailPage
          recipeId={selectedId}
          onBack={() => setPage("list")}
          onEdit={() => goEdit(selectedId)}
          onCook={() => goCooking(selectedId)}
        />
      )}
      {page === "edit" && (
        <EditRecipePage
          recipeId={selectedId}
          onBack={() => goDetail(selectedId)}
        />
      )}
      {page === "cooking" && (
        <CookingModePage
          recipeId={selectedId}
          onBack={() => goDetail(selectedId)}
        />
      )}
    </RecipeProvider>
  )
}

export default App
