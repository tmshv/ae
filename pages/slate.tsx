import React from 'react'
import { Value, ValueJSON } from 'slate'
import Aeditor from '../src/components/Aeditor'
import { slateSample } from '../src/sample'
// import Plain from 'slate-plain-serializer'

export default function () {
    // const initialValue = Plain.deserialize('This is a plain text')
    // const initialValue = Value.fromJSON({
    //     document: {
    //         nodes: [
    //             {
    //                 object: 'block',
    //                 type: 'paragraph',
    //                 nodes: [
    //                     {
    //                         object: 'text',
    //                         leaves: [
    //                             {
    //                                 text: 'This is a line of text in a paragraph.',
    //                             },
    //                         ],
    //                     },
    //                 ],
    //             },
    //         ],
    //     },
    // })

    const json = slateSample() as ValueJSON
    const initialValue = Value.fromJSON(json)

    return (
        <div>
            <Aeditor value={initialValue} />
        </div>
    )
}