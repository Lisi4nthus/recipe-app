import { useState } from "react"
import { RecipeProvider } from "./context/RecipeContext"
import RecipeListPage from "./pages/RecipeListPage"
import AddRecipePage from "./pages/AddRecipePage"
import RecipeDetailPage from "./pages/RecipeDetailPage"
import EditRecipePage from "./pages/EditRecipePage"

function App() {
  const [page, setPage] = useState("list")
  const [selectedId, setSelectedId] = useState(null)

  const goDetail = (id) => { setSelectedId(id); setPage("detail") }
  const goEdit = (id) => { setSelectedId(id); setPage("edit") }

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
        />
      )}
      {page === "edit" && (
        <EditRecipePage
          recipeId={selectedId}
          onBack={() => goDetail(selectedId)}
        />
      )}
    </RecipeProvider>
  )
}

export default App
