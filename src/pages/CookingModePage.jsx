import { useState } from "react"
import { useRecipes } from "../context/RecipeContext"

export default function CookingModePage({ recipeId, onBack }) {
  const { recipes, recordCooking } = useRecipes()
  const recipe = recipes.find((r) => r.id === recipeId)
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)

  if (!recipe) {
    return (
      <div className="cooking-page">
        <button onClick={onBack} className="cooking-exit-btn">✕ 나가기</button>
        <p style={{ textAlign: "center", color: "#aaa", marginTop: 80 }}>레시피를 찾을 수 없습니다.</p>
      </div>
    )
  }

  const steps = recipe.steps
  const total = steps.length
  const isLast = step === total - 1

  const handleComplete = () => {
    recordCooking(recipe.id)
    setDone(true)
  }

  if (done) {
    return (
      <div className="cooking-page">
        <div className="cooking-done-wrap">
          <div className="cooking-done-emoji">🎉</div>
          <h2 className="cooking-done-title">조리 완료!</h2>
          <p className="cooking-done-sub">{recipe.title}</p>
          <p className="cooking-done-date">
            {new Date().toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" })} 요리 기록 저장됨
          </p>
          <button onClick={onBack} className="cooking-done-btn">← 레시피로 돌아가기</button>
        </div>
      </div>
    )
  }

  return (
    <div className="cooking-page">
      <header className="cooking-header">
        <button onClick={onBack} className="cooking-exit-btn hover-subtle-btn">✕ 나가기</button>
        <span className="cooking-recipe-title">{recipe.title}</span>
        <span className="cooking-progress-label">{step + 1} / {total}</span>
      </header>

      <div className="cooking-progress-bar-bg">
        <div
          className="cooking-progress-bar-fill"
          style={{ width: `${((step + 1) / total) * 100}%` }}
        />
      </div>

      <div className="cooking-body">
        <div className="cooking-step-badge">{step + 1}단계</div>
        <p className="cooking-step-text">{steps[step]}</p>
      </div>

      <div className="cooking-footer">
        <button
          onClick={() => setStep((s) => s - 1)}
          disabled={step === 0}
          className="cooking-nav-btn hover-subtle-btn"
        >
          ← 이전
        </button>

        {isLast ? (
          <button onClick={handleComplete} className="cooking-complete-btn">
            조리 완료 ✓
          </button>
        ) : (
          <button onClick={() => setStep((s) => s + 1)} className="cooking-next-btn hover-subtle-btn">
            다음 →
          </button>
        )}
      </div>
    </div>
  )
}
