const MONO = "'Cascadia Code', ui-monospace, SFMono-Regular, Menlo, monospace"

// Section label as a path, like the prompt in the hero
export function SectionPath({ path, className = 'mb-6' }) {
  return (
    <p className={`text-[12.5px] text-zinc-600 ${className}`} style={{ fontFamily: MONO }}>
      ~/<span className="text-zinc-400">{path}</span>
    </p>
  )
}

// Every section opens the same way: its path, then the title in the shared title size
export function SectionHeading({ path, title, as: Tag = 'h2', className = '' }) {
  return (
    <div className={className}>
      <SectionPath path={path} />
      <Tag className="t-title">{title}</Tag>
    </div>
  )
}
