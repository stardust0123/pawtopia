"use client"

type Props = {
  value: string
  onChange: (v: string) => void
}

export default function PharmacySearch({ value, onChange }: Props) {
  return (
    <input
      className="w-full max-w-xl border rounded-xl p-3 mx-auto block"
      placeholder="Search pharmacy by name or location..."
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  )
}
