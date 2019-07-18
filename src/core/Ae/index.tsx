import React from 'react'
import { Editor, Plugin } from 'slate-react'
import { Value, Change } from 'slate'
import schema from './schema'
import handlePaste from './utils/handlePaste'
import renderNode from './renderNode'
import renderMark from './renderMark'
import defaultPlugins from './defaultPlugins'

import './ae.less'
import './ae-focused.less'

export interface IAeditorProps {
    value: Value,
    onChange: (change: Change) => void,
}

interface IState {
    plugins: Plugin[],
}

export default class Ae extends React.Component<IAeditorProps, IState> {
    state = {
        plugins: defaultPlugins(),
    }

    renderEditor = (props: any) => (
        <div className={'ae-editor'}>
            {props.children}
        </div>
    )

    render() {
        return (
            <Editor
                value={this.props.value}
                onPaste={handlePaste}
                onChange={this.props.onChange}
                renderNode={renderNode}
                renderMark={renderMark}
                renderEditor={this.renderEditor}
                // schema={schema}
                plugins={this.state.plugins}
            />
        )
    }
}
