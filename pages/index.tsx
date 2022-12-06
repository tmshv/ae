import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useCallback, useState } from 'react'
import { Value } from 'slate'

import data from 'public/samples.json'

const Ae = dynamic(import('@/core/Ae'), {
    ssr: false
})

type Props = {
}

const Index: NextPage<Props> = () => {
    const [value, setValue] = useState<Value>(
        Value.fromJSON(data.samples[0].data)
    )

    const onChange = useCallback(({ value }: { value: Value }) => {
        setValue(
            value,
        )
    }, [])

    return (
        <Ae value={value} onChange={onChange} />
    )
}

export default Index
