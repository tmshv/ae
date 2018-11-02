import React from 'react'
import { Editor } from 'slate-react'
import { Value, Change } from 'slate'
import schema from './schema'
import handlePaste from './utils/handlePaste'
import Toolbar from '../Toolbar'
import renderNode from './renderNode'
import renderMark from './renderMark'
import defaultPlugins from './defaultPlugins'
import SelectionInfo from '../SelectionInfo'

import './styles.less'
import './ae.less'

export interface IAeditorProps {
    value: Value,
    onChange: (change: Change) => void,
}

interface IState {
    plugins: any[],
}

export default class Aeditor extends React.Component<IAeditorProps, IState> {
    state = {
        plugins: defaultPlugins(),
    }

    renderEditor = (props: any) => (
        <div className={'ae-editor'}>
            <div className={'ae-editor-header'}>
                <Toolbar
                    value={this.props.value}
                    onChange={this.props.onChange}
                />
            </div>

            <div className={'ae-editor-content'}>
                <aside className={'ae-editor-content__side'}>
                    <SelectionInfo
                        value={this.props.value}
                        onChange={this.props.onChange}
                    />
                </aside>

                <div className={'ae-editor-content__main'}>
                    {props.children}
                </div>
            </div>
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
                schema={schema}
                plugins={this.state.plugins}
            />
        )
    }
}
