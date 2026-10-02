export type Interval = 'month' | 'year'
export default function IntervalToggle({ value, onChange }: { value: Interval; onChange: (v: Interval) => void }) {
  return (
    <div className="toggle" role="group" aria-label="Abrechnungszeitraum">
      {(['month', 'year'] as const).map((v) => (
        <button key={v} type="button" aria-pressed={value === v} onClick={() => onChange(v)}>{v === 'month' ? 'Monatlich' : 'Jährlich'}</button>
      ))}
    </div>
  )
}
