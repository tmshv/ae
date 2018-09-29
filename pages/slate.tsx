import React from 'react'
import { Value, ValueJSON } from 'slate'
import Aeditor from '../src/components/Aeditor'
import { slateSample } from '../src/sample'
// import Plain from 'slate-plain-serializer'

export default function () {
    const json = slateSample() as ValueJSON
    const initialValue = Value.fromJSON(json)

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <div
                style={{
                    width: '50%',
                }}
            >
                <Aeditor value={initialValue} />
            </div>
        </div>
    )
}