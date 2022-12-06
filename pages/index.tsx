import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import db from 'public/samples.json'
import { Value } from 'slate'

const Main = dynamic(import('../src/components/Main').then(m => m.Main), {
    ssr: false
})

type Props = {
}

const Index: NextPage<Props> = () => {
    const sample = db.samples[0]
    const value = Value.fromJSON(sample.data)

    return (
        <Main initialValue={value} />
    )
}

export default Index
