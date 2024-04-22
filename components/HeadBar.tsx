interface HeadBarProps {
  title: string[]
}

export default function HeadBar({ title }: HeadBarProps) {
  return (
    <div className="flex items-center h-16 backdrop-brightness-75">
      {title.map((t, i) => (
        <div key={i} className="flex-1 text-center">
          {t}
        </div>
      ))}
    </div>
  )
}
