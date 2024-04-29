interface MarginPageProps {
  hidden: boolean
}

export default function MarginTab({ hidden }: MarginPageProps) {
  return (
    <div
      className={`flex-1 flex-col items-center justify-center text-2xl ${hidden ? 'hidden' : 'flex'}`}
      style={{ backgroundColor: 'var(--marginBg)', color: 'var(--marginText)' }}
    >
      Margin Page
    </div>
  )
}
