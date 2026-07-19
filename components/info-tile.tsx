'use client'

export default function InfoTile({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="mb-2 text-lg font-semibold text-gray-900">{title}</h2>
      <p className="text-sm leading-relaxed text-gray-700">{children}</p>
    </article>
  )
}
