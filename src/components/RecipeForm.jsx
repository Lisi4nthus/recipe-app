import { useState, useRef } from "react"
import styles from "./RecipeForm.module.css"

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
    <div className={styles.page}>
      <header className={styles.header}>
        <button type="button" onClick={onBack} className={`${styles.backBtn} hover-subtle-btn`}>← 뒤로</button>
        <h2 className={styles.heading}>{heading}</h2>
        <div style={{ width: 60 }} />
      </header>

      <form onSubmit={handleSubmit} className={styles.inner}>
        <Field label="사진">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          {image ? (
            <div className={styles.imagePreviewWrapper}>
              <img src={image} alt="미리보기" className={styles.imagePreview} />
              <button
                type="button"
                className={styles.imageRemoveBtn}
                onClick={() => { setImage(null); fileInputRef.current.value = "" }}
              >
                ✕ 사진 제거
              </button>
            </div>
          ) : (
            <button
              type="button"
              className={styles.imageUploadBtn}
              onClick={() => fileInputRef.current.click()}
            >
              📷 사진 추가
            </button>
          )}
        </Field>

        <Field label="제목 *" error={errors.title}>
          <input
            className={`${styles.input} ${errors.title ? styles.inputError : ""}`}
            placeholder="레시피 이름"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Field>

        <Field label="카테고리">
          <div className={styles.chips}>
            {CATEGORIES.map((c) => (
              <button
                type="button" key={c}
                className={`${styles.chip} ${category === c ? styles.chipActive : ""}`}
                onClick={() => setCategory((prev) => (prev === c ? "" : c))}
              >{c}</button>
            ))}
          </div>
        </Field>

        <Field label="난이도">
          <div className={styles.chips}>
            {DIFFICULTIES.map((d) => (
              <button
                type="button" key={d.value}
                className={`${styles.chip} ${difficulty === d.value ? styles.chipActive : ""}`}
                onClick={() => setDifficulty((prev) => (prev === d.value ? "" : d.value))}
              >{d.label}</button>
            ))}
          </div>
        </Field>

        <div className={styles.row}>
          <Field label="조리 시간 (분)">
            <input className={styles.input} type="number" min="1" placeholder="30"
              value={cookingTime} onChange={(e) => setCookingTime(e.target.value)} />
          </Field>
          <Field label="인분">
            <input className={styles.input} type="number" min="1" placeholder="2"
              value={servings} onChange={(e) => setServings(e.target.value)} />
          </Field>
        </div>

        <Field label="재료 *" error={errors.ingredients}>
          {ingredients.map((ing, i) => (
            <div key={i} className={styles.ingredientRow}>
              <input className={styles.input} placeholder="재료명"
                value={ing.name} onChange={(e) => updateIngredient(i, "name", e.target.value)} />
              <input className={styles.input} placeholder="양"
                value={ing.amount} onChange={(e) => updateIngredient(i, "amount", e.target.value)} />
              <input className={styles.input} placeholder="단위"
                value={ing.unit} onChange={(e) => updateIngredient(i, "unit", e.target.value)} />
              {ingredients.length > 1 && (
                <button type="button" className={`${styles.removeBtn} hover-icon-btn`} onClick={() => removeIngredient(i)}>✕</button>
              )}
            </div>
          ))}
          <button type="button" className={`${styles.addBtn} hover-subtle-btn`} onClick={addIngredient}>+ 재료 추가</button>
        </Field>

        <Field label="조리법 *" error={errors.steps}>
          {steps.map((step, i) => (
            <div key={i} className={styles.stepRow}>
              <span className={styles.stepNum}>{i + 1}</span>
              <textarea
                className={styles.input}
                style={{ flex: 1, resize: "vertical", minHeight: 60 }}
                placeholder={`${i + 1}번째 순서`}
                value={step} onChange={(e) => updateStep(i, e.target.value)}
              />
              {steps.length > 1 && (
                <button type="button" className={`${styles.removeBtn} hover-icon-btn`} onClick={() => removeStep(i)}>✕</button>
              )}
            </div>
          ))}
          <button type="button" className={`${styles.addBtn} hover-subtle-btn`} onClick={addStep}>+ 순서 추가</button>
        </Field>

        <Field label="메모">
          <textarea className={styles.input} style={{ resize: "vertical", minHeight: 80 }}
            placeholder="추가 메모 (선택)" value={notes} onChange={(e) => setNotes(e.target.value)} />
        </Field>

        <button type="submit" className={`${styles.submitBtn} fab-btn`}>저장하기</button>
      </form>
    </div>
  )
}

function Field({ label, error, children }) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>
      {children}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  )
}
