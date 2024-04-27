interface TableHeaderProps {
  title: string[]
}

export default function TableHeader({ title }: TableHeaderProps) {
  return (
    <div className="flex h-16 items-center">
      {title.map((t, i) => (
        <div key={i} className={`text-center font-medium ${i === 0 ? 'w-32 mx-1' : 'flex-1'}`}>
          {t}
        </div>
      ))}
    </div>
  )
}
