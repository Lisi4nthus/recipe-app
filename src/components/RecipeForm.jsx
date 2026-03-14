import { useState, useRef } from "react"

const CATEGORIES = ["한식", "양식", "중식", "일식"]
const DIFFICULTIES = [
  { value: "easy", label: "쉬움" },
  { value: "medium", label: "보통" },
  { value: "hard", label: "어려움" },
]

const emptyIngredient = () => ({ name: "", amount: "", unit: "" })

export default function RecipeForm({ initial, onSubmit, onBack, heading }) {
  const [title, setTitle] = useState(initial?.title ?? "")
  const [category, setCategory] = useState(initial?.category ?? "")
  const [cookingTime, setCookingTime] = useState(initial?.cookingTime ?? "")
  const [difficulty, setDifficulty] = useState(initial?.difficulty ?? "")
  const [servings, setServings] = useState(initial?.servings ?? "")
  const [ingredients, setIngredients] = useState(
    initial?.ingredients?.length ? initial.ingredients : [emptyIngredient()]
  )
  const [steps, setSteps] = useState(initial?.steps?.length ? initial.steps : [""])
  const [notes, setNotes] = useState(initial?.notes ?? "")
  const [image, setImage] = useState(initial?.image ?? null)
  const [errors, setErrors] = useState({})
  const fileInputRef = useRef()

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const img = new Image()
      img.onload = () => {
        const MAX_WIDTH = 800
        const scale = Math.min(1, MAX_WIDTH / img.width)
        const canvas = document.createElement("canvas")
        canvas.width = img.width * scale
        canvas.height = img.height * scale
        canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height)
        setImage(canvas.toDataURL("image/jpeg", 0.75))
      }
      img.src = ev.target.result
    }
    reader.readAsDataURL(file)
  }

  const updateIngredient = (i, field, value) =>
    setIngredients((prev) => prev.map((item, idx) => (idx === i ? { ...item, [field]: value } : item)))
  const addIngredient = () => setIngredients((prev) => [...prev, emptyIngredient()])
  const removeIngredient = (i) => setIngredients((prev) => prev.filter((_, idx) => idx !== i))

  const updateStep = (i, value) => setSteps((prev) => prev.map((s, idx) => (idx === i ? value : s)))
  const addStep = () => setSteps((prev) => [...prev, ""])
  const removeStep = (i) => setSteps((prev) => prev.filter((_, idx) => idx !== i))

  const validate = () => {
    const e = {}
    if (!title.trim()) e.title = "제목을 입력해주세요"
    if (ingredients.every((ing) => !ing.name.trim())) e.ingredients = "재료를 최소 1개 입력해주세요"
    if (steps.every((s) => !s.trim())) e.steps = "조리법을 최소 1개 입력해주세요"
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    onSubmit({
      title: title.trim(),
      category,
      cookingTime: cookingTime ? Number(cookingTime) : null,
      difficulty,
      servings: servings ? Number(servings) : null,
      ingredients: ingredients.filter((ing) => ing.name.trim()),
      steps: steps.filter((s) => s.trim()),
      notes: notes.trim(),
      image: image ?? null,
    })
  }

  return (
    <div className="page-form">
      <header style={styles.header}>
        <button type="button" onClick={onBack} style={styles.backBtn} className="hover-subtle-btn">← 뒤로</button>
        <h2 style={styles.heading}>{heading}</h2>
        <div style={{ width: 60 }} />
      </header>

      <form onSubmit={handleSubmit} style={styles.form} className="form-inner">
        <Field label="사진">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          {image ? (
            <div style={styles.imagePreviewWrapper}>
              <img src={image} alt="미리보기" style={styles.imagePreview} />
              <button
                type="button"
                style={styles.imageRemoveBtn}
                onClick={() => { setImage(null); fileInputRef.current.value = "" }}
              >
                ✕ 사진 제거
              </button>
            </div>
          ) : (
            <button
              type="button"
              style={styles.imageUploadBtn}
              onClick={() => fileInputRef.current.click()}
            >
              📷 사진 추가
            </button>
          )}
        </Field>

        <Field label="제목 *" error={errors.title}>
          <input
            style={inputStyle(errors.title)}
            placeholder="레시피 이름"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Field>

        <Field label="카테고리">
          <div style={styles.chips}>
            {CATEGORIES.map((c) => (
              <button
                type="button" key={c}
                style={{ ...styles.chip, ...(category === c ? styles.chipActive : {}) }}
                onClick={() => setCategory((prev) => (prev === c ? "" : c))}
              >{c}</button>
            ))}
          </div>
        </Field>

        <Field label="난이도">
          <div style={styles.chips}>
            {DIFFICULTIES.map((d) => (
              <button
                type="button" key={d.value}
                style={{ ...styles.chip, ...(difficulty === d.value ? styles.chipActive : {}) }}
                onClick={() => setDifficulty((prev) => (prev === d.value ? "" : d.value))}
              >{d.label}</button>
            ))}
          </div>
        </Field>

        <div style={styles.row}>
          <Field label="조리 시간 (분)" style={{ flex: 1 }}>
            <input style={inputStyle()} type="number" min="1" placeholder="30"
              value={cookingTime} onChange={(e) => setCookingTime(e.target.value)} />
          </Field>
          <Field label="인분" style={{ flex: 1 }}>
            <input style={inputStyle()} type="number" min="1" placeholder="2"
              value={servings} onChange={(e) => setServings(e.target.value)} />
          </Field>
        </div>

        <Field label="재료 *" error={errors.ingredients}>
          {ingredients.map((ing, i) => (
            <div key={i} style={styles.ingredientRow}>
              <input style={{ ...inputStyle(), flex: 3 }} placeholder="재료명"
                value={ing.name} onChange={(e) => updateIngredient(i, "name", e.target.value)} />
              <input style={{ ...inputStyle(), flex: 2 }} placeholder="양"
                value={ing.amount} onChange={(e) => updateIngredient(i, "amount", e.target.value)} />
              <input style={{ ...inputStyle(), flex: 2 }} placeholder="단위"
                value={ing.unit} onChange={(e) => updateIngredient(i, "unit", e.target.value)} />
              {ingredients.length > 1 && (
                <button type="button" style={styles.removeBtn} className="hover-icon-btn" onClick={() => removeIngredient(i)}>✕</button>
              )}
            </div>
          ))}
          <button type="button" style={styles.addBtn} className="hover-subtle-btn" onClick={addIngredient}>+ 재료 추가</button>
        </Field>

        <Field label="조리법 *" error={errors.steps}>
          {steps.map((step, i) => (
            <div key={i} style={styles.stepRow}>
              <span style={styles.stepNum}>{i + 1}</span>
              <textarea
                style={{ ...inputStyle(), flex: 1, resize: "vertical", minHeight: 60 }}
                placeholder={`${i + 1}번째 순서`}
                value={step} onChange={(e) => updateStep(i, e.target.value)}
              />
              {steps.length > 1 && (
                <button type="button" style={styles.removeBtn} className="hover-icon-btn" onClick={() => removeStep(i)}>✕</button>
              )}
            </div>
          ))}
          <button type="button" style={styles.addBtn} className="hover-subtle-btn" onClick={addStep}>+ 순서 추가</button>
        </Field>

        <Field label="메모">
          <textarea style={{ ...inputStyle(), resize: "vertical", minHeight: 80 }}
            placeholder="추가 메모 (선택)" value={notes} onChange={(e) => setNotes(e.target.value)} />
        </Field>

        <button type="submit" style={styles.submitBtn} className="fab-btn">저장하기</button>
      </form>
    </div>
  )
}

