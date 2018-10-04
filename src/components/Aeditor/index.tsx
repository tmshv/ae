import React from 'react'
import { Editor } from 'slate-react'
import { Value, Change } from 'slate'
import blockquotePlugin from './plugins/blockquote'
import listPlugin from './plugins/list'
import tablePlugin from './plugins/table'
import schema from './schema'
import handlePaste from './utils/handlePaste'
import pasteEmbedLink from './plugins/pasteEmbedLink'
import Toolbar from '../Toolbar'
import exitHeader from './plugins/exitHeader'
import renderNode from './renderNode'

import './styles.less'
import shortcutMark from './plugins/shortcutMark'
import { MarkType } from './const'
import renderMark from './renderMark'
import insertVideo from './utils/insertVideo';

// Define a React component renderer for our code blocks.
function CodeNode(props) {
    return (
        <pre {...props.attributes}>
            <code>{props.children}</code>
        </pre>
    )
}

function WordCount() {
    return {
        renderEditor(props) {
            const { children, editor } = props

            console.log(editor)

            // const wordCount = countWords(editor.value.text)
            // const wordCount = editor.value.text.length

            const wordCount = Math.random()

            return (
                <div>
                    {children}
                    <span className="word-count">{wordCount}</span>
                </div>
            )
        }
    }
}

function renderEditor(props) {
    const { editor } = props

    console.log(props.value)

    // const wordCount = countWords(editor.value.text)
    // const wordCount = editor.value.text.length

    // const wordCount = Math.random()

    return (
        <div>
            {props.children}
        </div>
    )
}

const plugins = [
    blockquotePlugin,
    listPlugin,
    tablePlugin,
    exitHeader(),
    shortcutMark({
        key: 'b',
        type: MarkType.bold,
    }),
    shortcutMark({
        key: 'i',
        type: MarkType.italic,
    }),
    shortcutMark({
        key: 'u',
        type: MarkType.underline,
    }),
    shortcutMark({
        key: 'd',
        type: MarkType.strikethrough,
    }),
    shortcutMark({
        key: '9',
        type: MarkType.code,
    }),
    shortcutMark({
        key: 'h',
        type: MarkType.highlight,
    }),
    pasteEmbedLink({
        match: /youtube\.com/,
        change: (change: Change, link: string) => {
            return change.call(insertVideo, link)
        },
    }),
    // imagePasteDrop({
    //     insertImage: (change, file, editor) => {
    //         // console.log(change, file, editor)

    //         return change.insertBlock({
    //             type: 'image',
    //             isVoid: true,
    //             data: { file }
    //         })
    //     }
    // })
    // WordCount(),
    // EditList(),
]

export interface AeditorProps {
    value: Value,
}

interface State {
    value: Value,
}

// Define our app...
export default class Aeditor extends React.Component<AeditorProps, State> {
    // Set the initial value when the app is first constructed.
    state = {
        value: this.props.value,
    }

    // On change, update the app's React state with the new editor value.
    onChange = ({ value }) => {
        // text of block where curcor is
        // console.log(value.anchorText.text)
        // console.log(value.anchorBlock.type)
        // console.log(JSON.stringify(value.toJSON()))

        this.setState({ value })
    }

    // Define a new handler which prints the key that was pressed.
    onKeyDown = (event: KeyboardEvent, change: Change) => {
        // if (event.key === '§') {
        //     change.setBlocks('img')
        //     return true
        // }

        // if (event.key != '`' || !event.ctrlKey) return

        // event.preventDefault()

        // // Determine whether any of the currently selected blocks are code blocks.
        // const isCode = change.value.blocks.some(block => block.type == 'code')

        // // Toggle the block type depending on `isCode`.
        // change.setBlocks(isCode ? 'paragraph' : 'code')
        // return true

        // switch (event.key) {
        //     case 'Enter':{
        //         const currentLine = change.value.blocks.map(block => block.getText())
        //         console.log(currentLine.join(''))

        //         // console.log(change.value.blocks)
        //     }
        // }

        // // Return with no changes if the keypress is not '&'
        // if (event.key !== '&') return

        // // Prevent the ampersand character from being inserted.
        // event.preventDefault()

        // // Change the value by inserting 'and' at the cursor's position.
        // change.insertText('and')
        // return true
    }

    renderToolbar() {
        return (
            <Toolbar
                value={this.state.value}
                onChange={this.onChange}
            />
        )
    }

    renderEditor() {
        return (
            <Editor
                onPaste={handlePaste}
                value={this.state.value}
                onChange={this.onChange}
                renderNode={renderNode}
                renderMark={renderMark}
                schema={schema}
                // onKeyDown={this.onKeyDown}
                // renderEditor={renderEditor}
                plugins={plugins}
            />
        )
    }

    render() {
        console.log('')

        return (
            <div className={'ae-editor'}>
                {this.renderToolbar()}
                {this.renderEditor()}
            </div>
        )
    }
}
