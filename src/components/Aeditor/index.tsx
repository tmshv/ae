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

function renderEditor(props: any) {
    return (
        <React.Fragment>
            <div>hi</div>
            {props.children}
        </React.Fragment>
    )
}

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

    onClick = (event: Event) => {
        event.preventDefault()

        console.log('ae: click')
    }

    render() {
        return (
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
                            onClick={this.onClick}
                        />
                    </aside>

                    <div className={'ae-editor-content__main'}>
                        <Editor
                            value={this.props.value}
                            onPaste={handlePaste}
                            onChange={this.props.onChange}
                            renderNode={renderNode}
                            renderMark={renderMark}
                            renderEditor={renderEditor}
                            schema={schema}
                            plugins={this.state.plugins}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
