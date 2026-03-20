import { useState } from "react"
import { useRecipes } from "../context/RecipeContext"
import styles from "./CookingModePage.module.css"

export default function CookingModePage({ recipeId, onBack }) {
  const { recipes, recordCooking } = useRecipes()
  const recipe = recipes.find((r) => r.id === recipeId)
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)

  if (!recipe) {
    return (
      <div className={styles.page}>
        <button onClick={onBack} className={styles.exitBtn}>✕ 나가기</button>
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
      <div className={styles.page}>
        <div className={styles.doneWrap}>
          <div className={styles.doneEmoji}>🎉</div>
          <h2 className={styles.doneTitle}>조리 완료!</h2>
          <p className={styles.doneSub}>{recipe.title}</p>
          <p className={styles.doneDate}>
            {new Date().toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" })} 요리 기록 저장됨
          </p>
          <button onClick={onBack} className={styles.doneBtn}>← 레시피로 돌아가기</button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button onClick={onBack} className={`${styles.exitBtn} hover-subtle-btn`}>✕ 나가기</button>
        <span className={styles.recipeTitle}>{recipe.title}</span>
        <span className={styles.progressLabel}>{step + 1} / {total}</span>
      </header>

      <div className={styles.progressBarBg}>
        <div
          className={styles.progressBarFill}
          style={{ width: `${((step + 1) / total) * 100}%` }}
        />
      </div>

      <div className={styles.body}>
        <div className={styles.stepBadge}>{step + 1}단계</div>
        <p className={styles.stepText}>{steps[step]}</p>
      </div>

      <div className={styles.footer}>
        <button
          onClick={() => setStep((s) => s - 1)}
          disabled={step === 0}
          className={`${styles.navBtn} hover-subtle-btn`}
        >
          ← 이전
        </button>

        {isLast ? (
          <button onClick={handleComplete} className={styles.completeBtn}>
            조리 완료 ✓
          </button>
        ) : (
          <button onClick={() => setStep((s) => s + 1)} className={`${styles.nextBtn} hover-subtle-btn`}>
            다음 →
          </button>
        )}
      </div>
    </div>
  )
}
