import { NumberTicker } from "@/registry/number-ticker/number-ticker";

export default function ComponentPage() {
  return (
    <main className="flex flex-col items-center justify-center">
      <NumberTicker value={100} startValue={50} delay="3s"  />
    </main>
  )
}