interface HeadBarProps {
  title: string[]
}

export default function HeadBar({ title }: HeadBarProps) {
  return (
    <div className="flex">
      {title.map((t, i) => (
        <div key={i} className="flex-1 text-center">
          {t}
        </div>
      ))}
    </div>
  )
}
