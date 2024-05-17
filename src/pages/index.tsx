import { CareerOrientation } from '@/components/CareerOrientation'
import { Curriculum } from '@/components/Curriculum'
import { Freedom } from '@/components/Freedom'
import { Main } from '@/components/Main'
import { Psicotherapy } from '@/components/Psicotherapy'
import { WhatCanIHelp } from '@/components/WhatCanIHelp'

export default function Home() {
  return (
    <>
      <Main />
      <Freedom />
      <WhatCanIHelp />
      <Psicotherapy />
      <CareerOrientation />
      <Curriculum />
    </>
  )
}
