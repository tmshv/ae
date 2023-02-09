import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useCallback, useState } from 'react'
import { Value } from 'slate'

import data from 'public/samples.json'
import defaultPlugins from '@/core/Ae/defaultPlugins'

const Ae = dynamic(import('@/core/Ae').then(m => m.Ae), {
    ssr: false
})

type Props = {
}

const Index: NextPage<Props> = () => {
    // const [value, setValue] = useState<Value>(
    //     Value.fromJSON(data.samples[0].data)
    // )

    // const onChange = useCallback(({ value }: { value: Value }) => {
    //     setValue(
    //         value,
    //     )
    // }, [])

    return (
        <Ae
            // value={data.samples[0].data}
            value={[
                {
                    type: 'paragraph',
                    children: [
                        { text: 'A line of text in a paragraph.' }
                    ],
                },
                {
                    type: 'break',
                    children: [
                        { text: 'horizonal' }
                    ],
                },
                {
                    type: 'paragraph',
                    children: [
                        { text: 'A line of text in a paragraph.' }
                    ],
                },
                {
                    type: 'image',
                    url: 'https://source.unsplash.com/zOwZKwZOZq8',
                    children: [{ text: '' }],
                },
                {
                    type: 'paragraph',
                    children: [
                        { text: 'A line of text in a paragraph.' }
                    ],
                },
            ]}
        // onChange={onChange}
        // plugins={defaultPlugins()}
        // plugins={[]}
        />
    )
}

export default Index
