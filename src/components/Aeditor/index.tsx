import React from 'react'
import { Editor } from 'slate-react'
import { Value, Change } from 'slate'
import schema from './schema'
import handlePaste from './utils/handlePaste'
import Toolbar from '../Toolbar'
import renderNode from './renderNode'
import renderMark from './renderMark'
import defaultPlugins from './defaultPlugins'
import './styles.less'

export interface AeditorProps {
    value: Value,
    onChange: (change: Change) => void,
}

interface State {
    plugins: any[],
}

export default class Aeditor extends React.Component<AeditorProps, State> {
    state = {
        plugins: defaultPlugins(),
    }

    renderToolbar() {
        return (
            <Toolbar
                value={this.props.value}
                onChange={this.props.onChange}
            />
        )
    }

    renderEditor() {
        return (
            <Editor
                onPaste={handlePaste}
                value={this.props.value}
                onChange={this.props.onChange}
                renderNode={renderNode}
                renderMark={renderMark}
                schema={schema}
                plugins={this.state.plugins}
            />
        )
    }

    render() {
        return (
            <div className={'ae-editor'}>
                {this.renderToolbar()}
                {this.renderEditor()}
            </div>
        )
    }
}
