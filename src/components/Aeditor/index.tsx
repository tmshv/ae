import React from 'react'
import className from 'classnames'
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
    fullSelectionInfo: boolean,
}

export default class Aeditor extends React.Component<IAeditorProps, IState> {
    state = {
        plugins: defaultPlugins(),
        fullSelectionInfo: true,
    }

    onFullSelectioInfoChange = (fullSelectionInfo: boolean) => {
        // event.preventDefault()
        // event.stopPropagation()

        this.setState({
            fullSelectionInfo,
        })
    }

    renderEditor = (props: any) => (
        <div className={'ae-editor'}>
            <div className={'ae-editor-header'}>
                <Toolbar
                    value={this.props.value}
                    onChange={this.props.onChange}
                />
            </div>

            <div className={className('ae-editor-content', {
                expanded: this.state.fullSelectionInfo,
            })}>
                <aside className={'ae-editor-content__side'}>
                    <SelectionInfo
                        value={this.props.value}
                        onChange={this.props.onChange}
                        showFull={this.state.fullSelectionInfo}
                        onShowFullChange={this.onFullSelectioInfoChange}
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
