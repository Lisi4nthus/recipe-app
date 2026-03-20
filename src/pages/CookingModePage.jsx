import { useState } from "react"
import { useRecipes } from "../context/RecipeContext"

export default function CookingModePage({ recipeId, onBack }) {
  const { recipes, recordCooking } = useRecipes()
  const recipe = recipes.find((r) => r.id === recipeId)
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)

  if (!recipe) {
    return (
      <div style={styles.page}>
        <button onClick={onBack} style={styles.exitBtn}>✕ 나가기</button>
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
      <div style={styles.page}>
        <div style={styles.doneWrap}>
          <div style={styles.doneEmoji}>🎉</div>
          <h2 style={styles.doneTitle}>조리 완료!</h2>
          <p style={styles.doneSub}>{recipe.title}</p>
          <p style={styles.doneDate}>
            {new Date().toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" })} 요리 기록 저장됨
          </p>
          <button onClick={onBack} style={styles.doneBtn}>← 레시피로 돌아가기</button>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.page}>
      {/* 헤더 */}
      <header style={styles.header}>
        <button onClick={onBack} style={styles.exitBtn} className="hover-subtle-btn">✕ 나가기</button>
        <span style={styles.recipeTitle}>{recipe.title}</span>
        <span style={styles.progress}>{step + 1} / {total}</span>
      </header>

      {/* 진행 바 */}
      <div style={styles.progressBarBg}>
        <div style={{ ...styles.progressBarFill, width: `${((step + 1) / total) * 100}%` }} />
      </div>

      {/* 단계 내용 */}
      <div style={styles.body}>
        <div style={styles.stepBadge}>{step + 1}단계</div>
        <p style={styles.stepText}>{steps[step]}</p>
      </div>

      {/* 하단 버튼 */}
      <div style={styles.footer}>
        <button
          onClick={() => setStep((s) => s - 1)}
          disabled={step === 0}
          style={{ ...styles.navBtn, opacity: step === 0 ? 0.3 : 1 }}
          className="hover-subtle-btn"
        >
          ← 이전
        </button>

        {isLast ? (
          <button onClick={handleComplete} style={styles.completeBtn}>
            조리 완료 ✓
          </button>
        ) : (
          <button onClick={() => setStep((s) => s + 1)} style={styles.nextBtn} className="hover-subtle-btn">
            다음 →
          </button>
        )}
      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "var(--bg-main)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 20px",
    borderBottom: "1px solid var(--border-color)",
    position: "sticky",
    top: 0,
    background: "rgba(250, 250, 250, 0.9)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    zIndex: 10,
  },
  exitBtn: {
    background: "transparent",
    border: "none",
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
    color: "var(--text-muted)",
    padding: "6px 10px",
    borderRadius: "var(--radius-sm)",
    transition: "background var(--transition-fast)",
  },
  recipeTitle: {
    fontSize: 15,
    fontWeight: 700,
    color: "var(--text-main)",
    flex: 1,
    textAlign: "center",
    padding: "0 12px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  progress: {
    fontSize: 14,
    fontWeight: 700,
    color: "var(--primary)",
    minWidth: 48,
    textAlign: "right",
  },
  progressBarBg: {
    height: 4,
    background: "var(--border-color)",
  },
  progressBarFill: {
    height: "100%",
    background: "var(--primary)",
    transition: "width 0.3s ease",
    borderRadius: "0 2px 2px 0",
  },
  body: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "48px 32px",
    gap: 32,
  },
  stepBadge: {
    background: "var(--primary)",
    color: "#fff",
    borderRadius: "var(--radius-pill)",
    padding: "8px 20px",
    fontSize: 16,
    fontWeight: 700,
    boxShadow: "0 4px 12px rgba(255,107,107,0.3)",
  },
  stepText: {
    margin: 0,
    fontSize: 26,
    fontWeight: 600,
    lineHeight: 1.6,
    color: "var(--text-main)",
    textAlign: "center",
    maxWidth: 480,
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 24px",
    borderTop: "1px solid var(--border-color)",
    gap: 12,
  },
  navBtn: {
    background: "var(--bg-card)",
    border: "1px solid var(--border-color)",
    borderRadius: "var(--radius-lg)",
    padding: "14px 28px",
    fontSize: 16,
    fontWeight: 600,
    cursor: "pointer",
    color: "var(--text-main)",
    transition: "background var(--transition-fast)",
    flex: 1,
  },
  nextBtn: {
    background: "var(--bg-card)",
    border: "1px solid var(--border-color)",
    borderRadius: "var(--radius-lg)",
    padding: "14px 28px",
    fontSize: 16,
    fontWeight: 600,
    cursor: "pointer",
    color: "var(--text-main)",
    transition: "background var(--transition-fast)",
    flex: 1,
  },
  completeBtn: {
    background: "var(--primary)",
    border: "none",
    borderRadius: "var(--radius-lg)",
    padding: "14px 28px",
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
    color: "#fff",
    flex: 1,
    boxShadow: "0 4px 12px rgba(255,107,107,0.35)",
    transition: "transform 0.1s ease",
  },
  doneWrap: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "48px 32px",
    gap: 16,
  },
  doneEmoji: {
    fontSize: 72,
    marginBottom: 8,
  },
  doneTitle: {
    margin: 0,
    fontSize: 32,
    fontWeight: 800,
    color: "var(--text-main)",
  },
  doneSub: {
    margin: 0,
    fontSize: 18,
    fontWeight: 600,
    color: "var(--primary)",
  },
  doneDate: {
    margin: 0,
    fontSize: 14,
    color: "var(--text-muted)",
  },
  doneBtn: {
    marginTop: 24,
    background: "var(--primary)",
    border: "none",
    borderRadius: "var(--radius-lg)",
    padding: "14px 32px",
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
    color: "#fff",
    boxShadow: "0 4px 12px rgba(255,107,107,0.35)",
  },
}
