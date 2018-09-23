import React from 'react'
import { Value } from 'slate'
import Editor from '../src/components/Editor'
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

    const initialValue = Value.fromJSON(slateSample())

    return (
        <div>
            <Editor value={initialValue} />
        </div>
    )
}