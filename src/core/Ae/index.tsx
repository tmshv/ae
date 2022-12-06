import React, { useCallback } from 'react'
import { Editor, Plugin } from 'slate-react'
import { Value, Change } from 'slate'
import schema from './schema'
import handlePaste from './utils/handlePaste'
import renderNode from './renderNode'
import renderMark from './renderMark'

export type AeProps = {
    value: Value,
    onChange: (change: Change) => void,
    plugins: Plugin[],
}

export const Ae: React.FC<AeProps> = ({ value, onChange, plugins }) => {
    const renderEditor = useCallback((props: any) => (
        <div className={'ae-editor'}>
            {props.children}
        </div>
    ), [])

    return (
        <Editor
            value={value}
            onPaste={handlePaste}
            onChange={onChange}
            renderNode={renderNode}
            renderMark={renderMark}
            renderEditor={renderEditor}
            schema={schema}
            plugins={plugins}
        />
    )
}
