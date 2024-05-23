import { CareerOrientation } from '@/components/CareerOrientation'
import { Curriculum } from '@/components/Curriculum'
import { Feedbacks } from '@/components/Feedbacks'
import { Footer } from '@/components/Footer'
import { Freedom } from '@/components/Freedom'
import { Main } from '@/components/Main'
import { Psicotherapy } from '@/components/Psicotherapy'
import { WhatCanIHelp } from '@/components/WhatCanIHelp'
import { Where } from '@/components/Where'

export default function Home() {
  return (
    <>
      <Main />
      <Freedom />
      <WhatCanIHelp />
      <Psicotherapy />
      <CareerOrientation />
      <Curriculum />
      <Feedbacks />
      <Where />
      <Footer />
    </>
  )
}
