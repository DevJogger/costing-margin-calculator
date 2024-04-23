interface MarginPageProps {
  hidden: boolean
}

export default function MarginPage({ hidden }: MarginPageProps) {
  return (
    <div
      className={`flex-1 flex-col items-center justify-center bg-pink-800 text-2xl text-white ${hidden ? 'hidden' : 'flex'}`}
    >
      Margin Page
    </div>
  )
}
