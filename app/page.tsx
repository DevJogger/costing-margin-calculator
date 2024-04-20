import HeadBar from '@/components/HeadBar'
import Row from '@/components/Row'
import { showAsMoney } from '@/common/helperFunctions'

export default function Home() {
  const costSum = 1000
  const priceSum = 2000
  const marginSum = 1000

  return (
    <main className="flex h-dvh flex-col justify-between bg-amber-600 text-white">
      <HeadBar title={['Cost', 'Unit Cost', 'Qty', 'TTL Cost']} />
      <section className="flex-1 overflow-scroll">
        <Row title="Cost of Product" />
      </section>
      <footer className="flex h-16 gap-1 bg-stone-900 pb-2">
        <div className="flex flex-1 flex-col truncate justify-center px-2 rounded-b-xl bg-purple-600 leading-tight text-white">
          <span>Cost</span>
          <span>{showAsMoney(costSum)}</span>
        </div>
        <div className="flex flex-1 flex-col truncate justify-center px-2 rounded-b-xl bg-cyan-600 leading-tight text-white">
          <span>Price</span>
          <span>{showAsMoney(priceSum)}</span>
        </div>
        <div className="flex flex-1 flex-col truncate justify-center px-2 rounded-b-xl bg-pink-600 leading-tight text-white">
          <span>Margin</span>
          <span>{showAsMoney(marginSum)}</span>
        </div>
      </footer>
    </main>
  )
}
