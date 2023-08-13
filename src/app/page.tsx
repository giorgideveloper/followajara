import Alphabet from '@/components/Alphabet/Alphabet'
import Hero from '@/components/Hero'
import Reels from '@/components/Reels'
import { openGraphImage } from './shared-metadata'

import Map from '@/components/Map'

export const metadata = {
  title: 'მთავარი',
  openGraph: {
    ...openGraphImage,
    title: 'მთავარი',
  },
}

export default async function Home() {

  return (
    <>
      <Hero />
      <Alphabet />
      <Reels data={[]} />
      <Map />
    </>
  )
}