function Field({ label, error, children, style }) {
  return (
    <div style={{ ...styles.field, ...style }}>
      <label style={styles.label}>{label}</label>
      {children}
      {error && <p style={styles.error}>{error}</p>}
    </div>
  )
}

const inputStyle = (error) => ({
  width: "100%",
  padding: "12px 16px",
  borderRadius: "var(--radius-md)",
  border: `1px solid ${error ? "#ef4444" : "var(--border-color)"}`,
  fontSize: 16,
  boxSizing: "border-box",
  background: "var(--bg-input)",
  transition: "border-color var(--transition-fast), box-shadow var(--transition-fast)",
  color: "var(--text-main)",
  outline: "none",
  appearance: "none", // remove default styles on some browsers
})

const styles = {
  page: { 
    maxWidth: 640, 
    margin: "0 auto", 
    padding: "0 0 60px", 
    minHeight: "100vh", 
    position: "relative" 
  },
  header: { 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "space-between", 
    padding: "16px 20px", 
    position: "sticky", 
    top: 0, 
    background: "rgba(250, 250, 250, 0.85)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)", 
    zIndex: 10,
    borderBottom: "1px solid var(--border-color)",
  },
  backBtn: { 
    background: "none", 
    border: "none", 
    fontSize: 16, 
    fontWeight: 600,
    cursor: "pointer", 
    color: "var(--text-main)", 
    padding: "6px 8px", 
    width: 70,
    textAlign: "left",
  },
  heading: { margin: 0, fontSize: 18, fontWeight: 700, color: "var(--text-main)" },
  form: { display: "flex", flexDirection: "column", gap: 24, padding: "24px 20px" },
  field: { display: "flex", flexDirection: "column", gap: 10 },
  label: { fontSize: 15, fontWeight: 600, color: "var(--text-main)" },
  error: { margin: 0, fontSize: 13, color: "#ef4444", fontWeight: 500, marginTop: 4 },
  chips: { display: "flex", gap: 8, flexWrap: "wrap" },
  chip: { 
    background: "var(--bg-card)", 
    border: "1px solid var(--border-color)", 
    borderRadius: "var(--radius-pill)", 
    padding: "8px 16px", 
    fontSize: 14, 
    cursor: "pointer", 
    color: "var(--text-muted)",
    transition: "all var(--transition-fast)",
    fontWeight: 500,
  },
  chipActive: { 
    background: "var(--text-main)", 
    color: "var(--bg-card)", 
    borderColor: "var(--text-main)",
    boxShadow: "var(--shadow-sm)",
  },
  row: { display: "flex", gap: 16 },
  ingredientRow: { display: "flex", gap: 8, alignItems: "center" },
  stepRow: { display: "flex", gap: 12, alignItems: "flex-start" },
  stepNum: { 
    width: 28, 
    height: 28, 
    borderRadius: "50%", 
    background: "var(--primary)", 
    color: "#fff", 
    fontSize: 14, 
    fontWeight: 700,
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center", 
    flexShrink: 0, 
    marginTop: 10,
    boxShadow: "0 2px 4px rgba(255,107,107,0.2)",
  },
  removeBtn: { 
    background: "none", 
    border: "none", 
    fontSize: 18, 
    color: "var(--text-light)", 
    cursor: "pointer", 
    padding: "8px", 
    flexShrink: 0,
    transition: "color var(--transition-fast)",
  },
  addBtn: { 
    background: "transparent", 
    border: "1px dashed var(--border-color)", 
    borderRadius: "var(--radius-md)", 
    padding: "12px", 
    fontSize: 15, 
    fontWeight: 500,
    color: "var(--text-muted)", 
    cursor: "pointer", 
    width: "100%",
    transition: "all var(--transition-fast)",
  },
  imageUploadBtn: {
    width: "100%",
    padding: "32px",
    border: "2px dashed var(--border-color)",
    borderRadius: "var(--radius-lg)",
    background: "var(--bg-input)",
    color: "var(--text-muted)",
    fontSize: 15,
    fontWeight: 500,
    cursor: "pointer",
    transition: "all var(--transition-fast)",
  },
  imagePreviewWrapper: {
    position: "relative",
    borderRadius: "var(--radius-lg)",
    overflow: "hidden",
  },
  imagePreview: {
    width: "100%",
    height: 220,
    objectFit: "cover",
    display: "block",
  },
  imageRemoveBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    background: "rgba(0,0,0,0.55)",
    color: "#fff",
    border: "none",
    borderRadius: "var(--radius-pill)",
    padding: "6px 14px",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
  },
  submitBtn: {
    background: "linear-gradient(135deg, var(--primary), var(--primary-hover))", 
    color: "#fff", 
    border: "none", 
    borderRadius: "var(--radius-md)", 
    padding: "16px", 
    fontSize: 16, 
    fontWeight: 700, 
    cursor: "pointer", 
    width: "100%",
    boxShadow: "var(--shadow-md)",
    marginTop: 8,
  },
}
